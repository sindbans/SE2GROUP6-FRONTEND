import { Parallax } from "react-parallax";

const ParallaxSection = ({ image, children }) => (
    <Parallax bgImage={image} strength={500}>
        <div className="h-[500px] flex items-center justify-center text-white text-4xl font-bold">
            {children}
        </div>
    </Parallax>
);

export default ParallaxSection;
