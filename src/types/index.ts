export interface IHouseCard {
  id: string;
  images: string[];
  title: string;
  description: string;
  rating: number;
  reviewCount: number;
  tags: string[];
  status?: "superhost" | "new"
}