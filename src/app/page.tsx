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

      {/* HERO + FOTO */}

      <section className="home-layout">

        <div className="home-left">

          <Hero />

        </div>

        <div className="home-right">

          <TitleImage />

        </div>

      </section>

      {/* BARRA + BENDECIDOS */}

      <section className="home-layout">

        <div className="home-left">

          <ProgressSection />

        </div>

        <div className="home-right">

          <WinningSection />

        </div>

      </section>

      {/* COMPRA + VERIFY */}

      <section className="home-layout">

        <div className="home-left">

          <PurchaseSection />

        </div>

        <div className="home-right">

          <VerifySection />

        </div>

      </section>

      <Footer />

    </>

  );
}