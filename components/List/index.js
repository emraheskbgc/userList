"use client";
import React, {useEffect} from "react";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import {useState} from "react";
import { FaPlus } from "react-icons/fa";
import ModalComponent from "../ModalComponent";
import { v4 as uuidv4 } from 'uuid';
import Swal from "sweetalert2";
import Search from "../Search";
import DeleteBulk from "../DeleteBulk";

function List() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [userData, setUserData] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([])
  const [editUserId, setEditUserId] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);

 

 
  
  useEffect(() => {
   console.log(filteredUsers);
  }, [filteredUsers]);


  const handleFormSubmit = (data) => {
    if (editUserId !== null) {
      // Düzenleme modunda ise, kullanıcı verilerini güncelle
      const updatedUserData = userData.map((user) =>
        user.id === editUserId ? { ...user, ...data } : user
      );
      setUserData(updatedUserData);

      const updatedFilteredUsers = filteredUsers.map((user) =>
      user.id === editUserId ? { ...user, ...data } : user
    );
    setFilteredUsers(updatedFilteredUsers);
    } else {
      // Ekleme modunda ise, yeni kullanıcıyı ekleyin
      const newUser = { ...data, id: uuidv4() };
      setUserData([...userData, newUser]);
      setFilteredUsers([...filteredUsers, newUser]);
    }

    // Modal'ı kapat
    closeModal();
  };
 

 
  const openModal = (userId) => {
    setEditUserId(userId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditUserId(null);
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
  const updatedFilteredUsers = filteredUsers.filter((user) => user.id !== id);
      setFilteredUsers(updatedFilteredUsers);
    }
  });
 
}
// Kullanıcı Silme Fonksiyonu
const handleCheckboxChange = (userId) => {
  if (selectedUsers.includes(userId)) {
    // Kullanıcı zaten seçili ise kaldır
    const updatedSelectedUsers = selectedUsers.filter((id) => id !== userId);
    setSelectedUsers(updatedSelectedUsers);
  } else {
    // Kullanıcı seçili değilse ekleyin
    setSelectedUsers([...selectedUsers, userId]);
  }
};
const handleDeleteBulk = () => {
  if (selectedUsers.length === 0) {
    // Hiçbir kullanıcı seçilmediyse uyarı verin veya işlem yapmayın
    return;
  }
  Swal.fire({
    title: "Are you sure?",
    html: `You want to delete ${selectedUsers.length} selected user(s)?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete them!"
  }).then((result) => {
    if (result.isConfirmed) {
      const updatedUserData = userData.filter((user) => !selectedUsers.includes(user.id));
      setUserData(updatedUserData);

      const updatedFilteredUsers = filteredUsers.filter((user) => !selectedUsers.includes(user.id));
      setFilteredUsers(updatedFilteredUsers);

      // Seçili kullanıcıları sıfırlayın
      setSelectedUsers([]);

      Swal.fire({
        title: "Deleted!",
        text: "Selected users have been deleted.",
        icon: "success"
      });
    }
  });
};
console.log(selectedUsers);
  return (
    <>
    <div className="flex flex-row  justify-between">
        <div className="flex">
        <Search userData={userData} setFilteredUsers={setFilteredUsers} />
        <DeleteBulk onDeleteBulk={handleDeleteBulk}/>
        </div>
        
        <div className="mr-3">
          <button className="bg-btnBg rounded-md px-4 py-2 text-white font-medium flex flex-row items-center space-x-3">
            <FaPlus /> <span onClick={() => openModal(null)}> Add user</span>
           
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
                    filteredUsers.map((user,index) => (
                      <tr key={index} className="hover:bg-gray-100 cursor-pointer">
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
                    onChange={() => handleCheckboxChange(user.id)}
                    checked={selectedUsers.includes(user.id)}
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
                <button  onClick={() => openModal(user.id)}  className="text-white bg-btnEdit font-medium rounded-lg text-md inline-flex items-center px-3 py-2 text-center" ><FaEdit className="mr-2 h-5 w-5"/>Edit user</button>
                <button  onClick={() => handleDeleteUser(user.id)} className="text-white bg-btnDelete font-medium rounded-lg text-md inline-flex items-center px-3 py-2 text-center" ><RiDeleteBin6Fill className="mr-2 h-5 w-5"/>Delete user</button>
              </td>
             
            </tr>
                    ))
                  }
          
            
          </tbody>
        </table>
      </div>


      <ModalComponent isOpen={isModalOpen} onRequestClose={closeModal}  onSubmitForm={handleFormSubmit}  isEditMode={editUserId !== null}
      userToEdit={userData.find((user) => user.id === editUserId)}
     />

    </>
  );
}

export default List;
