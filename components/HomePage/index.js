import { TiHome } from "react-icons/ti";
import { FaAngleRight } from "react-icons/fa6";
import React from "react";

import List from "../List";

function HomePage() {
  return (
    <>
      <div className="md:w-[80%] w-[100%] border px-3 py-3">
        <div className="flex flex-row text-center items-center space-x-2  ">
          <TiHome />
          <span> Home</span> <FaAngleRight /> <span>Users</span>
          <FaAngleRight /> <span>List</span>
        </div>
        <div className="mt-3">
          <h2 className="text-xl font-semibold">All users</h2>
        </div>
        <div className="mt-3">
          <List />
        </div>
      </div>
    </>
  );
}

export default HomePage;
