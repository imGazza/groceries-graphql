import { cn } from "@/lib/utils";
import { Button } from "./button"
import type { ReactNode } from "react";

interface IconButtonProps {
	children: ReactNode;
	className?: string;
}

const IconButton = ({ children, className, ...props }: IconButtonProps & React.ComponentProps<typeof Button>) => {
	return (
		<Button {...props}
			className={cn("shadow-slate-300", className)} variant="secondary" size="icon">
				{children}
		</Button>
	)
}
export default IconButton;