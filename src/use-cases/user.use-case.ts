"use server";

import { UserRepository } from "../repositories/user.repository";

export const getUserDisciplines = async (
  username: string,
  userRepository: UserRepository
) => {
  return userRepository.getUserDisciplines(username);
};
