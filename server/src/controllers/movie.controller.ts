import { Request, Response } from "express";
import { prisma } from "../prismaClient/index";

/**
 * Creates a new movie in the database.
 *
 * @param req - Express Request object containing the movie details in the request body.
 * @param res - Express Response object to send the HTTP response.
 * @returns A JSON response indicating the success or failure of the movie creation.
 */
export const newMovie = async (req: Request, res: Response) => {
  try {
    const { name, Release } = req.body;
    await prisma.movie.create({
      data: { name, Release },
    });
    return res
      .status(201)
      .json({ ok: true, message: "User Created Successfully" });
  } catch (error: any) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

/**
 * Retrieves a list of movies from the database.
 *
 * @param req - Express Request object.
 * @param res - Express Response object to send the HTTP response.
 * @returns A JSON response containing the list of movies or an error message.
 */
export const getMovies = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    const movies = await prisma.movie.findMany({
      where: search
        ? {
            name: {
              contains: search as string,
              mode: 'insensitive',
            },
          }
        : {},
    });

    return res.status(200).json({ ok: true, data:movies });
  } catch (error: any) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

/**
 * Retrieves a list of movies from the database.
 *
 * @param req - Express Request object.
 * @param res - Express Response object to send the HTTP response.
 * @returns A JSON response containing the movie or an error message.
 */
export const getMovie = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const movie = await prisma.movie.findFirst({
      where: { id },
      include: { reviews: true },
    });
    return res.status(200).json({ ok: true, data: movie });
  } catch (error: any) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

/**
 * Updates a movie in the database based on the provided movie ID.
 *
 * @param req - Express Request object containing the movie details to be updated in the request body.
 * @param res - Express Response object to send the HTTP response.
 * @returns A JSON response indicating the success or failure of the movie update.
 */
export const updateMovie = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const { id } = req.params;

    const updatedMovie = await prisma.movie.update({
      where: { id },
      data: { ...body },
      select: { name: true },
    });
    return res.status(200).json({
      ok: true,
      message: `${updatedMovie.name} movie updated successfully`,
    });
  } catch (error: any) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

/**
 * Deletes a movie from the database based on the provided movie ID.
 *
 * @param req - Express Request object containing the movie ID in the request parameters.
 * @param res - Express Response object to send the HTTP response.
 * @returns A JSON response indicating the success or failure of the movie deletion.
 */
export const deleteMovie = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.review.deleteMany({
      where: { movieId: id },
    });
    const deletedMovie = await prisma.movie.delete({
      where: { id },
      select: { name: true },
    });
    return res.status(200).json({
      ok: true,
      message: `${deletedMovie.name} movie deleted successfully`,
    });
  } catch (error: any) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};
