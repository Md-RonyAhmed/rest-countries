const Header = ({searchTerm, handleSearchChange}) => {
  return (
    <header className="bg-blue-600 text-white py-4 shadow-md fixed top-0  w-full z-10 flex justify-between px-20">
      <div>
        <h1 className="text-3xl font-bold">Countries Information</h1>
      </div>
      {/* Search Input */}
      <div className="w-1/6">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by a country name..."
          className="px-4 py-2 border ring-1 rounded-lg w-full text-black"
        />
      </div>
    </header>
  );
};

export default Header;
