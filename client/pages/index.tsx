import useMobile from "../utils/useMobile";
import useSWR from "swr";
import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useSearchContext } from "../hooks/useSearchContext";
import { Listbox } from "@headlessui/react";
interface Products {
  _id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  category: string;
  thumbnail: string;
}

export default function Home() {
  const { query, sort } = useSearchContext();
  const [products, setProducts] = useState<Array<Products>>();
  const [fetchError, setFetchError] = useState();

  const FETCH_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/products`;
  const SEARCH_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/products/search?q=${query}`;

  const fetchProducts = (URL: string) => {
    axios
      .get(URL)
      .then((res) => {
        setProducts(res?.data?.data?.products);
      })
      .catch((err) => setFetchError(err));
  };

  useEffect(() => {
    const controller = new AbortController();
    if (query) {
      fetchProducts(SEARCH_URL);
    }
    if (!query) {
      if (sort) {
        fetchProducts(`${FETCH_URL}?sort=${sort}`);
      } else {
        fetchProducts(FETCH_URL);
      }
    }
    return () => {
      controller.abort();
    };
  }, [query, sort]);

  useSWR(FETCH_URL, fetchProducts, {
    revalidateOnFocus: false,
    revalidateOnMount: true,
  });

  return (
    <>
      <div className="">
        <div className="grid grid-cols-4 sm:gap-7 gap-20 sm:px-7 px-24 sm:mt-7 mt-10 sm:mb-10">
          {products?.map((product: Products) => (
            <ProductCard key={product?._id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
