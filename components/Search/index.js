import React, { useState } from "react";

function Search({ userData, setFilteredUsers }) {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    const filteredUser = userData.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filteredUser);
  };

  return (
    <>
      <input
        value={searchTerm}
        onChange={handleSearch}
        type="text"
        className="bg-gray-100 border border-1 border-srcColor placeholder:text-srcPlace rounded-md px-2 py-1 w-[350px]"
        placeholder="Search for users"
      />
    </>
  );
}

export default Search;
