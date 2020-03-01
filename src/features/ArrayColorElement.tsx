import React from "react";
import { observer } from "mobx-react-lite";
import { ISortable } from "../app/models/sortable";

const ArrayColorElement: React.FC<{ element: ISortable }> = ({ element }) => {
  return (
    <div
      className="vizualizer-element"
      style={{ backgroundColor: element.getColor() }}
    ></div>
  );
};

export default observer(ArrayColorElement);
