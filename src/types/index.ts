export type Exercise = {
  name: string;
  pr: string;
};

export type Disciplines = {
  name: string;
  exercises: Exercise[];
};
