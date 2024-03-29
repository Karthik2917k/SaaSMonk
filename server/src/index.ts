import express, { Request, Response } from "express";
import dotenv from "dotenv";
import movieRoutes from "./routes/movie.route";
import movieReviews from "./routes/review.route";
import cors from "cors"
// Load environment variables from .env file
dotenv.config();

// Create an Express application instance
const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
}));

// Use movieRoutes for handling movie-related routes
app.use("/movies", movieRoutes);

// Use movieReviews for handling movie review-related routes
app.use("/review", movieReviews);

// Define the default route for the root endpoint
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ ok: true, message: "Hello, SasSMonk" });
});

// Set the port from environment variables or use 8001 as the default port
const PORT = process.env.PORT || 8001;

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
