import { FC, ReactNode } from "react";

export interface ButtonProps {
  children: ReactNode;
  type: "primary" | "secondary";
  className?: string;
}

export const Button: FC<ButtonProps> = ({ children, className, type }) => {
  const getButtonClassName = () => {
    const baseButtonClassName =
      "rounded-md px-3.5 py-2.5 text-sm font-semibold shadow-sm";

    switch (type) {
      case "primary":
        return `${baseButtonClassName} bg-primary text-white hover:bg-primary ${className}`;
      case "secondary":
        return `${baseButtonClassName} bg-secondary text-white hover:bg-secondary ${className}`;
      default:
        return baseButtonClassName;
    }
  };

  return (
    <button type="button" className={getButtonClassName()}>
      {children}
    </button>
  );
};
