import { observer } from "mobx-react-lite";
import React from "react";
import { ISortingAlgortihm } from "../algorithms/sortingAlgorithm";
import Visualizer from "./Visualizer";

const VisualizerContainer: React.FC<{ algorithm: ISortingAlgortihm }> = ({
  algorithm
}) => {
  return (
    <div className="vizualizer-container">
      <Visualizer algorithm={algorithm} />
      <div className="array-types">
        <ul>
          <li>
            <img
              src="https://res.cloudinary.com/john-mantas/image/upload/v1537302064/codepen/delicious-apples/green-apple2.png"
              alt="green apple"
            />
          </li>
          <li>
            <img
              src="https://res.cloudinary.com/john-mantas/image/upload/v1537303532/codepen/delicious-apples/half-apple.png"
              alt="half apple"
            />
          </li>
          <li>
            <img
              src="https://res.cloudinary.com/john-mantas/image/upload/v1537303160/codepen/delicious-apples/green-apple-flipped.png"
              alt="green apple"
            />
          </li>
          <li>
            <img
              src="https://res.cloudinary.com/john-mantas/image/upload/v1537303708/codepen/delicious-apples/apple-top.png"
              alt="apple top"
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default observer(VisualizerContainer);
