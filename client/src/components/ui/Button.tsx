import { ReactElement } from "react"

type Variants = "primary" |"secondary" | "google" | "login"
interface ButtonProps {
    variant: Variants
    size?: "sm" | 'md' |"lg"
    text: string
    startIcon?: ReactElement
    endIcon?: ReactElement
    onClick?: () => void
    onClose?:  () => void
    class?: string
}

const variantStyles = {
    primary: "bg-purple text-white hover:bg-indigo-800 transition-all hover:duration-300 hover:shadow-md hover:shadow-gray-500",
    secondary: "bg-light-purple text-purple hover:bg-purple-200 transition-all hover:duration-300 hover:shadow-md hover:shadow-gray-500",
    google: "w-full font-bold text-sm flex items-center justify-center gap-3 py-2 border border-white/20 bg-white/5 hover:bg-white/10 transition rounded-lg",
    login: "w-full flex justify-center text-sm mt-6 py-2 bg-blue-600 hover:bg-blue-700 transition-all rounded-lg text-white font-semibold"
}

const defaultStyles = "rounded-md"

const sizeSyles = {
    sm:  "py-1.5 px-3",
    md: "py-2 px-4",
    lg: "py-3 px-6"
}

export const Button = (props: ButtonProps) => {

  return (
    <span className={`
        ${variantStyles[props.variant]} 
        ${defaultStyles} 
        ${sizeSyles[props.size]} 
        ${props.class}
        inline-flex items-center gap-2 cursor-pointer 
    `} 
    onClick={props.onClick}
    >
        {props.startIcon && <span >{props.startIcon}</span>}
        {props.text}
        {props.endIcon && <span >{props.endIcon}</span>}
    </span>
  )

}