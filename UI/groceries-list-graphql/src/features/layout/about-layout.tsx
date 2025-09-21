import { Button } from "@/components/ui/button";
import H1 from "@/components/ui/h1";
import Logo from "@/components/ui/logo";
import useActiveSection from "@/hooks/use-active-section";
import useGitHubIcon from "@/hooks/use-github-icon";
import { BriefcaseBusiness, Linkedin } from "lucide-react";
import { useEffect } from "react";

const AboutLayout = () => {

	const { setActiveSection } = useActiveSection();
	const GitHubIcon = useGitHubIcon();

	useEffect(() => {
		setActiveSection('about');
	}, [setActiveSection]);

	return (
		<div className="container-wrapper p-10">
			<div className="container flex flex-col items-center gap-5 text-center min-h-[calc(100vh-0.25rem*100)]">
				<div className="flex items-center">
					<H1>About</H1>
					<Logo className="text-4xl ml-3" />
					<H1>, a demo app made with GraphQL and React</H1>
				</div>

				<p className="text-lg text-balance tracking-tight max-w-3xl">
					A simple demo app built to explore GraphQL, featuring a .NET backend powered by HotChocolate and a MongoDB-based data layer.
				</p>

				<div className="flex items-center">
					<img alt="groceries" className="rounded-md h-full object-cover object-bottom w-[750px]" src="/groceries-uncut.jpg" />
				</div>

				<div className="flex items-center gap-3">
					<a href="https://github.com/imGazza/groceries-graphql" target="_blank">
						<Button variant="ghost" size="lg">
							{GitHubIcon} GitHub
						</Button>
					</a>
					<a href="https://www.linkedin.com/in/gazzardiluca" target="_blank">
						<Button variant="ghost" size="lg">
							<BriefcaseBusiness /> LinkedIn
						</Button>
					</a>
				</div>
			</div>
		</div>
	)
}
export default AboutLayout;
