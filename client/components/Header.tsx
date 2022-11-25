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
  { id: 1, name: "Sort", value: "" },
  { id: 2, name: "Name", value: "name" },
  { id: 3, name: "Price", value: "price" },
  { id: 4, name: "Rating", value: "rating" },
  { id: 5, name: "Time", value: "createdAt" },
];

const Header = () => {
  const { query, dispatch } = useSearchContext();
  const [sort, setSort] = useState("sort");

  return (
    <div className="h-[8rem] w-full flex items-center justify-center sticky top-0 left-0 z-40 bg-slate-200 bg-opacity-30 backdrop-blur-md bg-secondary lg:px-2 px-5">
      <div className="flex w-[50%] h-[60%] px-[2rem] bg-white backdrop-blur-[4px] rounded-lg">
        <button className="mr-4 text-2xl text-gray-500">
          <AiOutlineSearch />
        </button>
        <input
          type="text"
          value={query}
          onChange={(e) => dispatch({ type: "INPUT", payload: e.target.value })}
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
      </div>
    </div>
  );
};

const SelectSort = ({ value, onChange, options }: SelectComponentProps) => (
  <select
    value={value}
    onChange={onChange}
    className=" bg-transparent border-0 focus:outline-0 focus:ring-0 cursor-pointer text-gray-500 text-2xl text-body outline-none"
  >
    {options?.map((option) => (
      <option key={option.id} value={option?.value}>
        {option?.name}
      </option>
    ))}
  </select>
);

export default Header;
