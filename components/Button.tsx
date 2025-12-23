import { ReactNode } from "react";

type ButtonProps = {
  children: string | ReactNode;
  onClick?: () => void;
  active?: boolean;
};

export const Button = ({ children, onClick, active }: ButtonProps) => {
  return (
    <button
      className={`
              px-3 py-1 rounded-lg font-mono cursor-pointer h-7 hover:text-white 
              ${active ? "bg-gray-600 text-white" : "text-gray-300"}
            `}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
