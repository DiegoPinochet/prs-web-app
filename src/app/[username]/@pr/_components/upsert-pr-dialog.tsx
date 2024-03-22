"use client";

import {
  Dialog,
  DialogTrigger,
  Button,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui";
import { FC, useState } from "react";
import { WithUpsertPrForm } from "./with-upsert-pr";
import { UpsertPrForm } from "./upsert-pr-form";

export interface UpsertPrDialogProps {
  username: string;
  disciplineOptions: { label: string; value: string }[];
}

export const UpsertPrDialog: FC<UpsertPrDialogProps> = ({
  username,
  disciplineOptions,
}: UpsertPrDialogProps) => {
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger className="flex flex-row justify-center" asChild>
        <Button className="w-full">Agregar PR</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Añade o actualiza tus PRs</DialogTitle>
          <WithUpsertPrForm>
            <UpsertPrForm
              setIsDialogOpen={setDialogOpen}
              username={username}
              disciplineOptions={disciplineOptions}
            />
          </WithUpsertPrForm>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
