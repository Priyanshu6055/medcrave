import Product from "@/models/Product";
import { connectDB } from "@/lib/db";
import BannerWrapper from "@/components/about/AboutBannerWrapper";

const PRIMARY = "#7A3283";      // Medcrave Purple
const SECONDARY = "#85CD7C";    // Complementary Green

interface CategoryPageProps {
  params: { category: string };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  await connectDB();

  const categoryName = decodeURIComponent(params.category);
  const products = await Product.find({ category: categoryName }).lean();

  return (
    <section className="pt-32 pb-20 container-global">
      <BannerWrapper
        heading={`${categoryName} Products`}
        subtitle="Explore our range of high-quality products"
        pathname={categoryName}
      />

      {/* If no products */}
      {products.length === 0 && (
        <p className="mt-10 text-center text-slate-500 text-lg">
          No products found in this category.
        </p>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
        {products.map((product) => (
          <a
            key={product._id}
            href={`/products/${product._id}`}
            className="
              group border rounded-xl shadow-sm p-4 transition-all bg-white
            "
            style={{
              borderColor: `${PRIMARY}22`,
            }}
          >
            {/* Image */}
            <div className="relative w-full h-56 overflow-hidden rounded-lg">
              <img
                src={product.images[0]}
                alt={product.name}
                className="
                  w-full h-full object-cover 
                  group-hover:scale-105 transition-all duration-300
                "
              />
            </div>

            {/* Name */}
            <h3
              className="
                mt-4 text-lg font-semibold transition-all
              "
              style={{
                color: PRIMARY,
              }}
            >
              {product.name}
            </h3>

            {/* Price */}
            <p className="text-sm text-slate-600 mt-1">
              Price:{" "}
              <span className="font-medium">₹{product.price}</span>
            </p>

            {/* Button */}
            <div className="mt-3">
              <button
                className="
                  text-white px-4 py-2 rounded-lg text-sm w-full 
                  transition-all
                "
                style={{
                  backgroundColor: PRIMARY,
                  boxShadow: `0 4px 12px ${PRIMARY}33`,
                }}
              >
                View Details
              </button>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
