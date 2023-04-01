export interface IHouseCard {
  id: string;
  images: string[];
  title: string;
  description: string;
  rating: number;
  reviewCount: number;
  tags: string[];
  position: [lat: number, lng: number]
  status?: "superhost" | "new"
}