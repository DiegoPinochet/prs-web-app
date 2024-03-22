"use client";

import { Select } from "@/components/generalUI/Select";
import { Exercise } from "@/src/types";
import { FC, useEffect, useState } from "react";
import { PRCard } from "./ViewPRs/PRCard";
import { getUserExercisesFetcher } from "../_fetchers/get-user-disciplines.fetcher";

export interface ShowPRProps {
  username: string;
  userDisciplines: { label: string; value: string }[];
}

export const ShowUserPrs: FC<ShowPRProps> = ({
  username,
  userDisciplines,
}: ShowPRProps) => {
  const [discipline, setDiscipline] = useState<string>();
  const [userExercises, setUserExercises] = useState<Exercise[]>([]);

  const getExercisesOptions = async () => {
    if (!discipline) {
      return [];
    }
    const exercises = await getUserExercisesFetcher(username, discipline);

    setUserExercises(exercises);
  };

  useEffect(() => {
    getExercisesOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [discipline]);

  return (
    <>
      <div className="flex justify-center px-4 mt-5">
        <Select
          placeholder="Discipline..."
          options={userDisciplines}
          onValueChange={(value) => {
            setDiscipline(value);
          }}
        />
      </div>
      <div className="max-h-7/10 overflow-auto mt-5">
        {userExercises.map((exercise) => (
          <PRCard key={exercise.name} exercise={exercise} />
        ))}
      </div>
    </>
  );
};
