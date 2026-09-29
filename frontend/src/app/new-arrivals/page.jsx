import NewArrivalsClient from "./NewArrivalsClient";

if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not configured");
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function getNewProducts() {
  try {
    const response = await fetch(`${API_URL}/api/product/`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();

    return data?.new_products || [];
  } catch (error) {
    console.error("Failed to fetch new products:", error);

    return [];
  }
}

const NewArrivals = async () => {
  const products = await getNewProducts();

  return <NewArrivalsClient products={products} />;
};

export default NewArrivals;