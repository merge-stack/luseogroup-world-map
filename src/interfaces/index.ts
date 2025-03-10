export type IProject = {
  id: number;
  name: string;
  coordinates: [number, number];
  scope: string;
  image: string;
  projectDetails: {
    architect: string;
    size: string;
    category: string;
    region: string;
  };
};
