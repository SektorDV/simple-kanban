import React from "react";
import "./App.css";
import Main from "views/main/Main";
import { Provider } from "react-redux";
import configureStore from "store/store";

function App() {
  return (
    <Provider store={configureStore()}>
      <div className="App">
        <Main />
      </div>
    </Provider>
  );
}

export default App;
