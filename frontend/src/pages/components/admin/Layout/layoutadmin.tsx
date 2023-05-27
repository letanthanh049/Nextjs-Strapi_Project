import React, { ReactNode } from "react";
import Navbar from "../navbar";
import Sidebar from "../sidebar";
interface Props {
  children?: ReactNode
}

const LayoutAdmin = ({ children, ...props }: Props) =>{
  return (
    <div className="grid min-h-screen grid-rows-header">
      <Navbar />
      <main {...props} >
        <div className="flex flex-nowrap h-full">
          <Sidebar />
          {children}
        </div>
      </main>
    </div>
  );
};

export default LayoutAdmin; 