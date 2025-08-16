import useActiveSection from "@/hooks/use-active-section";
import { useEffect } from "react";

const AboutLayout = () => {

	const { setActiveSection } = useActiveSection();
	
	useEffect(() => {
		setActiveSection('about');
	}, [setActiveSection]);

	return (
		<div>
			About
		</div>
	)
}
export default AboutLayout;
