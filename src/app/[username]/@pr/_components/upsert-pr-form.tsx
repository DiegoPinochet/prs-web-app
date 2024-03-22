"use client";

import { use, useEffect, useState, useTransition } from "react";
import { useFormContext } from "react-hook-form";

import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  useToast,
} from "@/components/ui";

import { UpsertPrAction } from "../_actions/upsert-pr.action";
import { UpsertPrFormValues } from "./with-upsert-pr";
import { listExercisesFetcher } from "../_fetchers/list-exercises.fetcher";

export const UpsertPrForm = ({
  setIsDialogOpen,
  username,
  disciplineOptions,
}: {
  setIsDialogOpen: (isOpen: boolean) => void;
  username: string;
  disciplineOptions: { label: string; value: string }[];
}): JSX.Element => {
  const form = useFormContext<UpsertPrFormValues>();
  const { toast } = useToast();

  const [isPending, startTransition] = useTransition();

  const [exerciseOptions, setExerciseOptions] = useState<
    { label: string; value: string }[]
  >([]);

  const setExerciseOptionsFromDiscipline = async (discipline: string) => {
    const exercises = await listExercisesFetcher(discipline);

    setExerciseOptions(exercises);
  };

  useEffect(
    () => {
      if (form.getValues("discipline")) {
        setExerciseOptionsFromDiscipline(form.getValues("discipline"));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [form.getValues("discipline")]
  );

  function onSubmit(values: UpsertPrFormValues) {
    startTransition(async () => {
      const result = await UpsertPrAction({
        username,
        ...values,
      });
      setIsDialogOpen(false);
      if (!result.success) {
        toast({
          title: "Error",
          variant: "destructive",
          description: (
            <>
              <strong>{result.error}</strong>
            </>
          ),
        });

        return;
      }
      toast({
        title: result.value,
        description: "Se ha creado/actualizado correctamente.",
      });
    });
  }

  return (
    <>
      {disciplineOptions && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col space-y-4 md:space-y-3"
            id="upsert-pr-form"
          >
            <FormField
              control={form.control}
              name="discipline"
              render={({ field }) => (
                <FormItem className="flex flex-col md:flex-row md:items-center">
                  <div className="w-full flex-col space-y-1 md:w-1/2">
                    <FormLabel>Disciplina</FormLabel>
                  </div>
                  <div className="w-full flex-col space-y-1 md:w-1/2">
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {disciplineOptions.map((discipline) => (
                            <SelectItem
                              key={discipline.value}
                              value={discipline.value}
                            >
                              {discipline.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="exercise"
              render={({ field }) => (
                <FormItem className="flex flex-col md:flex-row md:items-center">
                  <div className="w-full flex-col space-y-1 md:w-1/2">
                    <FormLabel>Ejercicio</FormLabel>
                  </div>
                  <div className="w-full flex-col space-y-1 md:w-1/2">
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        disabled={!form.getValues("discipline")}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {exerciseOptions.map((exercise) => (
                            <SelectItem
                              key={exercise.value}
                              value={exercise.value}
                            >
                              {exercise.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem className="flex flex-col md:flex-row md:items-center">
                  <div className="w-full flex-col space-y-1 md:w-1/2">
                    <FormLabel>Peso 1RM en kg</FormLabel>
                  </div>
                  <div className="w-full flex-col space-y-1 md:w-1/2">
                    <FormControl>
                      <Input type="number" placeholder="100" {...field} />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <Button
              className="w-full"
              type="submit"
              form="upsert-pr-form"
              disabled={isPending}
            >
              Crear/Actualizar
            </Button>
          </form>
        </Form>
      )}
    </>
  );
};
