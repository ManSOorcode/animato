// import Image from "next/image";

// import HeroSection from "./components/HeroBanner";
import HeroBanner from "./components/HeroBanner";
import Header from "./components/navigation/Header";
// import Banner from "./components/HeroBanner";
import Services from "./components/Services";

export default function Home() {
  return (
    <>
      <Header />
      <HeroBanner />
      <Services />
    </>
  );
}
