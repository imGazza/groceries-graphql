import { useMemo, useState } from "react"
import { RouterProvider } from "react-router";
import { ActiveSectionContext } from "./active-section-context";

interface ActiveSectionProps{
	children: React.ReactNode
}

const ActiveSectionProvider = ({ children }: ActiveSectionProps) => {

	const [section, setSection] = useState("home");

	const setActiveSection = (section: string) => {
		setActiveSection(section);
	}

	const value = useMemo(
		() => {
			return {
				activeSection: section,
				setActiveSection: setSection
			}
		}, [section]
	)

	return (
		<ActiveSectionContext.Provider value={value}>{children}</ActiveSectionContext.Provider>
	)
}
export default ActiveSectionProvider;