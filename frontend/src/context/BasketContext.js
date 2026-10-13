"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

const BasketContext = createContext(null);

export function BasketProvider({ children }) {
  const [basket, setBasket] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // بارگذاری سبد خرید از localStorage
  useEffect(() => {
    try {
      const savedBasket = localStorage.getItem("local_basket");

      if (savedBasket) {
        const parsedBasket = JSON.parse(savedBasket);

        if (Array.isArray(parsedBasket)) {
          setBasket(parsedBasket);
        }
      }
    } catch (error) {
      console.error("خطا در خواندن سبد خرید:", error);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // ذخیره سبد خرید در localStorage
  useEffect(() => {
    if (!isInitialized) return;

    try {
      localStorage.setItem("local_basket", JSON.stringify(basket));
    } catch (error) {
      console.error("خطا در ذخیره سبد خرید:", error);
    }
  }, [basket, isInitialized]);

  // اضافه کردن محصول به سبد خرید
  const addToBasket = (product, customQuantity = 1) => {
    const quantity = Math.max(
      1,
      Math.floor(Number(customQuantity) || 1)
    );

    const productId = Number(product.product ?? product.id);

    const isFridayBazaar =
      product.is_friday_bazaar === true ||
      product.friday_bazaar_item_id != null ||
      product.campaign_price != null;

    // شناسه آیتم کمپاین را از شناسه محصول اصلی جدا نگه می‌داریم
    const fridayBazaarItemId = isFridayBazaar
      ? Number(product.friday_bazaar_item_id ?? product.id)
      : null;

    const price = Number(
      isFridayBazaar
        ? product.campaign_price ?? product.price
        : product.price ??
            product.discount_price ??
            product.original_price ??
            0
    );

    if (!Number.isFinite(productId) || productId <= 0) {
      console.error("شناسه محصول معتبر نیست:", product);
      return;
    }

    if (!Number.isFinite(price) || price <= 0) {
      console.error("قیمت محصول معتبر نیست:", product);
      return;
    }

    if (
      isFridayBazaar &&
      (!Number.isFinite(fridayBazaarItemId) ||
        fridayBazaarItemId <= 0)
    ) {
      console.error("شناسه آیتم Friday Bazaar معتبر نیست:", product);
      return;
    }

    const remainingStock = Number(
      product.remaining_stock ?? product.stock ?? Infinity
    );

    if (remainingStock <= 0) {
      console.warn("این محصول موجود نیست.");
      return;
    }

    setBasket((prevBasket) => {
      // محصولات عادی و کمپاین با هم اشتباه نشوند
      const existingItem = prevBasket.find((item) => {
        const sameProduct =
          Number(item.id) === productId;

        const sameCampaignType =
          Boolean(item.is_friday_bazaar) === isFridayBazaar;

        const sameCampaign =
          !isFridayBazaar ||
          Number(item.friday_bazaar_item_id) ===
            fridayBazaarItemId;

        return sameProduct && sameCampaignType && sameCampaign;
      });

      const currentQuantity = existingItem
        ? Number(existingItem.quantity) || 0
        : 0;

      const nextQuantity = Math.min(
        currentQuantity + quantity,
        remainingStock
      );

      const normalizedItem = {
        ...product,

        // شناسه محصول اصلی
        id: productId,
        product: productId,

        price,
        quantity: nextQuantity,

        is_friday_bazaar: isFridayBazaar,

        // شناسه آیتم کمپاین؛ نه شناسه محصول اصلی
        friday_bazaar_item_id: isFridayBazaar
          ? fridayBazaarItemId
          : null,
      };

      if (existingItem) {
        return prevBasket.map((item) => {
          const sameItem =
            Number(item.id) === productId &&
            Boolean(item.is_friday_bazaar) === isFridayBazaar &&
            (!isFridayBazaar ||
              Number(item.friday_bazaar_item_id) ===
                fridayBazaarItemId);

          return sameItem
            ? normalizedItem
            : item;
        });
      }

      return [...prevBasket, normalizedItem];
    });
  };

  // افزایش تعداد محصول
  const increaseQuantity = (productId) => {
    setBasket((prevBasket) =>
      prevBasket.map((item) => {
        if (Number(item.id) !== Number(productId)) {
          return item;
        }

        const stock = Number(
          item.remaining_stock ?? item.stock ?? Infinity
        );

        if (item.quantity >= stock) {
          return item;
        }

        return {
          ...item,
          quantity: item.quantity + 1,
        };
      })
    );
  };

  // کاهش تعداد محصول
  const decreaseQuantity = (productId) => {
    setBasket((prevBasket) =>
      prevBasket
        .map((item) =>
          Number(item.id) === Number(productId)
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // حذف محصول
  const removeItem = (productId) => {
    setBasket((prevBasket) =>
      prevBasket.filter(
        (item) => Number(item.id) !== Number(productId)
      )
    );
  };

  // خالی کردن سبد خرید
  const clearBasket = () => {
    setBasket([]);
  };

  // تعداد کل محصولات
  const totalItems = basket.reduce(
    (total, item) =>
      total + Number(item.quantity || 0),
    0
  );

  // قیمت کل
  const totalPrice = basket.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) *
        Number(item.quantity || 0),
    0
  );

  return (
    <BasketContext.Provider
      value={{
        basket,
        setBasket,
        addToBasket,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        clearBasket,
        totalItems,
        totalPrice,
        isInitialized,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
}

export function useBasket() {
  const context = useContext(BasketContext);

  if (!context) {
    throw new Error(
      "useBasket باید داخل BasketProvider استفاده شود."
    );
  }

  return context;
}