import Navbar from "../components/layout/Navbar";
import PosterCarousel from "../components/ui/PosterCarousel";
import ParallaxSection from "../components/ui/ParallaxSection";
import GoogleAd from "../components/layout/GoogleAd";
import Footer from "../components/layout/Footer";
import Title from "../components/common/Title";
import Button from "../components/common/Button";
import Divider from "../components/common/Divider";
import "../styles/globals.css";

const Home = () => (
    <>
        <Navbar />
        <ParallaxSection image="/assets/images/parallax-bg.jpg">
            <Title>Welcome to HermesPass</Title>
            <Button>Explore Events</Button>
        </ParallaxSection>
        <Divider />
        <PosterCarousel />
        <div className="my-10 mx-auto w-11/12">
            <GoogleAd slot="1234567890" />
        </div>
        <Footer />
    </>
);


export default Home;
