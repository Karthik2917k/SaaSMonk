const Navbar = () => {
  return (
    <div className="bg-slate-300">
      <div className="w-11/12 py-2  flex justify-between items-center m-auto">
        <div>
          <p className="font-medium text-lg text-[#394753]">MOVIECRITIC</p>
        </div>
        <div className="flex gap-2 font-medium">
          <button className="text-[#7e73f7] border border-[#b5b4ef] px-5 py-2 rounded bg-white">
            Add new movie
          </button>
          <button className="bg-[#6558f5] px-5 py-2 rounded text-white">
            Add new Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
