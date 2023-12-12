import React from "react";
import List from "../List";
import { FaPlus } from "react-icons/fa";

function Search() {
  return (
    <>
      <div className="flex flex-row  justify-between">
        <div>
          <input
            type="text"
            className="bg-gray-100 border border-[1px] border-srcColor placeholder:text-srcPlace rounded-md px-2 py-1 w-[350px]"
            placeholder="Search for users"
          />
        </div>
        <div className="mr-3">
          <button className="bg-btnBg rounded-md px-4 py-2 text-white font-medium flex flex-row items-center space-x-3">
            <FaPlus /> <span> Add user</span>
          </button>
        </div>
      </div>
      <div className="ml-0">
        <List />
      </div>
    </>
  );
}

export default Search;
