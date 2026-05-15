"use client";

import Image from "next/image";

import {
  Carousel
} from "react-responsive-carousel";

import "react-responsive-carousel/lib/styles/carousel.min.css";

import "@/styles/TitleImage.css";

export default function TitleImage() {

  const imagenes = [

  {
    src: "/5millones1.jpg",
    alt: "Premio 1"
  },

  {
    src: "/5millones2.jpg",
    alt: "Premio 2"
  },

  {
    src: "/5millones3.jpg",
    alt: "Premio 3"
  },

  {
    src: "/5millones4.jpg",
    alt: "Premio 4"
  },

  {
    src: "/5millones5.jpg",
    alt: "Premio 5"
  }

];

  return (

    <section className="title-image-section">

      {/* TEXTOS 

      <div className="title-image-header">

        <h2 className="title-image-title">

          🎉 Premios Oficiales

        </h2>

        <p className="title-image-description">

          Participa y compite por
          increíbles premios instantáneos.

        </p>

      </div>*/}

      {/* CARRUSEL */}

      <div className="title-image-wrapper">

        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          showIndicators={true}
          interval={3500}
          swipeable
        >

          {imagenes.map((img, index) => (

            <div
              key={index}
              className="title-image-slide"
            >

              <Image
                src={img.src}
                alt={img.alt}
                width={500}
                height={500}
                className="title-image-img"
                priority
              />

            </div>

          ))}

        </Carousel>

      </div>

    </section>
  );
}