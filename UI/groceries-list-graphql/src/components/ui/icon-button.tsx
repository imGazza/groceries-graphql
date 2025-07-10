import { cn } from "@/lib/utils";
import { Button } from "./button"
import type { ReactNode } from "react";

interface IconButtonProps {
	children: ReactNode;
	className?: string;
}

const IconButton = ({ children, className }: IconButtonProps) => {
	return (
		<Button 
			className={cn("shadow-slate-300", className)} variant="secondary" size="icon">
				{children}
		</Button>
	)
}
export default IconButton;