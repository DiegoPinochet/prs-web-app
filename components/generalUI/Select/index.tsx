import {
  Select as SelectComponent,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { SelectGroup, SelectLabel } from "@radix-ui/react-select";
import { FC } from "react";

export interface SelectProps {
  placeholder: string;
  options: {
    label: string;
    value: string;
  }[];
  disabled?: boolean;
  className?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
}

export const Select: FC<SelectProps> = ({
  className,
  placeholder,
  disabled,
  options,
  onValueChange,
  defaultValue,
}: SelectProps) => {
  return (
    <SelectComponent
      onValueChange={onValueChange}
      defaultValue={defaultValue}
      disabled={disabled}
    >
      <SelectTrigger className={cn(className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((options) => (
          <SelectItem key={options.value} value={options.value}>
            {options.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectComponent>
  );
};
