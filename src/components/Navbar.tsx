"use client";

import { Input } from "@/components/ui/input";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between gap-5 px-5 py-3">
      <Link href="/" className="text-2xl font-bold">DailyEase</Link>
      <div className="w-[50%]">
        <Input type="search" placeholder="Search" width="88px" />
      </div>

      <AiOutlineShoppingCart onClick={() => router.push("/cart")} className = "text-3xl hover:cursor-pointer"/>
    </div>
  );
};

export default Navbar;
