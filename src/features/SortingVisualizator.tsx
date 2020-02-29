import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../app/stores/rootStore";

const SortingVisualizator = () => {
  const rootStore = useContext(RootStoreContext);

  const { currentAlgorithm, step } = rootStore.visualizerStore;

  return (
    <div>
      <button type="button" onClick={() => step()}>
        SORT
      </button>
      <ol>
        {currentAlgorithm.array.map(el => {
          return <li key={el.index}>{el.toString()}</li>;
        })}
      </ol>
    </div>
  );
};

export default observer(SortingVisualizator);
