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

  async updateUserPr({
    username,
    discipline,
    exercise,
    weight,
  }: {
    username: string;
    discipline: string;
    exercise: string;
    weight: string;
  }) {
    const results = await clerkClient.users.getUserList({
      username: [username],
    });

    const user = results[0];

    if (!user) {
      return;
    }

    const metadata = user.publicMetadata;

    if (!metadata || !metadata["disciplines"]) {
      metadata["disciplines"] = {};
    }

    const disciplines = metadata["disciplines"] as Record<
      string,
      { pr: string; exercise: string }[]
    >;

    if (!disciplines[discipline]) {
      disciplines[discipline] = [];
    }

    disciplines[discipline] = disciplines[discipline].filter(
      (e) => e.exercise !== exercise
    );

    disciplines[discipline].push({ exercise, pr: weight.toString() });

    const result = await clerkClient.users.updateUserMetadata(user.id, {
      publicMetadata: {
        disciplines: disciplines,
      },
    });

    return result;
  }
}
