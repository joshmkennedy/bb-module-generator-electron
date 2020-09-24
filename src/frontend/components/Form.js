import React, { useState } from "react";
import styled from "styled-components";
import ModuleInformation from "./ModuleInformation";
import ModuleSettings from "./ModuleSettings";
import { useModuleDataStore } from "../store";

const { ipcRenderer } = window.require("electron");
export default function Form() {
  //Data that will be sent to the Server for generating the module.
  // const [moduleData, setModuleData] = useState(testModuleData);
  const moduleData = useModuleDataStore((state) => state.moduleData);
  const setModuleData = useModuleDataStore((state) => state.set);
  const [moduleView, setModuleView] = useState("moduleSettings");

  function handleFormSubmission() {
    ipcRenderer
      .invoke("create-module", JSON.stringify(moduleData))
      .then((res) => console.log(res));
  }
  return (
    <AllSettings>
      <Bar>
        <button
          type="button"
          onClick={() =>
            setModuleView((prev) =>
              prev === "moduleSettings" ? "moduleInformation" : "moduleSettings"
            )
          }
        >
          {moduleView === "moduleSettings" ? "General info" : "Module Settings"}
        </button>
      </Bar>
      <div className="settings-wrapper">
        {moduleView && moduleView === "moduleInformation" && (
          <ModuleInformation
            updateSettings={setModuleData}
            moduleInformation={moduleData.moduleInformation}
          />
        )}
        {moduleView && moduleView === "moduleSettings" && (
          <ModuleSettings
            settingsData={moduleData.settingsData}
            updateSettings={setModuleData}
          />
        )}
        <button
          onClick={(e) => {
            handleFormSubmission();
          }}
          type="button"
        >
          Create New Beaver Builder Module
        </button>
      </div>
    </AllSettings>
  );
}
const AllSettings = styled.div`
  width: 100%;
  .settings-wrapper {
    padding: 20px;
  }
`;

const Bar = styled.div`
  background: var(--grey-300);
  padding: 10px 20px;
  width: 100%;
`;
