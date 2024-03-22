"use server";

import { DisciplineRepository } from "@/src/repositories/discipline.repository";
import { listExerciseUseCase } from "@/src/use-cases/pr.use-case";

export const listExercisesFetcher = async (
  discipline: string
): Promise<{ label: string; value: string }[]> => {
  const disciplineRepository = new DisciplineRepository();

  const exercises = await listExerciseUseCase(disciplineRepository, discipline);

  return exercises;
};
