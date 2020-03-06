import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../app/stores/rootStore";
import VisualizerCard from "./VisualizerCard";

const VisualizersCarousel = () => {
  const rootStore = useContext(RootStoreContext);

  const { bubbleSort, insertionSort } = rootStore.visualizerStore;

  return (
    <div style={{ margin: "20px 20px"}}>
      <section className="carousel" aria-label="Gallery">
        <ol className="carousel__viewport">
          <li id="carousel__slide1" tabIndex={0} className="carousel__slide">
            <div className="carousel__snapper">
              <a href="#carousel__slide4" className="carousel__prev">
                Go to last slide
              </a>
              <a href="#carousel__slide2" className="carousel__next">
                Go to next slide
              </a>
            </div>
          </li>
          <li id="carousel__slide2" tabIndex={0} className="carousel__slide">
            <div className="carousel__snapper"></div>
            <a href="#carousel__slide1" className="carousel__prev">
              Go to previous slide
            </a>
            <VisualizerCard algorithm={bubbleSort} />
            <a href="#carousel__slide3" className="carousel__next">
              Go to next slide
            </a>
          </li>
          <li id="carousel__slide3" tabIndex={0} className="carousel__slide">
            <div className="carousel__snapper"></div>
            <a href="#carousel__slide2" className="carousel__prev">
              Go to previous slide
            </a>
            <a href="#carousel__slide4" className="carousel__next">
              Go to next slide
            </a>
          </li>
          <li id="carousel__slide4" tabIndex={0} className="carousel__slide">
            <div className="carousel__snapper"></div>
            <a href="#carousel__slide3" className="carousel__prev">
              Go to previous slide
            </a>
            <a href="#carousel__slide1" className="carousel__next">
              Go to first slide
            </a>
          </li>
        </ol>
        <aside className="carousel__navigation">
          <ol className="carousel__navigation-list">
            <li className="carousel__navigation-item">
              <a
                href="#carousel__slide1"
                className="carousel__navigation-button"
              >
                Go to slide 1
              </a>
            </li>
            <li className="carousel__navigation-item">
              <a
                href="#carousel__slide2"
                className="carousel__navigation-button"
              >
                Go to slide 2
              </a>
            </li>
            <li className="carousel__navigation-item">
              <a
                href="#carousel__slide3"
                className="carousel__navigation-button"
              >
                Go to slide 3
              </a>
            </li>
            <li className="carousel__navigation-item">
              <a
                href="#carousel__slide4"
                className="carousel__navigation-button"
              >
                Go to slide 4
              </a>
            </li>
          </ol>
        </aside>
      </section>
    </div>
  );
};

export default observer(VisualizersCarousel);
/*

      <CarouselProvider
        naturalSlideWidth={width}
        naturalSlideHeight={height}
        totalSlides={3}
        infinite
      >
        <Slider>
          <Slide index={0}>
            <VisualizerCard algorithm={bubbleSort} />
          </Slide>
          <Slide index={1}>
            <VisualizerCard algorithm={insertionSort} />
          </Slide>
          <Slide index={2}>
            <VisualizerCard algorithm={bubbleSort} />
          </Slide>
        </Slider>
        <div className="carousel-btn back">
          <ButtonBack>
            <i className="fas fa-arrow-left fa-2x"></i>
          </ButtonBack>
        </div>
        <div className="carousel-btn next">
          <ButtonNext>
            <i className="fas fa-arrow-right fa-2x"></i>
          </ButtonNext>
        </div>
      </CarouselProvider>
      */
