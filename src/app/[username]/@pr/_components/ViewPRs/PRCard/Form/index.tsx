import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export interface PRCardFormProps {
  setPercentage: (percentage: number) => void;
}

export const PRCardForm: FC<PRCardFormProps> = ({ setPercentage }) => {
  const formSchema = z
    .object({
      percentage: z.string(),
    })
    .refine((data) => {
      return Number(data.percentage) > 0;
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setPercentage(Number(data.percentage));
  };

  return (
    <Form {...form}>
      <form
        className="flex w-full align-bottom"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          name="percentage"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  min={1}
                  placeholder="Porcentaje de 1RM: 100"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="ml-1" type="submit">
          Buscar
        </Button>
      </form>
    </Form>
  );
};
