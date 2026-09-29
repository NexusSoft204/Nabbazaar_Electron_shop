import ProductCard from "../shop/productCard";

export default async function SearchPage({ searchParams }) {
  const resolvedParams = await searchParams;
  const searchQuery = resolvedParams?.q || '';
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

  // آدرس دقیقاً بر اساس پورت 8000 و مسیر معتبر شما تنظیم شده است:
  const djangoApiUrl = `${API_URL}/api/product/search/?search=${encodeURIComponent(searchQuery)}`;

  let products = [];

  try {
    const res = await fetch(djangoApiUrl, {
      cache: 'no-store' 
    });

    if (res.ok) {
      products = await res.json();
    }
  } catch (error) {
    console.error("خطا در برقراری ارتباط با سرور جنگو:", error);
  }

  return (
    <div className="search-results-container p-6 h-screen">
      <h1 className="text-xl font-bold mb-4 font-montserrat">Result Search for: "{searchQuery}"</h1>
      
      {products.length === 0 ? (
        <p className="text-gray-500 font-thin">Not found Product</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} isGrid={true} />
          ))}
        </div>
      )}
    </div>
  );
}
