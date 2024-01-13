import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  MovieReviewTypes,
  ReviewsTypes,
  updateReviewTypes,
} from "./Reviews.types";
import { BiSolidEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { MovieNamesTypes } from "../Navbar/Navbar.types";
import Modal from "../Modal/Modal";
const initReviewData: updateReviewTypes = {
  comment: "",
  id: "",
  reviewrName: "",
  Rating: 0,
};
const Reviews = () => {
  const { id } = useParams<{ id: string }>();
  const [movieReviews, setMovieRevies] = useState<MovieReviewTypes>({
    Average: 0,
    id: "",
    name: "",
    Release: "",
    reviews: [],
  });
  const [reviewData, setReviewData] =
    useState<updateReviewTypes>(initReviewData);
  const [movieNames, setMovieNames] = useState<MovieNamesTypes[]>([]);
  const [isUpdateReviewModalOpen, setisUpdateReviewModalOpen] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [reviewId, setReviewId] = useState<string>("");
  const getReviews = async () => {
    const url = `${import.meta.env.VITE_SERVER_URL}/movies/${id}`;
    setLoading(true);
    try {
      if (!id) {
        return;
      }
      const res = await axios.get(url);
      setMovieRevies(res.data.data);

      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  const deleteReview = async (reviewId: string): Promise<void> => {
    try {
      const url = `${
        import.meta.env.VITE_SERVER_URL
      }/review/delete/${reviewId}`;
      await axios.delete(url);
      console.log("comment deleted successfully");
      getReviews();
    } catch (err) {
      console.log(err);
    }
  };

  const closUpdateReviewModal = (): void => {
    setisUpdateReviewModalOpen(!isUpdateReviewModalOpen);
  };

  const handleUpdateReviewdata = (
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
      const url = `${
        import.meta.env.VITE_SERVER_URL
      }/review/update/${reviewId}`;
      await axios.patch(url, reviewData);
      closUpdateReviewModal();
      setReviewData(initReviewData);
      getReviews();
    } catch (err) {
      console.log(err);
    }
  };

  const getMovieNames = async (el: ReviewsTypes) => {
    try {
      const url = `${import.meta.env.VITE_SERVER_URL}/movies/names`;
      const names = await axios.get(url);
      setMovieNames(names.data.data);
      setisUpdateReviewModalOpen(true);
      getReviews();
      setReviewData({
        comment: el.comment,
        id: el.movieId,
        Rating: el.Rating,
        reviewrName: el.reviewrName,
      });
      setReviewId(el.id);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getReviews();
  }, [id]);
  return (
    <div>
      <Navbar getReviews={getReviews} />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="w-11/12 m-auto">
          <div className="flex justify-between my-10">
            <p className="text-lg md:text-4xl">{movieReviews.name}</p>
            <p className="text-[#6558f5] text-xl md:text-4xl">
              {movieReviews.Average ? movieReviews.Average : 0}/10
            </p>
          </div>

          <div className="flex flex-col gap-5">
            {movieReviews.reviews.length > 0 ? (
              movieReviews.reviews.map((el: ReviewsTypes) => (
                <div className="border-2 border-[#ccd7e0] p-5" key={el.id}>
                  <div className="flex justify-between my-2  py-2">
                    <p className="text-lg">{el.comment}</p>
                    <p className="text-[#6558f5] text-xl md:text-2xl">
                      {el.Rating ? el.Rating : 0}/10
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="italic text-gray-500">{el.reviewrName}</p>
                    </div>
                    <div className="flex gap-2">
                      <BiSolidEdit
                        className="text-gray-500 hover:text-gray-600 w-5 h-5 cursor-pointer"
                        onClick={() => getMovieNames(el)}
                      />
                      <MdDelete
                        className="text-gray-500 hover:text-gray-600 w-5 h-5 cursor-pointer"
                        onClick={() => deleteReview(el.id)}
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>
                <p>No reviews found for this movie...</p>
              </div>
            )}
          </div>
        </div>
      )}
      {isUpdateReviewModalOpen && (
        <Modal closeModal={closUpdateReviewModal}>
          <div className="min-w-[300px] md:w-[300px] h-[400px] p-5">
            <p className="text-lg md:text-xl font-medium text-[#3b4954]">
              Update Review
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
                onChange={(e) => handleUpdateReviewdata(e)}
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
                onChange={(e) => handleUpdateReviewdata(e)}
                required
              />
              <input
                className="h-10 w-full rounded focus:outline-none border-2 border-[#ccd7e0] px-2"
                onChange={(e) => handleUpdateReviewdata(e)}
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
                onChange={(e) => handleUpdateReviewdata(e)}
              ></textarea>
              <div className="flex justify-end">
                <button className="bg-[#6558f5] text-white px-5 py-2 font-medium rounded">
                  Update Review
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Reviews;
