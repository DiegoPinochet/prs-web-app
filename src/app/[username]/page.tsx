/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Select } from "@/components/generalUI/Select";
import { useEffect, useState } from "react";
import { PRCard } from "@/src/app/[username]/_components/ViewPRs/PRCard";
import {
  getUserDisciplinesFetcher,
  getUserExercisesFetcher,
} from "./_fetchers/get-user-disciplines.fetcher";
import { Exercise } from "@/src/types";
import { User } from "@clerk/nextjs/server";
import { Button } from "@/components/ui";
import { getCurrentUser } from "./_fetchers/get-current.fetcher";

const UserPRs = ({ params }: { params: { username: string } }) => {
  const [disciplines, setDisciplines] = useState<
    { label: string; value: string }[]
  >([]);
  const [discipline, setDiscipline] = useState<string>();
  const [exercises, setExercises] = useState<Exercise[]>([]);

  const [user, setUser] = useState<User | null>();

  const getUser = async () => {
    const user = await getCurrentUser();
    setUser(user);
  };

  const getDisciplineOptions = async () => {
    const disciplines = await getUserDisciplinesFetcher(params.username);
    setDisciplines(disciplines);
  };

  const getExercisesOptions = async () => {
    if (!discipline) {
      return [];
    }
    const exercises = await getUserExercisesFetcher(
      params.username,
      discipline
    );

    setExercises(exercises);
  };

  useEffect(() => {
    getDisciplineOptions();
  }, []);

  useEffect(() => {
    getExercisesOptions();
  }, [discipline]);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold leading-9 tracking-tight text-center">
        PRs
      </h2>
      <p className="text-center">Search PRs by discipline or exercise.</p>

      <div className="mt-5">
        {user && (
          <div className="flex flex-row justify-end px-4">
            <Button className="w-full">Add PR</Button>
          </div>
        )}
        <div className="flex justify-center px-4 mt-5">
          <Select
            placeholder="Discipline..."
            options={disciplines}
            onValueChange={(value) => {
              setDiscipline(value);
            }}
          />
        </div>
        <div className=" max-h-4/5 overflow-auto">
          {exercises.map((exercise) => (
            <PRCard key={exercise.name} exercise={exercise} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserPRs;
