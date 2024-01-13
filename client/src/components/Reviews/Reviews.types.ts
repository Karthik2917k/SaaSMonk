export interface MovieReviewTypes {
  Average: number;
  Release: string;
  id: string;
  name: string;
  reviews: ReviewsTypes[];
}

export interface ReviewsTypes {
  Rating: number;
  comment: string;
  id: string;
  movieId: string;
  reviewrName: string;
}


export interface updateReviewTypes {
    id: string;
    reviewrName: string;
    comment: string;
    Rating: number;
}