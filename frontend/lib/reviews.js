import { api } from "./api";
import { USE_MOCK } from "./config";

// POST /reviews, hanya untuk pesanan completed milik sendiri. 409 = sudah diulas
export const createReview = ({ orderId, rating, comment }) =>
  api("/reviews", { method: "POST", body: { orderId, rating, comment }, auth: true });

// GET /reviews/item/:id (publik): { averageRating, total, reviews: [{ rating, comment, createdAt, user: { name } }] }
export const getItemReviews = async (itemId) =>
  USE_MOCK ? { averageRating: null, total: 0, reviews: [] } : api(`/reviews/item/${itemId}`);