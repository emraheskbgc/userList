import React from 'react'

function ClearFilter({setFilteredUsers,setSelectedUsers,setSelectAll,setSortConfig,userData}) {
    const clearFilters = () => {
        // Filtrelenmiş kullanıcıları orijinal userData'ya sıfırla
        setFilteredUsers(userData);
    
        // Seçili kullanıcıları sıfırla 
        setSelectedUsers([]);
    
        // selectAll durumunu sıfırla
        setSelectAll(false);
    
        // sortConfig'i sıfırla
        setSortConfig({ column: null, order: null });
      };
  return (
    <div className="md:mr-3 mt-3 md:mt-0">
    {
        userData.length === 0 ? <button disabled 
        className="bg-teal-500 cursor-not-allowed rounded-md px-4 opacity-30 py-2 text-white font-medium flex flex-row items-center space-x-3"
        onClick={clearFilters} // Filtreleri Temizle fonksiyonunu tetikleyen düğme
      >
        <span>Clear Filters</span>
      </button> : <button
      className="bg-teal-500 rounded-md px-4 py-2 text-white font-medium flex flex-row items-center space-x-3"
      onClick={clearFilters} // Filtreleri Temizle fonksiyonunu tetikleyen düğme
    >
      <span>Clear Filters</span>
    </button>
    }
         
        </div>
  )
}

export default ClearFilter