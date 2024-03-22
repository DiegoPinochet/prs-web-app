"use server";

import { DisciplineRepository } from "@/src/repositories/discipline.repository";
import { listDisciplinesUseCase } from "@/src/use-cases/pr.use-case";

export const listDisciplineFetcher = async (): Promise<
  { label: string; value: string }[]
> => {
  const disciplineRepository = new DisciplineRepository();
  const disciplines = await listDisciplinesUseCase(disciplineRepository);

  return disciplines;
};
