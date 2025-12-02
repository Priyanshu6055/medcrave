import BannerWrapper from "@/components/about/AboutBannerWrapper";

export default async function ProductDetails(props: any) {
  const { id } = await props.params; // ← FIXED HERE

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/products/${id}`, {
    cache: "no-store",
  });

  const data = await res.json();

  if (!data.product) {
    return <h1 className="text-center py-20 text-2xl">Product Not Found</h1>;
  }

  const product = data.product;

  return (
    <>
      <BannerWrapper heading={product.name} subtitle={product.category} />

      <section className="py-10 bg-white">
        <div className="container-global px-4 md:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* IMAGES */}
          <div className="space-y-4">
            {product.images.map((img: string, i: number) => (
              <img
                key={i}
                src={img}
                className="w-full rounded-xl shadow-lg border"
              />
            ))}
          </div>

          {/* DETAILS */}
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-bold text-green-700">Description</h2>
              <p className="text-gray-700 mt-2">{product.description}</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-green-700">Advantages</h2>
              <p className="text-gray-700 mt-2">{product.advantages}</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-green-700">Uses</h2>
              <p className="text-gray-700 mt-2">{product.uses}</p>
            </section>

            <section className="pt-4 space-y-2">
              <p className="text-xl font-semibold text-green-700">
                Stock: {product.stock}
              </p>
              <p className="text-xl font-semibold text-green-700">
                Price: ₹{product.price}
              </p>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
