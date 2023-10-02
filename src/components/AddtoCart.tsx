"use client";

import { BackendUrl } from "@/app/helper";
import { Button } from "./ui/button";

interface AddtoCartProps {
  id: string;
}

const AddtoCart: React.FC<AddtoCartProps> = (props) => {
  const handleClick = async () => {
    const res = await fetch(`${BackendUrl}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: props.id,
      }),
    });
  };
  return (
    <Button className="">
      Add to cart
    </Button>
  );
};

export default AddtoCart;
