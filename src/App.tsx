import React, { useEffect } from "react";
import Routes from "./routes";
import Toast from "./components/toast";
import "./App.css"

const App: React.FC = () => {
  return (
    <>
      <Routes />
      <Toast />
    </>
  );
};

export default App;
