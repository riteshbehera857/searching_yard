import React, { useState } from "react";
import Image from "next/image";
import { Rating } from "@mui/material";

export interface Products {
  product: {
    _id: string;
    name: string;
    description: string;
    price: number;
    rating: number;
    category: string;
    thumbnail: string;
  };
}

const ProductCard = ({ product }: Products) => {
  return (
    <div className="col-1/2 cursor-pointer relative rounded-lg overflow-hidden bg-[#fff]">
      <Image
        src={product?.thumbnail}
        alt={product?.description}
        width={500}
        height={1000}
      />
      <div className="mt-3 px-8 absolute bottom-0 left-0 flex justify-between w-full bg-white items-center bg-opacity-40 backdrop-blur-sm">
        <div className="flex flex-col py-4">
          <h1 className="font-bold text-2xl mb-2">{product?.name}</h1>
          <p className="font-bold text-xl">&#8377; {product?.price}</p>
          <Rating value={product?.rating} readOnly />
        </div>
        <h1 className="text-xl lg:text-2xl font-bold text-gray-400 mt-2">
          {product?.category}
        </h1>
      </div>
    </div>
  );
};

export default ProductCard;
