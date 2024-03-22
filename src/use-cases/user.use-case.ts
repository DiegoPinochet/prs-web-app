"use server";

import { DisciplineRepository } from "../repositories/discipline.repository";
import { UserRepository } from "../repositories/user.repository";

export const getUserDisciplinesUseCase = async (
  username: string,
  userRepository: UserRepository,
  disciplineRepository: DisciplineRepository
) => {
  const disciplines = await userRepository.getUserDisciplines(username);
  const mappedDisciplines = await disciplineRepository.mapDisciplines(
    disciplines
  );
  return mappedDisciplines;
};
