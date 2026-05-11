import Features from "./components/Features";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Nav from "./components/Nav";
import Problem from "./components/Problem";
import Trust from "./components/Trust";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-paper text-ink">
      <Nav />
      <main className="flex-1">
        <Hero />
        <Problem />
        <HowItWorks />
        <Features />
        <Trust />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
