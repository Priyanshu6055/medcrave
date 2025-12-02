import BannerWrapper from "@/components/about/AboutBannerWrapper";

export default async function CategoryProductsPage({ params }: any) {
  const { slug } = await params;

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/products/category/${slug}`, {
    cache: "no-store",
  });

  const data = await res.json();
  const products = data.products || [];

  return (
    <>
      {/* ⭐ Dynamic Banner */}
      <BannerWrapper
        heading={slug.toUpperCase()}
        subtitle={`Explore all premium ${slug} products`}
      />

      <section className="py-16 bg-gray-50">
        <div className="container-global px-4 md:px-10">

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-800 mb-10">
            Showing all <span className="text-green-600">{slug}</span> products
          </h2>

          {/* If No Products */}
          {products.length === 0 && (
            <p className="text-gray-500 text-lg">
              No products found in this category.
            </p>
          )}

          {/* ⭐ Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product: any) => (
              <a
                key={product._id}
                href={`/products/${product._id}`}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
              >
                {/* Product Image */}
                <div className="h-56 w-full overflow-hidden">
                  <img
                    src={product.images?.[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Product Info */}
                <div className="p-5 space-y-2">
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-green-600">
                    {product.name}
                  </h3>

                  <p className="text-gray-600 text-sm line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex justify-between items-center pt-3">
                    <span className="text-green-700 font-bold text-lg">
                      ₹{product.price}
                    </span>

                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                      {product.category}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
