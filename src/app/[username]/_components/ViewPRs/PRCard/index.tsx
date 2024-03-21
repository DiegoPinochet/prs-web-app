import { Table } from "@/components/generalUI/Table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FC, useState } from "react";
import { PRCardForm } from "./Form";
import { Exercise } from "@/src/types";

export interface PRCardProps {
  exercise: Exercise;
}

export const PRCard: FC<PRCardProps> = ({ exercise }: PRCardProps) => {
  const [percentage, setPercentage] = useState<number>(100);

  const getTableData = () => {
    const pr = Number(exercise.pr);
    return [
      {
        units: "kg",
        "0.6": (pr * 0.6).toString(),
        "0.8": (pr * 0.8).toString(),
        "1": pr.toString(),
      },
      {
        units: "lb",
        "0.6": toLbs(pr * 0.6),
        "0.8": toLbs(pr * 0.8),
        "1": toLbs(pr),
      },
    ];
  };

  const getColumns = () => {
    return [
      {
        label: "Units",
        value: "units",
      },
      {
        label: "60%",
        value: "0.6",
      },
      {
        label: "80%",
        value: "0.8",
      },
      {
        label: "100%",
        value: "1",
      },
    ];
  };

  const toLbs = (kg: number) => {
    return (kg * 2.20462).toFixed(0);
  };

  const renderCardWeightTitle = () => {
    const kg = Number(exercise.pr) * (percentage / 100);
    const lb = toLbs(kg);

    return `${kg.toFixed(0)}kg/${lb}lb`;
  };

  return (
    <div className="mt-6">
      <div className="flex justify-center">
        <Card className="w-11/12  backdrop-blur bg-white/5">
          <CardHeader>
            <CardTitle className="text-center text-3xl">
              {exercise.name}
            </CardTitle>
            <div className="w-full border-b-2 border-gray-200 my-4" />
            <CardTitle className="text-center text-2xl">
              {renderCardWeightTitle()}
            </CardTitle>
            <CardDescription className="text-center">
              <b>{percentage}%</b> of your 1RM
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table columns={getColumns()} data={getTableData()} />
          </CardContent>
          <CardFooter className="flex justify-between">
            <PRCardForm setPercentage={setPercentage} />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
