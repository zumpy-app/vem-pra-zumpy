import React from "react";
import tags from "./content/tags.json";
import "./styles/global.scss";

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="left">
          {tags.topics.map((topic, index) => {
            return (
              <div key={index}>
                <button>{topic.title}</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
