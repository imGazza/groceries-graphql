import type { ReactNode } from "react"

interface H1Props{
	children: ReactNode
}

const H1 = ({ children }: H1Props) => {
	return (
		<h1 className="text-4xl text-foreground/85 font-semibold text-balance text-left tracking-tighter">
			{children}
		</h1>
	)
}
export default H1;