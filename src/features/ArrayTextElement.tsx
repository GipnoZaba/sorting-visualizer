import React from "react";
import { observer } from "mobx-react-lite";
import { ISortable } from "../app/models/sortable";

const ArrayTextElement: React.FC<{ element: ISortable }> = ({ element }) => {
  return <div>{element.toString()}</div>;
};

export default observer(ArrayTextElement);
