"use server";

import { DisciplineRepository } from "../repositories/discipline.repository";
import { UserRepository } from "../repositories/user.repository";

export const upsertPrUseCase = async (
  {
    username,
    discipline,
    exercise,
    weight,
  }: {
    username: string;
    discipline: string;
    exercise: string;
    weight: string;
  },
  userRepository: UserRepository
) => {
  const result = userRepository.updateUserPr({
    username,
    discipline,
    exercise,
    weight,
  });

  return result;
};

export const listDisciplinesUseCase = async (
  disciplineRepository: DisciplineRepository
) => {
  const disciplines = await disciplineRepository.listDisciplines();
  return disciplines.map((discipline) => ({
    label: discipline.name,
    value: discipline.value,
  }));
};

export const listExerciseUseCase = async (
  disciplineRepository: DisciplineRepository,
  discipline: string
) => {
  const exercises = await disciplineRepository.getDisciplineExercises(
    discipline
  );
  return exercises.map((exercise) => ({
    label: exercise.name,
    value: exercise.value,
  }));
};
