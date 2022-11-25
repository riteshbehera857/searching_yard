import { createContext, useReducer } from "react";

export const SearchContext = createContext<any>(null);

export const searchReducer = (state: any, action: any) => {
  switch (action.type) {
    case "INPUT":
      return { ...state, query: action.payload };
    case "SORT":
      return { ...state, sort: action.sort };
    case "FILTER":
      return { ...state, filter: action.filter };
    default:
      return state;
  }
};

export const SearchContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(searchReducer, {
    query: "",
    sort: "",
    filter: "",
  });

  return (
    <SearchContext.Provider value={{ ...state, dispatch }}>
      {children}
    </SearchContext.Provider>
  );
};
