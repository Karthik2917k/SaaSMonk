import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import Movies from "../components/Movies/Movies";
import Reviews from "../components/Reviews/Reviews";
const AllRoutes = () => {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Movies />} />
        <Route path="/reviews/:id" element={<Reviews />} />
      </Routes>
    </Fragment>
  );
};

export default AllRoutes;
