import React from "react";
import { Stack } from "react-bootstrap";
import "./App.css";
import ResultView from "./Components/ResultView";
import SearchContainer from "./Components/SearchContainer";

function App() {
  return (
    <div>
      <div>Which Episode?</div>
      <div>Allows you to pick a random episode from a show of your choice</div>
      <Stack direction="horizontal">
        <SearchContainer></SearchContainer>
        <div className="border-right" />
        <ResultView></ResultView>
      </Stack>
    </div>
  );
}

export default App;
