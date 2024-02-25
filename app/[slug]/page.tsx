"use client";

import { Select } from "@/components/generalUI/Select";
import { redirect } from "next/navigation";

const UserPRs = ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { exercise: string };
}) => {
  const getExercisesByDisciplineOptions = () => {
    if (params.slug === "diego") {
      return [
        {
          groupLabel: "Crossfit",
          groupOptions: [
            {
              label: "Split Jerk",
              value: "splitJerk",
            },
            {
              label: "Back Squat",
              value: "backSquat",
            },
            {
              label: "Front Squat",
              value: "frontSquat",
            },
            {
              label: "Strict Shoulder Press",
              value: "strictShoulderPress",
            },
            {
              label: "Over Head Squat",
              value: "overHeadSquat",
            },
            {
              label: "Squat Snatch",
              value: "squatSnatch",
            },
            {
              label: "Squat Clean",
              value: "squatClean",
            },
            {
              label: "Deadlift",
              value: "deadlift",
            },
            {
              label: "Bench Press",
              value: "benchPress",
            },
          ],
        },
        {
          groupLabel: "Running",
          groupOptions: [
            {
              label: "5k",
              value: "5k",
            },
            {
              label: "10k",
              value: "10k",
            },
            {
              label: "Half Marathon",
              value: "halfMarathon",
            },
          ],
        },
      ];
    }
    return [];
  };

  return (
    <div>
      <h2 className="text-2xl font-bold leading-9 tracking-tight text-center">
        Your PRs
      </h2>
      <p className="text-center">Search PRs by discipline or exercise.</p>

      <div className="mt-5">
        <div className="flex justify-center">
          <Select
            className=" w-5/6"
            placeholder="Exercises"
            options={getExercisesByDisciplineOptions()}
            onValueChange={(value) => {
              redirect(`/diego?exercise=${value}`);
            }}
            defaultValue={searchParams.exercise}
          />
        </div>
      </div>
    </div>
  );
};

export default UserPRs;
