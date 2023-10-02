"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { BackendUrl } from "../helper";
import { Product } from "@/types";

const Dashboard: React.FC = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number>();
  const [salePrice, setSalePrice] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const [sale, setSale] = useState("");
  const [quantity, setQuantity] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  async function getProducts() {
    const res = await fetch(`${BackendUrl}/products`, { cache: "no-store" });
    if (!res.ok) {
      throw new Error("Something went wrong - unable to fetch data");
    }

    return await res.json();
  }

  const getAllProducts = async () => {
    const response = await getProducts();
    const prods: Product[] = response.products;
    setProducts(prods);
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  async function addProduct() {
    const res = await fetch(`${BackendUrl}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        price,
        salePrice,
        imgSrc,
        sale,
        quantity,
      }),
    });
    await getAllProducts();
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addProduct();
  };

  const handleDelete = async (id: string) => {
    const res = await fetch(`${BackendUrl}/products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    await getAllProducts();
  };

  return (
    <div className="flex flex-col items-center justify-center w-full gap-10">
      <h1 className="text-2xl font-bold">Add Products</h1>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col gap-5 w-44 "
      >
        <Input
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          type="text"
          placeholder="price"
          value={price}
          onChange={(e) => setPrice(+e.target.value)}
        />
        <Input
          type="text"
          placeholder="imgSrc"
          value={imgSrc}
          onChange={(e) => setImgSrc(e.target.value)}
        />
        <Select onValueChange={(value) => setSale(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sale" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sale</SelectLabel>
              <SelectItem value="true">True</SelectItem>
              <SelectItem value="false">False</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Input
          type="text"
          placeholder="salePrice"
          disabled={sale === "true" ? false : true}
          value={salePrice}
          onChange={(e) => setSalePrice(e.target.value)}
        />
        <Input
          type="text"
          placeholder="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <Button type="submit">Add</Button>
      </form>

      <div className="flex flex-col items-center justify-center mt-10">
        <h1 className="font-bold text-2xl mb-10">Products</h1>
        {products &&
          products.map((product) => {
            return (
              <>
                <div
                  key={product._id}
                  className="flex items-start justify-between w-full gap-5"
                >
                  <h3>{product.title}</h3>
                  <p>{product.price}</p>
                  {product.sale === true && (
                    <p className="font-semibold text-green-400">
                      {product.salePrice}
                    </p>
                  )}
                  <p>{product.quantity}</p>
                  <Button onClick={() => handleDelete(product._id)}>
                    Delete
                  </Button>
                </div>
                <Separator className="my-4" />
              </>
            );
          })}
      </div>
    </div>
  );
};

export default Dashboard;
