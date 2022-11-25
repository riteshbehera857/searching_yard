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
  isLoading: boolean;
}

const ProductCard = ({ product, isLoading }: Products) => {
  return (
    <>
      {isLoading ? (
        <>
          <div className="col-1/2 xs:col-span-2 cursor-pointer relative rounded-lg overflow-hidden bg-[#f1f1f1] animate-pulse">
            <div className="w-[500px] h-[300px] animate-pulse">&nbsp;</div>
            <div className="mt-3 px-8 animate-pulse absolute bottom-0 left-0 bg-[#e4e4e4] flex justify-between w-full items-center bg-opacity-40 backdrop-blur-sm">
              <div className="flex flex-col py-4 animate-pulse">
                <h1 className="font-bold text-2xl mb-2 animate-pulse w-[20rem] bg-[#d4d4d4]">
                  &nbsp;
                </h1>
                <p className="font-bold text-xl mb-2 animate-pulse w-[15rem] bg-[#d4d4d4]">
                  &nbsp;
                </p>
                <div className="flex items-center animate-pulse w-[10rem] bg-[#d4d4d4]">
                  <span>&nbsp;</span>
                  &nbsp;
                </div>
              </div>
              <h1 className="text-xl lg:text-2xl font-bold animate-pulse w-[10rem] bg-[#d4d4d4] text-gray-400 mt-2">
                &nbsp;
              </h1>
            </div>
          </div>
        </>
      ) : (
        <div className="col-1/2 xs:col-span-2 cursor-pointer relative xs:block rounded-lg overflow-hidden bg-[#fff]">
          <Image
            src={product?.thumbnail}
            alt={product?.description}
            width={500}
            height={1000}
          />
          <div className="mt-3 px-8 absolute bottom-0 left-0 flex justify-between w-full bg-white items-center bg-opacity-40 backdrop-blur-sm">
            <div className="flex flex-col py-4">
              <h1 className="font-bold text-2xl mb-2">{product?.name}</h1>
              <p className="font-bold text-xl mb-2">&#8377; {product?.price}</p>
              <div className="flex items-center">
                <span>{product?.rating}</span>
                <Rating value={product?.rating} readOnly />
              </div>
            </div>
            <h1 className="text-xl lg:text-2xl font-bold text-gray-400 mt-2">
              {product?.category}
            </h1>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
