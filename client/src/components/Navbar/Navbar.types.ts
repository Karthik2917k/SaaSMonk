export interface NewMovieProps {
  name: string;
  Release: string;
}

export interface NewReviewTypes {
  id: string;
  reviewrName: string;
  comment: string;
  Rating: number;
}

export interface MovieNamesTypes {
  name: string;
  id: string;
}
export interface NavbarProps {
  getMovies?: () => void;
  getReviews?: () => Promise<void>;
}
