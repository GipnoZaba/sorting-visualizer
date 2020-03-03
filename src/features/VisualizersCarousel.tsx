import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../app/stores/rootStore";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext
} from "pure-react-carousel";
import VisualizerCard from "./VisualizerCard";

const VisualizersCarousel = () => {
  const rootStore = useContext(RootStoreContext);

  const { bubbleAlgorithm } = rootStore.visualizerStore;

  return (
    <CarouselProvider
      naturalSlideWidth={16}
      naturalSlideHeight={10}
      totalSlides={3}
      infinite
    >
      <Slider>
        <Slide index={0}>
          <VisualizerCard algorithm={bubbleAlgorithm} />
        </Slide>
        <Slide index={1}>
          <VisualizerCard algorithm={bubbleAlgorithm} />
        </Slide>
        <Slide index={2}>
          <VisualizerCard algorithm={bubbleAlgorithm} />
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
  );
};

export default observer(VisualizersCarousel);
