"use client";

import ComboBox from "@/components/generalUI/ComboBox";
import { Select } from "@/components/generalUI/Select";
import { Table } from "@/components/generalUI/Table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PRCard } from "@/components/pages/ViewPRs/PRCard";

const UserPRs = ({ params }: { params: { slug: string } }) => {
  const [discipline, setDiscipline] = useState<string>();
  const [exercise, setExercise] = useState<string>();

  const getDisciplineOptions = () => {
    return [
      {
        label: "Crossfit",
        value: "crossfit",
      },
      {
        label: "Running",
        value: "running",
      },
    ];
  };

  const getExercisesOptions = () => {
    if (params.slug === "diego") {
      if (discipline === "crossfit") {
        return [
          {
            label: "Split Jerk",
            value: "split-jerk",
          },
          {
            label: "Back Squat",
            value: "back-squat",
          },
          {
            label: "Front Squat",
            value: "front-squat",
          },
          {
            label: "Strict Shoulder Press",
            value: "strict-shoulder-press",
          },
          {
            label: "Over Head Squat",
            value: "over-head-squat",
          },
          {
            label: "Squat Snatch",
            value: "squat-snatch",
          },
          {
            label: "Squat Clean",
            value: "squat-clean",
          },
          {
            label: "Deadlift",
            value: "deadlift",
          },
          {
            label: "Bench Press",
            value: "bench-press",
          },
        ];
      }
      if (discipline === "running") {
        return [
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
            value: "half-marathon",
          },
        ];
      }
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
            className="w-11/12"
            placeholder="Discipline..."
            options={getDisciplineOptions()}
            onValueChange={(value) => {
              setDiscipline(value);
            }}
          />
        </div>
        <div className="mt-5 flex justify-center">
          <ComboBox
            options={getExercisesOptions()}
            onValueChange={setExercise}
            placeholder="Exercise..."
            className="w-11/12"
            disabled={!discipline}
          />
        </div>
        {exercise && <PRCard exercise={exercise} />}
      </div>
    </div>
  );
};

export default UserPRs;
