import { ReactElement } from "react";
import clsx from "clsx";

type Variants = "primary" | "secondary" | "google" | "login";
type Sizes = "sm" | "md" | "lg";

interface ButtonProps {
  variant: Variants;
  size?: Sizes;
  text: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onClick?: () => void;
  className?: string;
}

const baseStyle = "inline-flex items-center justify-center gap-2 rounded-md cursor-pointer transition-all";

const variantStyles: Record<Variants, string> = {
  primary: "bg-blue-500 text-white hover:bg-indigo-800 shadow hover:shadow-md hover:shadow-gray-500",
  secondary: "bg-purple-300 hover:bg-purple-300 shadow hover:shadow-md hover:shadow-gray-500 rounded-md text-sm",
  google: "w-full font-bold text-sm border border-white/20 bg-white/5 hover:bg-white/10 rounded-lg",
  login: "w-full text-sm mt-6 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold",
};

const sizeStyles: Record<Sizes, string> = {
  sm: "py-1.5 px-3 text-sm",
  md: "py-2 px-4 text-base",
  lg: "py-3 px-6 text-lg",
};

export const Button = ({
  variant,
  size = "md",
  text,
  startIcon,
  endIcon,
  onClick,
  className,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        baseStyle,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {startIcon && <span>{startIcon}</span>}
      {text}
      {endIcon && <span>{endIcon}</span>}
    </button>
  );
};
