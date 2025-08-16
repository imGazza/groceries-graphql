import { createBrowserRouter } from "react-router";
// import ProtectedRoute from "@/01-features/shared/auth/protected-route";
// import { lazy } from "react";
// import ErrorPage from "@/01-features/shared/errors/error-boundary-router";
import AuthLayout from "@/features/login/auth-layout";
import App from "@/App";
import Login from "@/features/login/login";
import HomeLayout from "@/features/layout/home-layout";
import AboutLayout from "@/features/layout/about-layout";
import ProductsLayout from "@/features/layout/products-layout";

// const UserDetail = lazy(() => import("@/01-features/admin/user-detail/user-detail"));
// const CourseDetail = lazy(() => import("@/01-features/admin/course-detail/course-detail"));

export const router = createBrowserRouter([
	{
		path: "/login",
		Component: AuthLayout,
		// errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				Component: Login
			}
		]
	},
	{
		path: "/",
		Component: App,
		// errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				Component: HomeLayout,
			},
			{
				path: '/products',
				Component: ProductsLayout
			},
			{
				path: '/about',
				Component: AboutLayout
			}
		]
	}
])