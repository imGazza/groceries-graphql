import ProfileHistory from "@/components/ui/profile-history";
import { useAuth } from "@/hooks/use-auth";

const ProfileLayout = () => {

	const { user } = useAuth();

	return (
		<div className="container-wrapper p-10">
			<div className="container flex flex-col gap-5 min-h-[calc(100vh-200px)]">
				<div className="self-start">
					<div className="text-4xl groceries-logo pacifico-font">
						Hello, {user?.firstName}
					</div>

					<p className="text-lg text-balance tracking-tight max-w-3xl text-left">
						Here's your lists
					</p>
				</div>

				<div className="flex-1">
					<ProfileHistory userId={user?.id || ""} />
				</div>				
			</div>
		</div>
	)
}
export default ProfileLayout;