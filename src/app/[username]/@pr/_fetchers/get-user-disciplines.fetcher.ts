"use server";

import { DisciplineRepository } from "@/src/repositories/discipline.repository";
import { UserRepository } from "@/src/repositories/user.repository";
import { Exercise } from "@/src/types";
import { getUserDisciplinesUseCase } from "@/src/use-cases/user.use-case";

export const getUserDisciplinesFetcher = async (
  username: string
): Promise<{ label: string; value: string }[]> => {
  const userRepository = new UserRepository();
  const disciplineRepository = new DisciplineRepository();

  const disciplines = await getUserDisciplinesUseCase(
    username,
    userRepository,
    disciplineRepository
  );

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
  const disciplineRepository = new DisciplineRepository();

  const disciplines = await getUserDisciplinesUseCase(
    username,
    userRepository,
    disciplineRepository
  );

  const selectedDiscipline = disciplines.find(
    (discipline) => discipline.name === disciplineName
  );

  if (!selectedDiscipline) {
    return [];
  }

  return selectedDiscipline.exercises;
};
