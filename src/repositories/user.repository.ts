import { clerkClient } from "@clerk/nextjs";
import { Disciplines } from "../types";

export class UserRepository {
  async getUserDisciplines(username: string): Promise<Disciplines[]> {
    const results = await clerkClient.users.getUserList({
      username: [username],
    });

    if (!results || !results[0]) {
      return [];
    }

    const metadata = results[0].publicMetadata;

    if (!metadata || !metadata["disciplines"]) {
      return [];
    }

    const disciplines = metadata["disciplines"] as Record<
      string,
      { pr: string; exercise: string }[]
    >;

    return Object.keys(disciplines).map((name) => ({
      name,
      exercises: disciplines[name].map((exercise) => ({
        name: exercise.exercise,
        pr: exercise.pr,
      })),
    }));
  }
}
