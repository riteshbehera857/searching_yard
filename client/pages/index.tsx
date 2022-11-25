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
  const { query, sort, filter } = useSearchContext();
  const [products, setProducts] = useState<Array<Products>>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState();

  const FETCH_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/products`;
  const SEARCH_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/products/search?q=${query}`;

  const fetchProducts = (URL: string) => {
    setIsLoading(true);
    axios
      .get(URL)
      .then((res) => {
        setProducts(res?.data?.data?.products);
        setIsLoading(false);
      })
      .catch((err) => {
        setFetchError(err);
        setIsLoading(false);
      });
  };

  console.log(filter);

  useEffect(() => {
    const controller = new AbortController();
    if (query) {
      fetchProducts(SEARCH_URL);
    }
    if (!query) {
      if (sort) {
        if (filter) {
          fetchProducts(`${FETCH_URL}?sort=${sort}&category=${filter}`);
          return;
        }
        fetchProducts(`${FETCH_URL}?sort=${sort}`);
      } else if (filter) {
        if (sort) {
          fetchProducts(`${FETCH_URL}?sort=${sort}&category=${filter}`);
          return;
        }
        fetchProducts(`${FETCH_URL}?category=${filter}`);
      } else {
        fetchProducts(FETCH_URL);
      }
    }
    return () => {
      controller.abort();
    };
  }, [query, sort, filter]);

  useSWR(FETCH_URL, fetchProducts, {
    revalidateOnFocus: false,
    revalidateOnMount: true,
  });

  return (
    <>
      <div className="">
        <div className="grid grid-cols-4 xs:grid-cols-2 medium:gap-10 medium:px-10 tablet:grid-cols-3 xs:px-8 tablet:gap-5 tablet:px-8 tablet:mt-8 xs:gap-10 gap-20 px-24 mt-10 xs:mt-8">
          {products?.map((product: Products) => (
            <ProductCard
              key={product?._id}
              product={product}
              isLoading={isLoading}
            />
          ))}
        </div>
      </div>
    </>
  );
}
