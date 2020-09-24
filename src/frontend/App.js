import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "./App.scss";
import Form from "./components/Form";

const { ipcRenderer } = window.require("electron");

function App({ className }) {
  const [dirPath, setDirPath] = useState(null);
  useEffect(() => {
    console.log(dirPath);
    if (!dirPath) {
      ipcRenderer.invoke("getDirPath", null).then((res) => {
        console.log(res);
        const { path } = JSON.parse(res);
        setDirPath(path);
      });
    }
  }, [dirPath]);
  function chooseDirectory() {
    ipcRenderer.invoke("initSetDirPath", null).then((res) => {
      const { path } = JSON.parse(res);
      setDirPath(path);
    });
  }

  return (
    <div className={`App ${className}`}>
      <AppHeader>
        <h1>Beaver Builder Module Generator</h1>
      </AppHeader>
      <AppContainer>
        {dirPath ? (
          <Form />
        ) : (
          <Center>
            <button style={{ fontSize: "26px" }} onClick={chooseDirectory}>
              Select Plugin Destination
            </button>
          </Center>
        )}
      </AppContainer>
    </div>
  );
}

export default styled(App)`
  min-height: 100vh;
`;
const AppHeader = styled.header`
  padding: 1rem;
  padding-top: 2rem;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 99;
  background: white;
  box-shadow: 0 3px 20px rgba(0, 0, 0, 0.2);
  -webkit-app-region: drag;
  -webkit-user-select: none;

  h1 {
    margin: 0;
  }
`;
const AppContainer = styled.div`
  padding-top: 5.45rem;
  min-height: calc(100vh - 6rem);
  display: flex;
`;
const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  min-width: 100%;
  position: relative;
`;
