import { Request, Response } from "express";
import { prisma } from "../prismaClient/index";

/**
 * Create a new review for a movie and update the movie's average rating.
 *
 * @param req - Express Request object containing review details in the request body and movie ID in the request parameters.
 * @param res - Express Response object to send the HTTP response.
 * @returns A JSON response indicating the success or failure of the review creation and movie update.
 */
export const createNewReview = async (req: Request, res: Response) => {
  try {
    let { Rating, comment, reviewrName } = req.body;
    const { id } = req.params;
    if (!reviewrName) {
      reviewrName = "";
    }
    await prisma.review.create({
      data: {
        Rating: Number(Rating),
        comment,
        reviewrName,
        movie: { connect: { id } },
      },
    });
    const movies = await prisma.review.findMany({
      where: { movieId: id },
      select: { Rating: true },
    });
    const ratings = movies.reduce((acc, movie) => acc + movie.Rating, 0);
    const avgRating = (ratings / movies.length).toFixed(1);
    await prisma.movie.update({
      where: { id },
      data: { Average: Number(avgRating) },
    });
    return res
      .status(201)
      .json({ ok: true, message: "Review created successfully" });
  } catch (error: any) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

/**
 * Get details of a specific review by its ID.
 *
 * @param req - Express Request object containing the review ID in the parameters.
 * @param res - Express Response object to send the HTTP response.
 * @returns A JSON response with the details of the requested review or an error message.
 */
export const getReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const review = await prisma.review.findUnique({ where: { id } });
    return res.status(200).json({ ok: true, data: review });
  } catch (error: any) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

/**
 * Update an existing review and recalculate the average rating for the associated movie.
 *
 * @param req - Express Request object containing the updated review details in the request body, review ID in the parameters, and movie ID in the query.
 * @param res - Express Response object to send the HTTP response.
 * @returns A JSON response indicating the success or failure of the review update and movie average rating recalculation.
 */
export const updateReview = async (req: Request, res: Response) => {
  try {
    let data = req.body;
    const { reviewId } = req.params;
    const id: string = req.body.id;
    if (!id) {
      res.status(400).json({ ok: false, message: "Movie Id not found" });
    }
    delete data["id"];
    await prisma.review.update({ where: { id: reviewId }, data });

    const movies = await prisma.review.findMany({
      where: { movieId: id },
      select: { Rating: true },
    });

    const ratings = movies.reduce((acc, movie) => acc + movie.Rating, 0);
    const avgRating = (ratings / movies.length).toFixed(1);

    await prisma.movie.update({
      where: { id },
      data: { Average: Number(avgRating) },
    });
    return res
      .status(200)
      .json({ ok: false, message: "Review Updated successfully" });
  } catch (error: any) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

/**
 * Delete an existing review.
 *
 * @param req - Express Request object containing the review ID in the parameters.
 * @param res - Express Response object to send the HTTP response.
 * @returns A JSON response indicating the success or failure of the review deletion.
 */
export const deleteReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.review.delete({
      where: { id },
    });
    return res
      .status(200)
      .json({ ok: true, message: "Review deleted successfully"});
  } catch (error: any) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};
