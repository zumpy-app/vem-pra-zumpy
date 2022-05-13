import React, { useEffect, useState } from "react";
import tags from "./content/tags.json";
import ReactMarkdown from "react-markdown";
import "./styles/global.scss";

function App() {
  const [selectedTopic, setSelectedTopic] = useState("");
  const [filteredTopics, setfilteredTopics] = useState(tags.topics);
  const [selectedButton, setSelectedButton] = useState("Sobre esta paǵina");

  const getReadmeData = (src: string, payload: (text: string) => void) => {
    fetch(
      "https://raw.githubusercontent.com/JuanIWK3/vem-pra-zumpy/main/src/content/" +
        src
    )
      .then((response) => response.text())
      .then((text) => {
        payload(text);
      });
  };

  const filterTopics = (search: string) => {
    if (search === "") {
      setfilteredTopics(tags.topics);
    } else {
      setfilteredTopics(
        tags.topics.filter((topic) => topic.tags.includes(search.toLowerCase()))
      );
    }
  };

  useEffect(() => {
    getReadmeData("topics/sobre.md", setSelectedTopic);
    console.log(tags);
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="left">
          <div className="search">
            <input
              type="text"
              placeholder="Busque Tópicos"
              onChange={(event) => {
                const search = event.target.value;
                filterTopics(search);
              }}
            />
          </div>
          {filteredTopics.map((topic, index) => {
            return (
              <div key={index}>
                <button
                  className={selectedButton === topic.title ? "selected" : ""}
                  onClick={() => {
                    getReadmeData(topic.file, setSelectedTopic);
                    setSelectedButton(topic.title);
                  }}
                >
                  {topic.title}
                </button>
              </div>
            );
          })}
        </div>
        <div className="right">
          <ReactMarkdown>{selectedTopic}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

export default App;
