import { useState } from "react";
import HeroCarousel from "../components/HeroCarousel";
import DaynamicHomeComponent from "../components/DaynamicHomeComponent";
import Features from "../components/Features";
import Overvision from "../components/Overvision";
import Feedback from "../components/Feedback";
import QueryForm from "../components/QueryForm";
import ReviewChatSection from "../components/ReviewChatSection";
import AdminHeroSlideManager from "../components/AdminHeroSlideManager";
import MediaGallery from "../components/MediaGallery";
import DownloadApp from "../components/Downlodapp";
import PlanSelection from "../../payment/PlanSelection";
function Home() {
  const [activeTab, setActiveTab] = useState("leads");
 return (
    <div>
      <HeroCarousel setActiveTab={setActiveTab} />
      <div id="dynamic-home" className="scroll-mt-0">
        <DaynamicHomeComponent activeTab={activeTab} />
      </div>
      <DownloadApp />
      <MediaGallery />
      <Features />
      <PlanSelection />
      <ReviewChatSection />
      <Overvision />
      <Feedback />
      <QueryForm />
    </div>
  );
}

export default Home;