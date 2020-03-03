import { observer } from "mobx-react-lite";
import React from "react";

const VisualizerInfo = () => {
  return (
    <div>
      <div className="title">
        <h1>Delicious Apples</h1>
        <span>COD: 45999</span>
      </div>
      <div className="info-tab">
        <h3>BENEFITS</h3>
        <ul>
          <li>Apples are nutricious</li>
          <li>Apples may be good for weight loss</li>
          <li>Apples may be good for bone health</li>
          <li>They're linked to a lowest risk of diabetes</li>
        </ul>
      </div>
    </div>
  );
};

export default observer(VisualizerInfo);
