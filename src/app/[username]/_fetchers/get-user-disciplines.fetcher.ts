"use server";

import { UserRepository } from "@/src/repositories/user.repository";
import { Disciplines, Exercise } from "@/src/types";
import { getUserDisciplines } from "@/src/use-cases/user.use-case";

export const getUserDisciplinesFetcher = async (
  username: string
): Promise<{ label: string; value: string }[]> => {
  const userRepository = new UserRepository();

  const disciplines = await getUserDisciplines(username, userRepository);

  return disciplines.map((discipline) => ({
    label: discipline.name,
    value: discipline.name,
  }));
};

export const getUserExercisesFetcher = async (
  username: string,
  disciplineName: string
): Promise<Exercise[]> => {
  const userRepository = new UserRepository();

  const disciplines = await getUserDisciplines(username, userRepository);

  const selectedDiscipline = disciplines.find(
    (discipline) => discipline.name === disciplineName
  );

  if (!selectedDiscipline) {
    return [];
  }

  return selectedDiscipline.exercises;
};
