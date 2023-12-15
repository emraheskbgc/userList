import React from 'react'
import { RiDeleteBin6Fill } from "react-icons/ri";

function DeleteBulk({onDeleteBulk, selectedUsers}) {
  return (
    <>
       {
        selectedUsers.length === 0 ?  <button onClick={onDeleteBulk} disabled className="text-white ml-2  bg-btnDelete opacity-30 cursor-not-allowed font-medium rounded-lg text-md inline-flex items-center px-3 py-2 text-center" ><RiDeleteBin6Fill className="mr-2 h-5 w-5"/>Clear All</button> :  <button onClick={onDeleteBulk} className="text-white ml-2 bg-btnDelete font-medium rounded-lg text-md inline-flex items-center px-3 py-2 text-center" ><RiDeleteBin6Fill className="mr-2 h-5 w-5"/>Clear All</button>
       }
    </>
  )
}

export default DeleteBulk