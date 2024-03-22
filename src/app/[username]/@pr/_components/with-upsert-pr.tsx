"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  discipline: z.string({ required_error: "Este campo es requerido" }),
  exercise: z.string({ required_error: "Este campo es requerido" }),
  weight: z.string({ required_error: "Este campo es requerido" }),
});

export type UpsertPrFormValues = z.infer<typeof formSchema>;

export const WithUpsertPrForm = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const form = useForm<UpsertPrFormValues>({
    resolver: zodResolver(formSchema),
  });

  return <FormProvider {...form}>{children}</FormProvider>;
};
