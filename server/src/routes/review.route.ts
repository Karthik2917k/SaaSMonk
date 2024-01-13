// Import necessary modules and controllers
import { Request, Response, Router } from "express";
import {
  createNewReview,
  deleteReview,
  updateReview,
  getReview,
} from "../controllers/review.controller";

// Create a new Express Router instance
const app = Router();

// Route for creating a new review for a movie
app.post("/new/:id", (req: Request, res: Response) => {
  return createNewReview(req, res);
});

// Route for getting details of a specific review by ID
app.get("/:reviewId", (req: Request, res: Response) => {
  return getReview(req, res);
});

// Route for updating an existing review by ID
app.patch("/update/:reviewId", (req: Request, res: Response) => {
  return updateReview(req, res);
});

// Route for deleting a review by ID
app.delete("/delete/:id", (req: Request, res: Response) => {
  return deleteReview(req, res);
});

// Export the Express Router instance
export default app;
