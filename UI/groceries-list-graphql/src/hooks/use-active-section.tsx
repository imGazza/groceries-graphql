import { ActiveSectionContext } from "@/provider/active-section/active-section-context"
import { useContext } from "react"

const useActiveSection = () => {
	const context = useContext(ActiveSectionContext);

	if (context === undefined)
		throw new Error("useTheme deve essere usato all'interno di un ThemeProvider")

	return context
}
export default useActiveSection;