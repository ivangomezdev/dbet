import AboutLine from "@/components/AboutLine";
import CommunityInfo from "@/components/CommunityInfo";
import Faqs from "@/components/Faqs";

import Footer from "@/components/Footer";
import HowWorks from "@/components/HowWorks";
import ImageTextContainer from "@/components/ImageTextContainer";
import InfoBet from "@/components/InfoBet";
import CommunitySocials from "@/components/CommunitySocials";

import BetInfoVideo from "@/components/bet-info-video";
import ReviewsBet from "@/components/ReviewsBet";
import { initDB } from '../lib/init-db';
initDB();
export default function Home() {
  return (
    <>
    <header>
      
      </header>
        <ImageTextContainer />
      <main className="mainContent">
        
        <AboutLine/>
        <BetInfoVideo/>
        <CommunityInfo/>
        <HowWorks/>
        <ReviewsBet/>
       <InfoBet/>
      

      </main>
      <section className="communityFaqs">
        
        <CommunitySocials/>
        <Faqs/>
      </section>

      <footer>
        <Footer/>
      </footer>
    </>
  );
}
