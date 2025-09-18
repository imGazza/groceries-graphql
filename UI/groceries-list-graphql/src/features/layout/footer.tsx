import { Button } from "@/components/ui/button";
import useGitHubIcon from "@/hooks/use-github-icon";

const Footer = () => {

	const GitHubIcon = useGitHubIcon();

	return (
		<footer className="container-wrapper flex items-center bg-custom text-secondary h-20">
			<div className="container mx-auto">
				<div className="flex justify-between items-center">
					<div className="text-sm">
						2025 Groceries List. Made with ❤️ by Luca Gazzardi
					</div>
					<a href="https://github.com/imGazza/groceries-graphql" target="_blank">
						<Button size="sm" variant="ghost" className="h-8 shadow-none hover:bg-background/10 hover:text-accent">
							{GitHubIcon}
						</Button>
					</a>
				</div>
			</div>
		</footer>
	)
}
export default Footer;