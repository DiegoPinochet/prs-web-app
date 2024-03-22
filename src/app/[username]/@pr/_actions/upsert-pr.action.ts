"use server";

import { UserRepository } from "@/src/repositories/user.repository";
import { upsertPrUseCase } from "@/src/use-cases/pr.use-case";

export const UpsertPrAction = async ({
  username,
  discipline,
  exercise,
  weight,
}: {
  username: string;
  discipline: string;
  exercise: string;
  weight: string;
}): Promise<{ success: boolean; value: string; error?: string }> => {
  const userRepository = new UserRepository();

  const result = await upsertPrUseCase(
    {
      username,
      discipline,
      exercise,
      weight,
    },
    userRepository
  );

  if (!result) {
    return {
      success: false,
      value: "",
      error: "No se ha podido realizar la pretición",
    };
  }

  return { success: true, value: "PRs actualizadas" };
};
