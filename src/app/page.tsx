"use client";

import Header from "@/components/home/Header";

import Hero from "@/components/home/Hero";

import ProgressSection from "@/components/home/ProgressSection";

import VerifySection from "@/components/home/VerifySection";

import WinningSection from "@/components/home/WinningSection";

import Footer from "@/components/home/Footer";

import TitleImage from "@/components/home/TitleImage";

import PurchaseSection from "@/components/home/PurchaseSection";

import "@/styles/HomeLayout.css";

export default function HomePage() {

  return (

    <>

      <Header />

      {/* HERO + SLIDER */}

      <section className="home-layout">

        <div className="home-left">

          <TitleImage />

        </div>

        <div className="home-right">

          <Hero />

        </div>

      </section>

      {/* BARRA */}

      <ProgressSection />

      {/* COMPRA */}

      <PurchaseSection />

      {/* VERIFY + WINNING */}

      <section className="home-layout second-layout">

        <div className="home-left">

           <VerifySection />

        </div>

        <div className="home-right">

         <WinningSection />

        </div>

      </section>

      <Footer />

    </>

  );
}