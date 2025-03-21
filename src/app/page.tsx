import AboutLine from "@/components/AboutLine";
import CommunityInfo from "@/components/CommunityInfo";
import Faqs from "@/components/Faqs";
import FootballField from "@/components/FootballField";
import Footer from "@/components/Footer";
import HowWorks from "@/components/HowWorks";
import ImageTextContainer from "@/components/ImageTextContainer";
import InfoBet from "@/components/InfoBet";
import NavBar from "@/components/NavBar";
import SubscriptionCard from "@/components/SubscriptionCard";
import WorldFlags from "@/components/WorldFlags";


export default function Home() {
  return (
    <>
    <header>
      <NavBar />
      </header>
      <main>
        
        <ImageTextContainer />
        <AboutLine/>
        <CommunityInfo/>
        <WorldFlags/>
      </main>
      <section className="communityFaqs">
        <HowWorks/>
        <Faqs/>
      </section>
      <section>
       <InfoBet/>
      </section>
      <section>
        <SubscriptionCard/>
        <FootballField/>
      </section>

      <footer>
        <Footer/>
      </footer>
    </>
  );
}
