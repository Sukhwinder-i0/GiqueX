import { ReactElement } from "react";
import clsx from "clsx";

type Variants = "primary" | "secondary" | "google" | "login";
type Sizes = "sm" | "md" | "lg";

interface ButtonProps {
  variant: Variants;
  size?: Sizes;
  text?: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onClick?: () => void;
  className?: string;
  disabled?: boolean
  type?: string
}

const baseStyle = "inline-flex items-center justify-center gap-2 rounded-md cursor-pointer transition-all";

const variantStyles: Record<Variants, string> = {
  primary: 'font-bold text-xs md:text-sm text-white hover:text-gray-300 border backdrop-blur-md shadow-lg border-white/20 hover:bg-white/20 transition duration-300',
  secondary: "bg-purple-300 text-xs md:text-sm hover:bg-purple-300 shadow hover:shadow-md hover:shadow-gray-500 rounded-md text-sm",
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
