import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import Movies from "../components/Movies/Movies";
const AllRoutes = () => {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Movies />} />
      </Routes>
    </Fragment>
  );
};

export default AllRoutes;
