import { useMemo, useState } from "react"
import { ActiveSectionContext } from "./active-section-context";

interface ActiveSectionProps{
	children: React.ReactNode
}

const ActiveSectionProvider = ({ children }: ActiveSectionProps) => {

	const [section, setSection] = useState("home");

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