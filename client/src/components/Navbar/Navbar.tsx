import { ChangeEvent, FormEvent, useState } from "react";
import Modal from "../Modal/Modal";
import {NavbarProps, NewMovieProps } from "./Navbar.types";
import axios from "axios";
const initMovieState: NewMovieProps = {
  name: "",
  Release: "",
};
const Navbar:React.FC<NavbarProps> = (props:NavbarProps) => {
  const {getMovies} = props;

  const [isNewMovieModalOpen, setisNewMovieModalOpen] =
    useState<boolean>(false);

  const [movieData, setMovieData] = useState<NewMovieProps>(initMovieState);
  const closeNewMovieModal = (): void => {
    setisNewMovieModalOpen(!isNewMovieModalOpen);
  };

  const handleNewMoviedata = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMovieData({ ...movieData, [name]: value });
  };

  const handleMovieSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const url = `${import.meta.env.VITE_SERVER_URL}/movies/new`;

    const parsedDate = new Date(movieData.Release);
    const formattedDate = parsedDate.toISOString();
    const data: NewMovieProps = {
      ...movieData,
      Release: formattedDate,
    };
    await axios.post(url, data);
    getMovies()
    closeNewMovieModal()
    setMovieData(initMovieState);

  };
  return (
    <div className="bg-slate-300">
      <div className="w-11/12 py-2  flex justify-between items-center m-auto">
        <div>
          <p className="font-medium text-lg text-[#394753]">MOVIECRITIC</p>
        </div>
        <div className="flex gap-2 font-medium">
          <button
            onClick={() => setisNewMovieModalOpen(true)}
            className="text-[#7e73f7] border border-[#b5b4ef] px-5 py-2 rounded bg-white"
          >
            Add new movie
          </button>
          <button className="bg-[#6558f5] px-5 py-2 rounded text-white">
            Add new Review
          </button>
        </div>
      </div>
      {isNewMovieModalOpen && (
        <Modal closeModal={closeNewMovieModal}>
          <div className="min-w-[300px] md:w-[300px] h-[250px] p-5">
            <p className="text-lg md:text-xl font-medium text-[#3b4954]">
              Add New Movie
            </p>

            <form
              className="flex flex-col gap-5 my-5"
              onSubmit={handleMovieSubmit}
            >
              <input
                className="h-10 w-full rounded focus:outline-none border-2 border-[#ccd7e0] px-2"
                placeholder="Name"
                name="name"
                type="text"
                value={movieData.name}
                onChange={(e) => handleNewMoviedata(e)}
                required
              />
              <input
                className="h-10 w-full rounded focus:outline-none border-2 border-[#ccd7e0] px-2"
                onChange={(e) => handleNewMoviedata(e)}
                required
                value={movieData.Release}
                name="Release"
                placeholder="Reaesed Date"
                type="date"
              />
              <div className="flex justify-end">
                <button className="bg-[#6558f5] text-white px-5 py-2 font-medium rounded">
                  Create Movie
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Navbar;
