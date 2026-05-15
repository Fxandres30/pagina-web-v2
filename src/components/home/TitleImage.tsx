"use client";

import Image from "next/image";

import {
  Carousel
} from "react-responsive-carousel";

import {
  useState
} from "react";

import "react-responsive-carousel/lib/styles/carousel.min.css";

import "@/styles/TitleImage.css";

export default function TitleImage() {

  const [selectedImage, setSelectedImage] =
    useState<string | null>(null);

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

      <div className="title-image-wrapper">

        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          showIndicators={true}
          interval={8000}
          transitionTime={500}
          stopOnHover={true}
          swipeable
          emulateTouch
          preventMovementUntilSwipeScrollTolerance={true}
        >

          {imagenes.map((img, index) => (

            <div
              key={index}
              className="title-image-slide"
            >

              <Image
                src={img.src}
                alt={img.alt}
                width={700}
                height={700}
                className="title-image-img"
                priority
                onClick={() =>
                  setSelectedImage(img.src)
                }
              />

            </div>

          ))}

        </Carousel>

      </div>

      {selectedImage && (

        <div
          className="image-modal"
          onClick={() =>
            setSelectedImage(null)
          }
        >

          <div
            className="image-modal-content"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              className="image-modal-close"
              onClick={() =>
                setSelectedImage(null)
              }
            >
              ✕
            </button>

            <Image
              src={selectedImage}
              alt="Imagen ampliada"
              width={1200}
              height={1200}
              className="image-modal-img"
            />

          </div>

        </div>

      )}

    </section>
  );
}