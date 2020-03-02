import { observer } from "mobx-react-lite";
import React from "react";

const VisualizerInfo = () => {
  return (
    <div className="product__info">
      <div className="title">
        <h1>Delicious Apples</h1>
        <span>COD: 45999</span>
      </div>
      <div className="price">
        R$ <span>7.93</span>
      </div>
      <div className="variant">
        <h3>SELECT A COLOR</h3>
        <ul>
          <li>
            <img
              src="https://res.cloudinary.com/john-mantas/image/upload/v1537302064/codepen/delicious-apples/green-apple2.png"
              alt="green apple"
            />
          </li>
          <li>
            <img
              src="https://res.cloudinary.com/john-mantas/image/upload/v1537302752/codepen/delicious-apples/yellow-apple.png"
              alt="yellow apple"
            />
          </li>
          <li>
            <img
              src="https://res.cloudinary.com/john-mantas/image/upload/v1537302427/codepen/delicious-apples/orange-apple.png"
              alt="orange apple"
            />
          </li>
          <li>
            <img
              src="https://res.cloudinary.com/john-mantas/image/upload/v1537302285/codepen/delicious-apples/red-apple.png"
              alt="red apple"
            />
          </li>
        </ul>
      </div>
      <div className="description">
        <h3>BENEFITS</h3>
        <ul>
          <li>Apples are nutricious</li>
          <li>Apples may be good for weight loss</li>
          <li>Apples may be good for bone health</li>
          <li>They're linked to a lowest risk of diabetes</li>
        </ul>
      </div>
      <button className="buy--btn">ADD TO CART</button>
    </div>
  );
};

export default observer(VisualizerInfo);
