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
    groupLabel: string;
    groupOptions: { label: string; value: string }[];
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
        <SelectGroup>
          {options.map((option) => (
            <>
              <SelectLabel key={option.groupLabel}>
                {option.groupLabel}
              </SelectLabel>
              {option.groupOptions.map((groupOption) => (
                <SelectItem key={groupOption.value} value={groupOption.value}>
                  {groupOption.label}
                </SelectItem>
              ))}
            </>
          ))}
        </SelectGroup>
      </SelectContent>
    </SelectComponent>
  );
};
