
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
"use client"
import HeroCarousel from "./components/HeroCarousel";
import StatusCards from "./components/StatusCards";
import LoginComp from "./components/LoginComp";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Services from "./components/Services";
import Blogs from "./components/Blogs";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs"
import { useUser } from "@clerk/nextjs";

export default function App() {
  const {user} = useUser();
  
  return (
    <main className="page-shell">
      <Header user={user}/>
      <HeroCarousel />
      <StatusCards />
      <LoginComp />
      <Blogs />
      <Services />
      <AboutUs />
      <ContactUs />
      <Footer />
    </main>
  );
}
