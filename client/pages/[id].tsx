import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import useSWR from "swr";
import Image from "next/image";
import { Rating } from "@mui/material";

const Product = () => {
  const router = useRouter();
  const [product, setProduct] = useState<any>({});
  const { id } = router.query;
  const FETCH_PRODUCT = `${process.env.NEXT_PUBLIC_BASE_URL}/products/${id}`;

  const fetchProduct = (URL: string) => {
    axios.get(URL).then((res) => setProduct(res?.data?.data?.product));
  };
  useSWR(FETCH_PRODUCT, fetchProduct);
  return (
    <section className="grid w-screen h-[88vh] grid-cols-2">
      <div className="col-span-1 xs:col-span-2 flex items-center p-4 justify-center">
        <div className="relative h-full xs:h-[50vh] w-full">
          <Image src={product?.thumbnail} fill alt={product?.description} />
        </div>
      </div>
      <div className="col-span-1 xs:col-span-2 w-full flex items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-5xl font-bold mb-4">{product?.name}</h1>
          <p className="text-3xl font-bold mb-2 text-gray-400">
            {product?.category}
          </p>
          <p className="text-xl w-[50%]">{product?.description}</p>
          <div>
            <span>{product?.rating}</span>
            {product?.rating && <Rating value={product?.rating} readOnly />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
