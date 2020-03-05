import { observer } from "mobx-react-lite";
import React from "react";
import { ISortingAlgorithm } from "../app/models/sortingAlgorithm";

const VisualizerInfo: React.FC<{ algorithm: ISortingAlgorithm }> = ({
  algorithm
}) => {
  return (
    <div>
      <div className="title">
        <h1>{algorithm.data.title}</h1>
        <span>{algorithm.data.class}</span>
      </div>
      <div className="info-tab">
        <h3>Description</h3>
        <p>{algorithm.data.description}</p>
      </div>
    </div>
  );
};

export default observer(VisualizerInfo);

/*
<ul>
          <li>Apples are nutricious</li>
          <li>Apples may be good for weight loss</li>
          <li>Apples may be good for bone health</li>
          <li>They're linked to a lowest risk of diabetes</li>
        </ul>
*/
