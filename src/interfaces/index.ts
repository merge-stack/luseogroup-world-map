export interface IProject {
  id: number;
  name: string;
  coordinates: [number, number];
  description: string;
  city: string;
  region: string;
  area: string;
  architect: string;
  category: string;
  photos: string[];
}
