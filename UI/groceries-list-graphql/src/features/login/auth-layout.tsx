import apolloClient from "@/http/apollo-client";
import AuthProvider from "@/provider/auth/auth-provider";
import { ApolloProvider } from "@apollo/client";
import { Outlet } from "react-router";

const AuthLayout = () => {
	return (
		<ApolloProvider client={apolloClient}>
			<AuthProvider>
				<div className="min-h-screen flex items-center justify-center">
					<Outlet />
				</div>
			</AuthProvider>
		</ApolloProvider>
	);
};
export default AuthLayout;