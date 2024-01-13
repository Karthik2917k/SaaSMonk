import { Fragment } from "react";
import Navbar from "./components/Navbar";
import AllRoutes from "./routes/AllRoutes";

function App() {
  return (
    <Fragment>
      <Navbar />
      <AllRoutes />
    </Fragment>
  );
}

export default App;
