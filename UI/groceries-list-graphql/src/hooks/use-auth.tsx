import { AuthContext } from "@/provider/auth/auth-context"
import { useContext } from "react"

export const useAuth = () => {
	const context = useContext(AuthContext)

	if (context === undefined)
		throw new Error("useAuth must be in a CatalogProvider")

	return context
}