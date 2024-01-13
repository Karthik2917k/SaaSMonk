import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import axios from "axios";
import { movieTypes } from "./types";
import { formatDate } from "../../utils/formateData";
import { BiSolidEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
const Movies = () => {
  const [movies, setMovies] = useState<movieTypes[]>([]);
  //   const [movie, setMovie] = useState<string>("");
  const getMovies = async () => {
    const url = `${import.meta.env.VITE_SERVER_URL}/movies`;
    const movies = await axios.get(url);
    setMovies(movies.data.data);
  };
  useEffect(() => {
    getMovies();
  }, []);
  return (
    <div className="w-11/12 m-auto my-10">
      <p className="text-xl md:text-3xl font-medium text-[#3b4954]">
        The best movie reviews site!
      </p>
      <div className="relative">
        <IoSearch className="absolute top-6 left-2 w-5 h-10 text-slate-400" />
        <input
          className="border-2 rounded h-12 my-5 border-[#d8d5fc] focus:outline-none px-10 text-[#3b4954]"
          placeholder="Search for your favourite movie"
        />
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {movies &&
          movies.map((el: movieTypes) => (
            <div
              key={el.id}
              className="bg-[#e0defd] p-5 flex flex-col gap-2 text-lg"
            >
              <p>{el.name}</p>
              <p className="italic text-slate-700">Released:{formatDate(el.Release)}</p>
              <p className="font-bold">Rating: {el.Average}/10</p>
              <div className="my-1 flex justify-end gap-2">
                <BiSolidEdit className="text-gray-500 hover:text-gray-600 w-5 h-5 cursor-pointer"  />
                <MdDelete className="text-gray-500 hover:text-gray-600 w-5 h-5 cursor-pointer" />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Movies;
