import Banner from "../components/home/Banner";
import FaqSection from "../components/home/FaqSection";
import HowItWorks from "../components/home/HowItWorks";
import WhyChooseDineSpot from "../components/home/WhyChooseDineSpot";

export default function HomePage() {
  return (
    <main>
      <Banner />
      <HowItWorks />
      <WhyChooseDineSpot />
      <FaqSection/>
    </main>
  );
}
