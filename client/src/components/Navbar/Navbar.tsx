import { ChangeEvent, FormEvent, useState } from "react";
import Modal from "../Modal/Modal";
import {
  MovieNamesTypes,
  NavbarProps,
  NewMovieProps,
  NewReviewTypes,
} from "./Navbar.types";
import axios from "axios";
import { Link } from "react-router-dom";
const initMovieState: NewMovieProps = {
  name: "",
  Release: "",
};

const initReviewData: NewReviewTypes = {
  comment: "",
  id: "",
  reviewrName: "",
  Rating: 0,
};
const Navbar: React.FC<NavbarProps> = (props: NavbarProps) => {
  const { getMovies, getReviews } = props;

  const [isNewMovieModalOpen, setisNewMovieModalOpen] =
    useState<boolean>(false);

  const [isNewReviewModalOpen, setisNewReviewModalOpen] =
    useState<boolean>(false);

  const [movieData, setMovieData] = useState<NewMovieProps>(initMovieState);
  const [reviewData, setReviewData] = useState<NewReviewTypes>(initReviewData);
  const [movieNames, setMovieNames] = useState<MovieNamesTypes[]>([]);
  const closeNewMovieModal = (): void => {
    setisNewMovieModalOpen(!isNewMovieModalOpen);
  };

  const handleNewMoviedata = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMovieData({ ...movieData, [name]: value });
  };

  const handleMovieSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const url = `${import.meta.env.VITE_SERVER_URL}/movies/new`;

      const parsedDate = new Date(movieData.Release);
      const formattedDate = parsedDate.toISOString();
      const data: NewMovieProps = {
        ...movieData,
        Release: formattedDate,
      };
      await axios.post(url, data);
      if (typeof getMovies == "function") {
        getMovies();
      }
      closeNewMovieModal();
      setMovieData(initMovieState);
    } catch (err) {
      console.log(err);
    }
  };

  const closeNewReviewModal = (): void => {
    setisNewReviewModalOpen(!isNewReviewModalOpen);
  };

  const handleNewReviewdata = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    console.log(name, value);

    setReviewData({ ...reviewData, [name]: value });
  };

  const handleReviewSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (!reviewData.id) {
        console.log("please select movie name");
        return;
      }
      const url = `${import.meta.env.VITE_SERVER_URL}/review/new/${
        reviewData.id
      }`;
      await axios.post(url, reviewData);
      closeNewReviewModal();
      setReviewData(initReviewData);
      if (typeof getReviews == "function") {
        getReviews();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getMovieNames = async () => {
    try {
      const url = `${import.meta.env.VITE_SERVER_URL}/movies/names`;
      const names = await axios.get(url);
      setMovieNames(names.data.data);
      setisNewReviewModalOpen(true);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="bg-slate-300">
      <div className="w-11/12 py-2  flex justify-between items-center m-auto">
        <div>
          <Link to={"/"}>
            {" "}
            <p className="font-medium text-lg text-[#394753]">MOVIECRITIC</p>
          </Link>
        </div>
        <div className="flex gap-2 font-medium">
          <button
            onClick={() => setisNewMovieModalOpen(true)}
            className="text-[#7e73f7] border border-[#b5b4ef] px-5 py-2 rounded bg-white"
          >
            Add new movie
          </button>
          <button
            className="bg-[#6558f5] px-5 py-2 rounded text-white"
            onClick={() => getMovieNames()}
          >
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

      {isNewReviewModalOpen && (
        <Modal closeModal={closeNewReviewModal}>
          <div className="min-w-[300px] md:w-[300px] h-[400px] p-5">
            <p className="text-lg md:text-xl font-medium text-[#3b4954]">
              Add New Review
            </p>

            <form
              className="flex flex-col gap-5 my-5"
              onSubmit={handleReviewSubmit}
            >
              <select
                required
                value={reviewData.id}
                name="id"
                className="h-10 w-full rounded focus:outline-none border-2 border-[#ccd7e0] px-2"
                onChange={(e) => handleNewReviewdata(e)}
              >
                <option>Select a movie</option>
                {movieNames.length > 0 &&
                  movieNames.map((el: MovieNamesTypes) => {
                    return (
                      <option key={el.id} value={el.id}>
                        {el.name}
                      </option>
                    );
                  })}
              </select>
              <input
                className="h-10 w-full rounded focus:outline-none border-2 border-[#ccd7e0] px-2"
                placeholder="Your Name"
                name="reviewrName"
                type="text"
                value={reviewData.reviewrName}
                onChange={(e) => handleNewReviewdata(e)}
                required
              />
              <input
                className="h-10 w-full rounded focus:outline-none border-2 border-[#ccd7e0] px-2"
                onChange={(e) => handleNewReviewdata(e)}
                required
                value={reviewData.Rating}
                name="Rating"
                placeholder="Rating out of 10"
                type="number"
                min={0}
                max={10}
              />
              <textarea
                name="comment"
                value={reviewData.comment}
                className="w-full rounded focus:outline-none border-2 border-[#ccd7e0] px-2"
                onChange={(e) => handleNewReviewdata(e)}
              ></textarea>
              <div className="flex justify-end">
                <button className="bg-[#6558f5] text-white px-5 py-2 font-medium rounded">
                  Add review
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
