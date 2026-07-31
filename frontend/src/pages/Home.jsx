import { useState } from "react";
import HeroCarousel from "../components/HeroCarousel";
import DaynamicHomeComponent from "../components/DaynamicHomeComponent";
import Features from "../components/Features";
import Overvision from "../components/Overvision";
import Feedback from "../components/Feedback";
import QueryForm from "../components/QueryForm";

function Home() {
  const [activeTab, setActiveTab] = useState("search");

  return (
    <div>
      <HeroCarousel setActiveTab={setActiveTab} />

      <DaynamicHomeComponent activeTab={activeTab} />

      <Features />
      <Overvision />
      <Feedback />
      <QueryForm />
    </div>
  );
}

export default Home;