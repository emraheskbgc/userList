"use client";
import React from "react";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import {useState} from "react";
import { FaPlus } from "react-icons/fa";
import ModalComponent from "../ModalComponent";
import { v4 as uuidv4 } from 'uuid';
import Swal from "sweetalert2";

function List() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [userData, setUserData] = useState([]);
 
  console.log(userData);
  
  const handleFormSubmit = (data) => {
    // Form verilerini kullanıcı verileri olarak sakla
    setUserData([...userData, data]);
    // Modal'ı kapat
    closeModal();
  };
 

 
  const  openModal = () => {
    setIsModalOpen(true)
  }
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const column = ["name", "posıtıon", "country", "status",""];
  const config = {
    addUserBtn:false
  }
 

// Kullanıcı Silme Fonksiyonu
// Silme işleminde swalAlert kullanılmıştır
const handleDeleteUser = (id) => {
  const userDeleteFind = userData.find((user) => user.id === id)
  console.log(userDeleteFind.name);
  Swal.fire({
    title: "Are you sure?",
    html: `You want the user named <strong style="color:red"> ${userDeleteFind.name}</strong> to be deleted? `,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success" 
      });
      const updateUserData = userData.filter((user) => user.id !== id)
  setUserData(updateUserData)
    }
  });
 
}
// Kullanıcı Silme Fonksiyonu


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
            <FaPlus /> <span onClick={openModal}> Add user</span>
           
          </button>
        </div>
      </div>
      <div className="mt-5">
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
                    aria-describedby="checkbox-all-description"
                    type="checkbox"
                    className="bg-gray-50 accent-btnBg border-gray-300 focus:ring-2 focus:ring-cyan-200 h-4 w-4 rounded"
                  />
                  <label htmlFor="checkbox-all" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              {column.map((item, index) => (
                <th
                  key={index}
                  scope="col"
                  className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody > 
                  {
                    userData && userData.map((user,index) => (
                      <tr key={index}>
              <td
                scope="col"
                className="p-4  w-4"
              >
                <div className="flex items-center ">
                  <input
                    id={`checkbox-${uuidv4()}`}
                    aria-describedby="checkbox-1"
                    type="checkbox"
                    className="bg-gray-50 accent-btnBg border-gray-300 focus:ring-2 focus:ring-cyan-200 h-4 w-4 rounded"
                  />
                </div>
              </td>
              <td className="p-4 flex items-center whitespace-nowrap space-x-6 mr-12 lg:mr-0 " >
                <img src={user.image} alt={user.image}  className="w-10 h-10 rounded-full"/>
                <div className="text-sm font-normal text-gray-500"> 
                    <div className="text-base font-semibold text-gray-900">
                      {user.name}
                    </div>
                    <div className="text-sm font-normal text-gray-500">
                      {user.email}
                    </div>
                </div>
              </td>
              <td className="text-lg">{user.position}</td>
              <td className="text-lg">{user.country} </td>
              <td className="p-4 whitespace-nowrap text-base font-normal text-gray-900"  >
                <div className="flex items-center">
                  <div className={`h-2.5 w-2.5 rounded-full ${user.status === "active" ? "bg-green-400 " : "bg-red-500"} mr-2`}>
                  
                  </div>
                  {user.status}
                </div>
              </td>
              <td className="p-4 whitespace-nowrap space-x-2">
                <button  className="text-white bg-btnEdit font-medium rounded-lg text-md inline-flex items-center px-3 py-2 text-center" ><FaEdit className="mr-2 h-5 w-5"/>Edit user</button>
                <button  onClick={() => handleDeleteUser(user.id)} className="text-white bg-btnDelete font-medium rounded-lg text-md inline-flex items-center px-3 py-2 text-center" ><RiDeleteBin6Fill className="mr-2 h-5 w-5"/>Delete user</button>
              </td>
             
            </tr>
                    ))
                  }
          
            
          </tbody>
        </table>
      </div>


      <ModalComponent isOpen={isModalOpen} onRequestClose={closeModal}  onSubmitForm={handleFormSubmit} 
     />

    </>
  );
}

export default List;
