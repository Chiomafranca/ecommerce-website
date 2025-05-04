// app/page.tsx
import Image from "next/image";
import { stripe } from "@/lib/stripe";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Carousel } from "@/components/carousel";

export default async function HomePage() {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 5,
  });

  // Filter out products without images
  const products = response.data.filter(
    (product) => product.images && product.images.length > 0
  );

  if (!products.length) {
    return <div className="text-center py-12">No products available</div>;
  }

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="rounded-lg bg-neutral-100 py-12">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-4 sm:grid-cols-2 sm:px-6 lg:px-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Explore My Online Store
            </h2>
            <p className="text-lg text-neutral-600">
              Find top new products at unbeatable prices
            </p>
            <Button
              asChild
              className="rounded-full bg-gradient-to-r from-[#D45A29] to-[#8C3118] px-6 py-3 text-white hover:from-[#C04A21] hover:to-[#6E220D]"
            >
              <Link href="/products">View Our Full Collection</Link>
            </Button>
          </div>

          <div className="flex justify-center">
            <Image
              alt={products[0].name || "Featured product"}
              width={450}
              height={450}
              src={products[0].images[0]}
              className="rounded-lg object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Carousel products={products} />
        </div>
      </section>
    </div>
  );
}
