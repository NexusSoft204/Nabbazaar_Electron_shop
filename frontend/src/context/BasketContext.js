// 'use client'
// import { createContext, useContext, useState, useEffect } from 'react';

// const BasketContext = createContext();

// export function BasketProvider({ children }) {
//   const [basket, setBasket] = useState([]);

//   // ۱. اضافه کردن محصول به سبد خرید (برای اولین بار یا با تعداد مشخص)
//   const addToBasket = (product, customQuantity = 1) => {
//     setBasket((prevBasket) => {
//       const existingItem = prevBasket.find((item) => item.id === product.id);
//       if (existingItem) {
//         // اگر از قبل بود، تعداد جدید را جایگزین یا اضافه کن (اینجا جایگزین می‌شود)
//         return prevBasket.map((item) =>
//           item.id === product.id ? { ...item, quantity: customQuantity } : item
//         );
//       }
//       return [...prevBasket, { ...product, quantity: customQuantity }];
//     });
//   };

//   // ۲. رخداد افزایش تعداد محصول (Plus)
//   const increaseQuantity = (productId) => {
//     setBasket((prevBasket) =>
//       prevBasket.map((item) =>
//         item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
//       )
//     );
//   };

//   // ۳. رخداد کاهش تعداد محصول (Minus)
//   const decreaseQuantity = (productId) => {
//     setBasket((prevBasket) =>
//       prevBasket
//         .map((item) =>
//           item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
//         )
//         .filter((item) => item.quantity > 0) // اگر تعداد به صفر رسید، خودکار حذف شود
//     );
//   };

//   // ۴. حذف کامل یک محصول از سبد خرید (بدون توجه به تعداد)
//   const removeItem = (productId) => {
//     setBasket((prevBasket) => prevBasket.filter((item) => item.id !== productId));
//   };

//   // محاسبه تعداد کل آیتم‌ها
//   const totalItems = basket.reduce((total, item) => total + item.quantity, 0);

//   // محاسبه قیمت کل
//   const totalPrice = basket.reduce((total, item) => total + item.price * item.quantity, 0);

//   return (
//     <BasketContext.Provider
//       value={{
//         basket,
//         setBasket,
//         addToBasket,
//         increaseQuantity,
//         decreaseQuantity,
//         removeItem,
//         totalItems,
//         totalPrice,
//       }}
//     >
//       {children}
//     </BasketContext.Provider>
//   );
// }

// // هوک اختصاصی
// export function useBasket() {
//   return useContext(BasketContext);
// }



'use client'

import { createContext, useContext, useState, useEffect } from 'react';

const BasketContext = createContext();

export function BasketProvider({ children }) {
  const [basket, setBasket] = useState([]);
  // این وضعیت نشان می‌دهد که آیا اطلاعات اولیه از مرورگر خوانده شده است یا خیر
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const savedBasket = localStorage.getItem('local_basket');
    if (savedBasket) {
      try {
        setBasket(JSON.parse(savedBasket));
      } catch (error) {
        console.error("خطا در خواندن سبد خرید:", error);
      }
    }
     setIsInitialized(true);
  }, []);


    useEffect(() => {
    // اگر هنوز لود اولیه انجام نشده، هیچ کاری نکن تا داده‌های قبلی پاک نشوند
    if (!isInitialized) return;

    localStorage.setItem('local_basket', JSON.stringify(basket));
  }, [basket, isInitialized]);

  

  // ۳. اضافه کردن محصول به سبد خرید
  const addToBasket = (product, customQuantity = 1) => {
    setBasket((prevBasket) => {
      const existingItem = prevBasket.find((item) => item.id === product.id);
      if (existingItem) {
        return prevBasket.map((item) =>
          item.id === product.id ? { ...item, quantity: customQuantity } : item
        );
      }
      return [...prevBasket, { ...product, quantity: customQuantity }];
    });
  };

  // ۴. افزایش تعداد محصول (Plus)
  const increaseQuantity = (productId) => {
    setBasket((prevBasket) =>
      prevBasket.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // ۵. کاهش تعداد محصول (Minus)
  const decreaseQuantity = (productId) => {
    setBasket((prevBasket) =>
      prevBasket
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };


   const totalItems = basket.reduce((total, item) => total + item.quantity, 0);

//   // محاسبه قیمت کل
  const totalPrice = basket.reduce((total, item) => total + item.price * item.quantity, 0);


  // ۶. حذف کامل یک محصول از سبد خرید
  const removeItem = (productId) => {
    setBasket((prevBasket) => prevBasket.filter((item) => item.id !== productId));
  };

  // ۷. خالی کردن کامل سبد خرید
  const clearBasket = () => {
    setBasket([]);
  };

  return (
    <BasketContext.Provider value={{ basket, addToBasket, increaseQuantity, decreaseQuantity, removeItem,clearBasket,totalItems }}>
      {children}
    </BasketContext.Provider>
  );
}

export const useBasket = () => useContext(BasketContext);
