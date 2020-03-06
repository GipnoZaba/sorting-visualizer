import React, { useEffect, Fragment } from "react";
import { ISortingAlgorithm } from "../app/models/sortingAlgorithm";

const TabGroup: React.FC<{ algorithm: ISortingAlgorithm }> = ({
  algorithm
}) => {
  const getTabButtonId = (tabId: number) => `${algorithm.type}Tab${tabId}`;
  const getTabContentId = (contentName: string) =>
    `${algorithm.type}${contentName}`;

  const openTab = (tabName: string, buttonId: string) => {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName(
      `${algorithm.type} tabcontent`
    );

    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].setAttribute("style", "display: none");
    }

    // Remove the background color of all tablinks/buttons
    tablinks = document.getElementsByClassName(`${algorithm.type} tablink`);
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].setAttribute("style", "background-color: ''");
    }

    // Show the specific tab content
    document.getElementById(tabName)?.setAttribute("style", "display: block");

    // Add the specific color to the button used to open the tab content
    document
      .getElementById(buttonId)
      ?.setAttribute("style", `background-color: rgb(202, 198, 182)`);
  };

  useEffect(() => {
    document?.getElementById(`${algorithm.type}Tab1`)?.click();
  });

  return (
    <Fragment>
      <div className="tabs">
        <button
          className={`${algorithm.type} tablink`}
          onClick={() =>
            openTab(getTabContentId("Description"), getTabButtonId(1))
          }
          id={getTabButtonId(1)}
        >
          Description
        </button>
        <button
          className={`${algorithm.type} tablink`}
          onClick={() => openTab(getTabContentId("Paris"), getTabButtonId(2))}
          id={getTabButtonId(2)}
        >
          Paris
        </button>
        <button
          className={`${algorithm.type} tablink`}
          onClick={() => openTab(getTabContentId("Tokyo"), getTabButtonId(3))}
          id={getTabButtonId(3)}
        >
          Tokyo
        </button>
        <button
          className={`${algorithm.type} tablink`}
          onClick={() => openTab(getTabContentId("Oslo"), getTabButtonId(4))}
          id={getTabButtonId(4)}
        >
          Oslo
        </button>
      </div>

      <div
        id={getTabContentId("Description")}
        className={`${algorithm.type} tabcontent`}
      >
        <h1>{algorithm.data.title}</h1>
        <p>{algorithm.data.description}</p>
      </div>
      <div
        id={getTabContentId("Paris")}
        className={`${algorithm.type} tabcontent`}
      >
        <h1>Paris</h1>
        <p>Paris is the capital of France.</p>
      </div>
      <div
        id={getTabContentId("Tokyo")}
        className={`${algorithm.type} tabcontent`}
      >
        <h1>Tokyo</h1>
        <p>Tokyo is the capital of Japan.</p>
      </div>
      <div
        id={getTabContentId("Oslo")}
        className={`${algorithm.type} tabcontent`}
      >
        <h1>Oslo</h1>
        <p>Oslo is the capital of Norway.</p>
      </div>
    </Fragment>
  );
};

export default TabGroup;
