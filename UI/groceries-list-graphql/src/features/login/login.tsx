
import { useState } from "react"
import { useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { useAuth } from "@/hooks/use-auth"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { LOGIN, type LoginOutput } from "@/http/auth"
import { useMutation } from "@apollo/client"
import Logo from "@/components/ui/logo"

const Login = ({ className, ...props }: React.ComponentProps<"div">) => {

	const [login] = useMutation(LOGIN, {
		onCompleted: (data) => {
			onSuccessfulLogin(data);
		},
		onError: (error) => {
			setCardDescription(<span className="text-red-400">Login failed: {error.message}</span>);
		}
	});

	const [cardDescription, setCardDescription] = useState(<span>Insert email and password</span>);
	const navigate = useNavigate();
	const { setSessionUser } = useAuth();

	const { register, handleSubmit } = useForm({
		defaultValues: {
			email: '',
			password: ''
		}
	})

	const onSubmit = async (data: { email: string, password: string }) => {
		await login({ variables: mapToLoginInput(data.email, data.password) });
	}

	const onSuccessfulLogin = (data: LoginOutput) => {
		if (data?.loginUser.user) {
			setSessionUser(data.loginUser);
			navigate('/');
		}
		else {
			setCardDescription(<span className="text-red-400">Invalid credentials</span>);
		}
	}

	const mapToLoginInput = (email: string, password: string) => {
		return {
			loginInput: {
				email: email,
				password: password
			}
		}
	}

	return (
		<div className="flex flex-col gap-2 items-center h-[calc(100vh-8rem)] w-full justify-center p-6 md:p-10">
			<div className="w-full max-w-sm">
				<div className={cn("flex flex-col gap-6", className)} {...props}>
					<Card>
						<Logo />
						<CardHeader>
							<CardTitle>Login to your account</CardTitle>
							<CardDescription>
								{cardDescription}
							</CardDescription>
						</CardHeader>
						<CardContent>
							<form onSubmit={handleSubmit(onSubmit)}>
								<div className="flex flex-col gap-6">
									<div className="grid gap-3">
										<Label htmlFor="email">Email</Label>
										<Input
											{...register("email", { required: true })}
											id="email"
											type="email"
										/>
									</div>
									<div className="grid gap-3">
										<div className="flex items-center">
											<Label htmlFor="password">Password</Label>
										</div>
										<Input
											{...register("password", { required: true })}
											id="password"
											type="password"
										/>
									</div>
									<div className="flex flex-col gap-3">
										<Button type="submit" variant="custom" className="w-full">
											Login
										</Button>
									</div>
								</div>
							</form>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	)
}
export default Login