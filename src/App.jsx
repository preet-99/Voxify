import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Features from "./components/Features";
import Testimonials from "./components/Testimonials";
import Pricing from "./components/Pricing";
import FAQ from "./components/FAQ";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import FeatureCard from "./components/FeatureCard";
import FeedbackForm from "./components/FeedbackForm";
import "./App.css"

export default function App() {
  return (
    <>
    <div className="font-sans bg-background-dark min-h-screen text-gray-800 bg-[#bbdefb]">
      <Navbar />
      <Hero />
      <HowItWorks />
      <FeatureCard/>
      <Features/>
      <Testimonials />
      {/* <Pricing /> */}
      <FAQ />
      <CTA />
      <FeedbackForm/>
      <Footer />
    </div>
    </>
  );
}
