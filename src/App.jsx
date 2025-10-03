import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Features from "./components/Features";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import FeedbackForm from "./components/FeedbackForm";
import "./App.css"
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
export default function App() {
  return (
    <>
    <div className="font-sans bg-background-dark min-h-screen text-gray-800 bg-[#bbdefb]">
      <ToastContainer />
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features/>
      <Testimonials />
      <FAQ />
      <CTA />
      <FeedbackForm/>
      <Footer />
    </div>
    </>
  );
}
