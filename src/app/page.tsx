import Image from "next/image";
import { Product } from "@/types";
import { BackendUrl } from "./helper";
import AddtoCart from "@/components/AddtoCart";

const getData = async () => {
  const res = await fetch(`${BackendUrl}/products`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Something went wrong - unable to fetch data");
  }

  return await res.json();
};

export default async function Home() {
  const response = await getData();
  // console.log("🔥  file: page.tsx:18  response: ", response);

  const products: Product[] = response.products;
  // console.log("🔥  file: homepage.tsx:17  products: ", products);
  console.log("❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌");
  return (
    <div>
      <div className="bg-white py-3 pb-7">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <div className="mb-6 flex items-end justify-between gap-4">
            <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">
              Selected
            </h2>

            <a
              href="#"
              className="inline-block rounded-lg border bg-white px-4 py-2 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-100 focus-visible:ring active:bg-gray-200 md:px-8 md:py-3 md:text-base"
            >
              Show more
            </a>
          </div>

          <div className="grid gap-x-4 gap-y-8 sm:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <div key={product._id}>
                <a
                  href="#"
                  className="group relative mb-2 block h-80 overflow-hidden rounded-lg bg-gray-100 lg:mb-3"
                >
                  <Image
                    layout="fill"
                    src={product.imgSrc}
                    loading="lazy"
                    alt="Photo by Rachit Tank"
                    className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                  />

                  {product.sale && (
                    <span className="absolute left-0 top-0 rounded-br-lg bg-red-500 px-3 py-1.5 text-sm uppercase tracking-wider text-white">
                      sale
                    </span>
                  )}
                </a>
                <div className="flex justify-between items-center">
                  <div>
                    <a
                      href="#"
                      className="hover:gray-800 mb-1 text-gray-500 transition duration-100 lg:text-lg"
                    >
                      {product.title}
                    </a>

                    <div className="flex items-end gap-2">
                      <span className="font-bold text-gray-800 lg:text-lg">
                        &#36;{product.sale ? product.salePrice : product.price}
                      </span>
                      {product.sale && (
                        <span className="mb-0.5 text-red-500 line-through">
                          &#36;{product.price}
                        </span>
                      )}
                    </div>
                  </div>
                  <AddtoCart id={product._id} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
