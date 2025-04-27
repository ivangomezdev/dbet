import AboutLine from "@/components/AboutLine";
import CommunityInfo from "@/components/CommunityInfo";
import Faqs from "@/components/Faqs";

import Footer from "@/components/Footer";
import HowWorks from "@/components/HowWorks";
import ImageTextContainer from "@/components/ImageTextContainer";
import InfoBet from "@/components/InfoBet";

import SubscriptionCard from "@/components/SubscriptionCard";


import { initDB } from '../lib/init-db';
initDB();
export default function Home() {
  return (
    <>
    <header>
      
      </header>
      <main>
        <ImageTextContainer />
        
        <AboutLine/>
        <CommunityInfo/>

      </main>
      <section className="communityFaqs">
        <HowWorks/>
        <Faqs/>
      </section>
      <section>
       <InfoBet/>
      </section>
      <section>
        <SubscriptionCard hrefAnual='/auth/register' hrefMensual='/auth/register' hrefFree='/auth/register'/>
      
      </section>

      <footer>
        <Footer/>
      </footer>
    </>
  );
}
