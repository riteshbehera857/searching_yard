import { useRouter } from "next/router";
import React, { useState, Dispatch, SetStateAction } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useSearchContext } from "../hooks/useSearchContext";

interface Option {
  id: number;
  name: string;
  value: string;
}
interface SelectComponentProps {
  value: string;
  options: Option[];
  onChange: any;
}

const options: Option[] = [
  { id: 1, name: "Sort By", value: "" },
  { id: 2, name: "Name", value: "name" },
  { id: 3, name: "Price", value: "price" },
  { id: 4, name: "Rating", value: "rating" },
  { id: 5, name: "Time", value: "createdAt" },
];

const filterOptions: Option[] = [
  { id: 1, name: "Category", value: "" },
  { id: 2, name: "Smartphones", value: "smartphones" },
  { id: 3, name: "Laptops", value: "laptops" },
  { id: 4, name: "Fragrances", value: "fragrances" },
  { id: 5, name: "Skincare", value: "skincare" },
  { id: 6, name: "Groceries", value: "groceries" },
  { id: 7, name: "Home Decoration", value: "home-decoration" },
];

const Header = () => {
  const { query, dispatch } = useSearchContext();
  const [sort, setSort] = useState("sort");
  const [filter, setFilter] = useState("");
  const router = useRouter();

  return (
    <div className="h-[8rem] w-full flex items-center justify-center sticky top-0 left-0 z-40 bg-slate-200 bg-opacity-30 backdrop-blur-md bg-secondary lg:px-2 px-5 xs:px-0">
      {router.pathname === "/[id]" ? (
        <h1
          onClick={() => router.back()}
          className="text-4xl cursor-pointer font-extrabold"
        >
          SearchingYard
        </h1>
      ) : (
        <div className="flex w-[50%] medium:w-[90%] xs:w-full xs:flex-wrap h-[60%] xs:h-full px-[2rem] bg-white backdrop-blur-[4px] rounded-lg">
          <button className="mr-4 text-2xl xs:hidden xs:absolute xs:top-1/2 xs:-translate-y-1/2 xs:left-4 text-gray-500">
            <AiOutlineSearch />
          </button>
          <input
            type="text"
            value={query}
            onChange={(e) =>
              dispatch({ type: "INPUT", payload: e.target.value })
            }
            className="w-full bg-transparent border-0 focus:outline-0 focus:ring-0 text-gray-500 text-2xl text-body outline-none"
            placeholder="Search by product, category or collection"
          />
          <SelectSort
            options={options}
            value={sort!}
            onChange={(e: any) => {
              dispatch({ type: "SORT", sort: e.target.value });
              setSort(e.target.value);
            }}
          />
          <SelectSort
            options={filterOptions}
            value={filter!}
            onChange={(e: any) => {
              dispatch({ type: "FILTER", filter: e.target.value });
              setFilter(e.target.value);
            }}
          />
        </div>
      )}
    </div>
  );
};

const SelectSort = ({ value, onChange, options }: SelectComponentProps) => (
  <select
    value={value}
    onChange={onChange}
    className=" bg-slate-100 xs:bg-transparent xs:py-0 px-2 ml-2 rounded-lg self-center py-4 border-0 focus:outline-0 focus:ring-0 cursor-pointer text-gray-500 text-2xl xs:text-xl text-body outline-none"
  >
    {options?.map((option) => (
      <option key={option.id} value={option?.value}>
        {option?.name}
      </option>
    ))}
  </select>
);

export default Header;
