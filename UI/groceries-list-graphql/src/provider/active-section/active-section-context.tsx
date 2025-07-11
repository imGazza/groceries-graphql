import { createContext } from "react"

export const ActiveSectionContext = createContext<{
	activeSection: string,
	setActiveSection: (section: string) => void
}>({
	activeSection: "home",
	setActiveSection: () => {}
})