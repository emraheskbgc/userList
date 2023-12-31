"use client";
import React, { useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import ModalComponent from "../ModalComponent";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import Search from "../Search";
import DeleteBulk from "../DeleteBulk";
import styles from "./styles.module.css";
import ClearFilter from "../ClearFilter";

function List() {
  const [isModalOpen, setIsModalOpen] = useState(false); // modalın açılıp kapanmasını kontrol eden state
  const [userData, setUserData] = useState([]); // eklenen user'ların tutulduğu state
  const [filteredUsers, setFilteredUsers] = useState([]); // search bar için userDatada bulunan arrayin filtrelenip listeyi anlık güncellenmesini sağlayan state
  const [editUserId, setEditUserId] = useState(null); // user'ların düzenlenmesini sağlayan state
  const [selectedUsers, setSelectedUsers] = useState([]); // kullanıcıları toplu silmek için seçilen kullanıcıların tutulduğu state
  const [selectAll, setSelectAll] = useState(false); // kullanıcının checkbox ın işaretlenip işareti kaldırmayı tutan state
  const [sortConfig, setSortConfig] = useState({ column: null, order: null }); // sıralama işlemi yapmak için kullanılan state

  //Config ayarları
  const config = {
    addUserBtn: true,
    searchInput: true,
    clearAllBtn: true,
    clearFilterBtn: true,
    deleteBtn: true,
    editBtn: true,
  };
  //Config ayarları

  useEffect(() => {
    console.log(filteredUsers);
  }, [filteredUsers]);

  //

  // modalın durumunu anlamak için kullanınlan fonksiyon
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
  // modalın durumunu anlamak için kullanınlan fonksiyon

  // modalı açıp kapatmayı kontrol eden fonksiyon
  const openModal = (userId) => {
    setEditUserId(userId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditUserId(null);
    setIsModalOpen(false);
  };
  // modalı açıp kapatmayı kontrol eden fonksiyon

  // tablo başlığının tutulduğu dinamik array
  const column = ["name", "position", "country", "status", "action"];
  // tablo başlığının tutulduğu dinamik array

  // Kullanıcı Silme Fonksiyonu
  // Silme işleminde swalAlert kullanılmıştır
  const handleDeleteUser = (id) => {
    const userDeleteFind = userData.find((user) => user.id === id);

    Swal.fire({
      title: "Are you sure?",
      html: `You want the user named <strong style="color:red"> ${userDeleteFind.name}</strong> to be deleted? `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        const updateUserData = userData.filter((user) => user.id !== id);
        setUserData(updateUserData);
        const updatedFilteredUsers = filteredUsers.filter(
          (user) => user.id !== id
        );
        setFilteredUsers(updatedFilteredUsers);
      }
    });
  };
  // Kullanıcı Silme Fonksiyonu

  // Kullanıcının checkbox ının işaretli olup olmadığını kontrol eden fonksiyon
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
  // Kullanıcının checkbox ının işaretli olup olmadığını kontrol eden fonksiyon

  // Seçili kullanıcıların toplu şekilde silinmesini sağlayan fonksiyon
  const handleDeleteBulk = () => {
    if (selectedUsers.length === 0) {
      // Hiçbir kullanıcı seçilmediyse uyarı verin veya işlem yapmayın
      return;
    }
    // Seçili kullanıcıların toplu şekilde silinmesini sağlayan fonksiyon
    // Toplu silmede kullanılan swal alert
    Swal.fire({
      title: "Are you sure?",
      html: `You want to delete ${selectedUsers.length} selected user(s)?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete them!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedUserData = userData.filter(
          (user) => !selectedUsers.includes(user.id)
        );
        setUserData(updatedUserData);

        const updatedFilteredUsers = filteredUsers.filter(
          (user) => !selectedUsers.includes(user.id)
        );
        setFilteredUsers(updatedFilteredUsers);

        // Seçili kullanıcıları sıfırlayın
        setSelectedUsers([]);

        Swal.fire({
          title: "Deleted!",
          text: "Selected users have been deleted.",
          icon: "success",
        });
      }
    });
    // Toplu silmede kullanılan swal alert
  };

  // head kısmında bulunan checkbox ile listedeki tüm userların seçilmesini sağlayan fonksiyon
  const handleSelectAll = () => {
    const allUserIds = filteredUsers.map((user) => user.id);

    if (selectAll) {
      // Eğer tümünü seçiliyse, tüm seçimleri kaldır
      setSelectedUsers([]);
    } else {
      // Eğer tümü seçili değilse, tüm kullanıcıları seç
      setSelectedUsers(allUserIds);
    }

    // selectAll state'ini tersine çevir
    setSelectAll(!selectAll);
  };
  // head kısmında bulunan checkbox ile listedeki tüm userların seçilmesini sağlayan fonksiyon

  // thead başlılara göre sıralama
  const handleSort = (column) => {
    const newOrder =
      sortConfig.column === column && sortConfig.order === "asc"
        ? "desc"
        : "asc";
    setSortConfig({ column, order: newOrder });

    const sortedUsers = [...filteredUsers].sort((a, b) => {
      if (a[column] < b[column]) return newOrder === "asc" ? -1 : 1;
      if (a[column] > b[column]) return newOrder === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredUsers(sortedUsers);
  };
  // thead başlılara göre sıralama

  return (
    <>
      <div className="flex flex-col md:flex-row md:justify-between">
        <div className="flex flex-col md:flex-row">
          <div>
            {config.searchInput && (
              <Search userData={userData} setFilteredUsers={setFilteredUsers} />
            )}
          </div>
          <div className="flex flex-row space-x-2">
            {config.clearAllBtn && (
              <DeleteBulk
                onDeleteBulk={handleDeleteBulk}
                selectedUsers={selectedUsers}
              />
            )}
            {config.clearFilterBtn && (
              <ClearFilter
                setFilteredUsers={setFilteredUsers}
                setSelectedUsers={setSelectedUsers}
                setSelectAll={setSelectAll}
                setSortConfig={setSortConfig}
                userData={userData}
              />
            )}
          </div>
        </div>

        <div className="md:mr-3 mt-3 md:mt-0">
          {config.addUserBtn && (
            <button className="bg-btnBg rounded-md px-4 py-2 text-white font-medium flex flex-row items-center space-x-3">
              <FaPlus /> <span onClick={() => openModal(null)}> Add user</span>
            </button>
          )}
        </div>
      </div>
      <div className={styles.table}>
        <div className="mt-5 overflow-x-auto">
          <table className="min-w-full ">
            <thead className="md:bg-gray-100 ">
              <tr>
                <th
                  scope="col"
                  className="p-4 text-left text-xs font-medium text-gray-500 uppercase "
                >
                  <div className="flex items-center ">
                    <input
                      id="checkbox-all"
                      aria-describedby="checkbox-all-description"
                      type="checkbox"
                      className="bg-gray-50 accent-btnBg border-gray-300 focus:ring-2 focus:ring-cyan-200 h-4 w-4 rounded"
                      onChange={() => handleSelectAll()}
                      checked={selectAll}
                    />
                    <label htmlFor="checkbox-all" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </th>
                {column.map((item, index) => (
                  <th
                    key={index}
                    onClick={() => handleSort(item)}
                    scope="col"
                    className={`p-4  text-left text-xs font-medium text-gray-500 uppercase ${
                      index > 5 && "hidden md:table-cell"
                    } ${styles["sortable-header"]}`}
                  >
                    {sortConfig.column === item ? (
                      <span>{sortConfig.order === "asc" ? "↑" : "↓"}</span>
                    ) : (
                      <span>{index < 4 && "↓"}</span>
                    )}
                    <span className={styles["sort-icon"]}> {item}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={index} className="hover:bg-gray-100  cursor-pointer">
                  <td scope="col" className="p-4  w-4">
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
                  <td className="p-4 flex mt-4 md:mt-0  items-center whitespace-nowrap space-x-6  mr-6 md:mr-12 lg:mr-0 ">
                    <img
                      src={user.image}
                      alt={user.image}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className=" text-xs  font-normal text-gray-500 md:text-base md:font-semibold md:text-gray-900">
                      <div className="text-base font-semibold text-gray-900">
                        {user.name}
                      </div>
                      <div className="text-sm font-normal text-gray-500 hidden md:block">
                        {user.email}
                      </div>
                    </div>
                  </td>
                  <td className="text-lg text-center pr-4   ">
                    {user.position}
                  </td>
                  <td className="text-lg text-center pr-4   ">
                    {user.country}{" "}
                  </td>
                  <td className="p-4 md:whitespace-nowrap md:text-base md:font-normal md:text-gray-900">
                    <div className="flex  items-center">
                      <div
                        className={`h-2.5 w-2.5   rounded-full ${
                          user.status === "active"
                            ? "bg-green-400 "
                            : "bg-red-500"
                        } mr-2`}
                      ></div>
                      <span className=" "> {user.status}</span>
                    </div>
                  </td>
                  <td className="p-4 md:whitespace-nowrap space-x-2  ">
                    {config.editBtn && (
                      <button
                        onClick={() => openModal(user.id)}
                        className="text-white bg-btnEdit font-medium rounded-lg text-xs md:text-md inline-flex items-center px-3 py-2 text-center"
                      >
                        <FaEdit className="mr-1 md:mr-2 md:h-5 md:w-5" />
                        Edit user
                      </button>
                    )}
                    {config.deleteBtn && (
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-white bg-btnDelete font-medium rounded-lg mt-2 md:mt-0 text-xs md:text-md inline-flex items-center px-3 py-2 text-center"
                      >
                        <RiDeleteBin6Fill className="mr-1   md:mr-2 md:h-5 md:w-5" />
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ModalComponent
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        onSubmitForm={handleFormSubmit}
        isEditMode={editUserId !== null}
        userToEdit={userData.find((user) => user.id === editUserId)}
      />
    </>
  );
}

export default List;
