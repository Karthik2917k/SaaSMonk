import { Request, Response, Router } from "express";
import {
  newMovie,
  updateMovie,
  deleteMovie,
  getMovies,
  getMovie,
} from "../controllers/movie.controller";

// Create a new Express Router instance
const app = Router();

// Route for creating a new movie
app.post("/new", (req: Request, res: Response) => {
  return newMovie(req, res);
});

// Route for updating a movie by ID
app.patch("/update/:id", (req: Request, res: Response) => {
  return updateMovie(req, res);
});

// Route for deleting a movie by ID
app.delete("/delete/:id", (req: Request, res: Response) => {
  return deleteMovie(req, res);
});

// Route for fetching all movies
app.get("/", (req: Request, res: Response) => {
  return getMovies(req, res);
});

// Route for fetching a specific movie by ID
app.get("/:id", (req: Request, res: Response) => {
  return getMovie(req, res);
});

// Export the Express Router instance
export default app;
