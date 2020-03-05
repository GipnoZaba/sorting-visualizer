import React, { useEffect } from "react";
import { ISortingAlgorithm } from "../app/models/sortingAlgorithm";

const TabGroup: React.FC<{ algorithm: ISortingAlgorithm }> = ({
  algorithm
}) => {
  function openCity(cityName: string, id: string, color: string) {
    // Hide all elements with class="tabcontent" by default */
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");

    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].setAttribute("style", "display: none");
    }

    // Remove the background color of all tablinks/buttons
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].setAttribute("style", "background-color: ''");
    }

    // Show the specific tab content
    document.getElementById(cityName)?.setAttribute("style", "display: block");

    // Add the specific color to the button used to open the tab content
    document
      .getElementById(id)
      ?.setAttribute("style", `background-color: ${color}`);
  }

  useEffect(() => {
    document?.getElementById("tab1")?.click();
  });

  return (
    <div className="tabs">
      <button
        className="tablink"
        onClick={() => openCity("London", "tab1", "red")}
        id="tab1"
      >
        London
      </button>
      <button
        className="tablink"
        onClick={() => openCity("Paris", "tab2", "green")}
        id="tab2"
      >
        Paris
      </button>
      <button
        className="tablink"
        onClick={() => openCity("Tokyo", "tab3", "blue")}
        id="tab3"
      >
        Tokyo
      </button>
      <button
        className="tablink"
        onClick={() => openCity("Oslo", "tab4", "orange")}
        id="tab4"
      >
        Oslo
      </button>

      <div id="London" className="tabcontent">
        <h1>London</h1>
        <p>London is the capital city of England.</p>
      </div>
      <div id="Paris" className="tabcontent">
        <h1>Paris</h1>
        <p>Paris is the capital of France.</p>
      </div>
      <div id="Tokyo" className="tabcontent">
        <h1>Tokyo</h1>
        <p>Tokyo is the capital of Japan.</p>
      </div>
      <div id="Oslo" className="tabcontent">
        <h1>Oslo</h1>
        <p>Oslo is the capital of Norway.</p>
      </div>
    </div>
  );
};

export default TabGroup;
