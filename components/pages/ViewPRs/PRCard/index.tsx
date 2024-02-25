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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PRCardForm } from "./Form";

export interface PRCardProps {
  exercise: string;
}

export const PRCard: FC<PRCardProps> = () => {
  const [percentage, setPercentage] = useState<number>(100);

  const getTableData = () => {
    return [
      {
        units: "kg",
        "0.6": "72",
        "0.8": "96",
        "1": "120",
      },
      {
        units: "lb",
        "0.6": "135",
        "0.8": "180",
        "1": "225",
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
    return kg * 2.20462;
  };

  const renderCardWeightTitle = () => {
    const kg = 120 * (percentage / 100);
    const lb = toLbs(kg);

    return `${kg.toFixed(0)}kg/${lb.toFixed(0)}lb`;
  };

  return (
    <div className="mt-6">
      <div className="flex justify-center">
        <Card className="w-11/12  backdrop-blur bg-white/5">
          <CardHeader>
            <CardTitle className="text-center text-3xl">Squat Clean</CardTitle>
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
