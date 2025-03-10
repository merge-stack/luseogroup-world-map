export type IProject = {
  id: string | number;
  scope: string;
  image: string;
  projectDetails: {
    architect: string;
    size: string;
    category: string;
    region: string;
  };
};
