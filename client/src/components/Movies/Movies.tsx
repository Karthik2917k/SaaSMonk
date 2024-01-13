import { ChangeEvent, FormEvent, Fragment, useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import axios from "axios";
import { movieTypes } from "./types";
import { formatDate } from "../../utils/formateData";
import { BiSolidEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import Modal from "../Modal/Modal";
import Navbar from "../Navbar/Navbar";
import { NewMovieProps } from "../Navbar/Navbar.types";
import { Link } from "react-router-dom";
const initMovieState: NewMovieProps = {
  name: "",
  Release: "",
};
const Movies = () => {
  const [movies, setMovies] = useState<movieTypes[]>([]);
  const [movieData, setMovieData] = useState<NewMovieProps>(initMovieState);
  const [isUpdateMovieModalOpen, setisUpdateMovieModalOpen] =
    useState<boolean>(false);
  const [updateMovieId, setupdateMovieId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [movie, setMovie] = useState<string>("");
  const getMovies = async () => {
    setLoading(true);
    try {
      const url = `${import.meta.env.VITE_SERVER_URL}/movies?search=${movie}`;
      const movies = await axios.get(url);
      setMovies(movies.data.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  const closeUpdateMovieModal = () => {
    setisUpdateMovieModalOpen(!isUpdateMovieModalOpen);
  };

  const handleNewMoviedata = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMovieData({ ...movieData, [name]: value });
  };

  const handleupdateMovieSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const url = `${
        import.meta.env.VITE_SERVER_URL
      }/movies//update/${updateMovieId}`;

      const parsedDate = new Date(movieData.Release);
      const formattedDate = parsedDate.toISOString();
      const data: NewMovieProps = {
        ...movieData,
        Release: formattedDate,
      };
      await axios.patch(url, data);
      getMovies();
      closeUpdateMovieModal();
      setMovieData(initMovieState);
    } catch (err) {
      console.log(err);
    }
  };
  const getMovie = async (id: string): Promise<void> => {
    try {
      const url = `${import.meta.env.VITE_SERVER_URL}/movies/${id}`;
      const res = await axios.get(url);
      const data: NewMovieProps = res.data.data;
      const dateObject = new Date(data.Release);
      const formattedDate = dateObject.toISOString().split("T")[0];
      setMovieData({ name: data.name, Release: formattedDate });
      setisUpdateMovieModalOpen(true);
      setupdateMovieId(id);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteMovie = async (id: string): Promise<void> => {
    try {
      const url = `${import.meta.env.VITE_SERVER_URL}/movies/delete/${id}`;
      await axios.delete(url);
      getMovies();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMovies();
  }, [movie]);
  return (
    <Fragment>
      <Navbar key={"Navbar"} getMovies={getMovies} />

      <div className="w-11/12 m-auto my-10">
        <p className="text-xl md:text-3xl font-medium text-[#3b4954]">
          The best movie reviews site!
        </p>
        <div className="relative">
          <IoSearch className="absolute top-6 left-2 w-5 h-10 text-slate-400" />
          <input
            className="border-2 rounded h-12 my-5 border-[#d8d5fc] focus:outline-none px-10 text-[#3b4954]"
            placeholder="Search for your favourite movie"
            onChange={(e) => setMovie(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="w-11/12 m-auto my-10">Loading....</div>
        ) : (
          <div className="grid md:grid-cols-3 gap-5">
            {movies.length > 0 ? (
              movies.map((el: movieTypes) => (
                <div key={el.id} className="bg-[#e0defd] p-5 ">
                  <Link className="flex flex-col gap-2 text-lg" to={`/reviews/${el.id}?${el.name}`}>
                    <p>{el.name}</p>
                    <p className="italic text-slate-700">
                      Released:{formatDate(el.Release)}
                    </p>
                    <p className="font-bold">Rating: {el.Average?el.Average:0}/10</p>
                  </Link>
                  <div className="my-1 flex justify-end gap-2">
                    <BiSolidEdit
                      className="text-gray-500 hover:text-gray-600 w-5 h-5 cursor-pointer"
                      onClick={() => getMovie(el.id)}
                    />
                    <MdDelete
                      className="text-gray-500 hover:text-gray-600 w-5 h-5 cursor-pointer"
                      onClick={() => deleteMovie(el.id)}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div>Looking Movie is Not Found</div>
            )}
          </div>
        )}
        {isUpdateMovieModalOpen && (
          <Modal closeModal={closeUpdateMovieModal}>
            <div className="min-w-[300px] md:w-[300px] h-[250px] p-5">
              <p className="text-lg md:text-xl font-medium text-[#3b4954]">
                Update New Movie
              </p>

              <form
                className="flex flex-col gap-5 my-5"
                onSubmit={handleupdateMovieSubmit}
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
                    Update Movie
                  </button>
                </div>
              </form>
            </div>
          </Modal>
        )}
      </div>
    </Fragment>
  );
};

export default Movies;
