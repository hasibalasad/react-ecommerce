
import HeroSection from "./components/HeroSection";
import { useProviderContext } from "./context/productContext";



const About = () => {
    const { name } = useProviderContext();

    const data = {
        name: "Hasib Ecommerce",
    };

    return <>
        {name}
        <HeroSection myData={data} />
    </>;
};

export default About;
