import React, { ReactNode } from "react";
import Header from "./Header";

interface LayoutProp {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProp) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
