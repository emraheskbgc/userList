import React from "react";

function List() {
  return (
    <>
      <div className="mt-4">
        <table className="min-w-full">
          <thead className="bg-gray-100 ">
            <tr>
              <th
                scope="col"
                className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
              >
                <div className="flex items-center ">
                  <input
                    id="checkbox-all"
                    aria-describedby="checkbox-1"
                    type="checkbox"
                    className="bg-gray-50 accent-btnBg border-gray-300 focus:ring-2 focus:ring-cyan-200 h-4 w-4 rounded"
                  />
                  <label for="checkbox-all" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th
                scope="col"
                className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
              >
                NAME
              </th>
              <th
                scope="col"
                className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
              >
                POSITION
              </th>
              <th
                scope="col"
                className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
              >
                COUNTRY
              </th>
              <th
                scope="col"
                className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
              >
                STATUS
              </th>
              <th
                scope="col"
                className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
              ></th>
            </tr>
          </thead>
        </table>
      </div>
    </>
  );
}

export default List;
