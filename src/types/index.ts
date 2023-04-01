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

export interface SearchLocation {
  place_id: string;
  boundingbox: readonly [minLat: string, maxLat: string, minLon: string, maxLon:string],
  lat: string;
  lon: string;
  display_name: string;
  category: string;
  importance: number;
}

export interface GenericCustomComponent {
  className?: string;
  onClick?: () => void;
}