// import { useState } from "react";
// import HeroCarousel from "../components/HeroCarousel";
// import DaynamicHomeComponent from "../components/DaynamicHomeComponent";
// import Features from "../components/Features";
// import Overvision from "../components/Overvision";
// import Feedback from "../components/Feedback";
// import QueryForm from "../components/QueryForm";

// function Home() {
//   const [activeTab, setActiveTab] = useState("search");

//   return (
//     <div>
//      <div id="dynamic-home" className="scroll-mt-24">
//   <DaynamicHomeComponent activeTab={activeTab} />
// </div>

//       <DaynamicHomeComponent activeTab={activeTab} />

//       <Features />
//       <Overvision />
//       <Feedback />
//       <QueryForm />
//     </div>
//   );
// }

// export default Home;

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

// import AdminReferralPayouts from "../components/AdminReferralPayout";
// import Indialogo from "../components/India";


function Home() {
  const [activeTab, setActiveTab] = useState("search");

  return (
    <div>
      {/* Hero Section */}
      <HeroCarousel setActiveTab={setActiveTab} />

      {/* Dynamic Component */}
      <div id="dynamic-home" className="scroll-mt-0">
        <DaynamicHomeComponent activeTab={activeTab} />
      </div>
      <MediaGallery/>

      {/* Other Sections */}
      <Features />
      <ReviewChatSection/>
      
    
    
      <Overvision />
      <Feedback />
      {/* <AdminReferralPayouts/> */}
      <QueryForm />
    </div>
  );
}

export default Home;