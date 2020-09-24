import React, { useState } from "react";
import styled from "styled-components";
import Tab from "./Tab";
import TabEditor from "./TabEditor";
import Section from "./Section";
import Field from "./Field";
import { Editor } from "../styledElements";
import { defaultTab, defaultSection, defaultField } from "../lib/defaultData";

function ModuleSettings({ settingsData, updateSettings, className }) {
  const [activeTab, setActiveTab] = useState(settingsData[0].tabId);
  //

  function updateSection({ value, key, id, tabId }) {
    updateSettings((state) => {
      state.moduleData.settingsData
        .find((tab) => tab.tabId === tabId)
        .sections.find((section) => section.sectionId === id)[key] = value;
    });
  }
  function updateField({ value, id, sectionId, tabId, key }) {
    updateSettings((state) => {
      state.moduleData.settingsData
        .find((tab) => tab.tabId === tabId)
        .sections.find((section) => section.sectionId === sectionId)
        .fields.find((field) => field.fieldId === id)[key] = value;
    });
  }

  function addNewTab() {
    const newTab = defaultTab();
    updateSettings((state) => {
      state.moduleData.settingsData.push(newTab);
    });
    editTab(newTab.tabId);
  }

  function addNewField(tabId, sectionId) {
    const newField = defaultField();
    updateSettings((state) => {
      state.moduleData.settingsData
        .find((tab) => tab.tabId === tabId)
        .sections.find((section) => section.sectionId === sectionId)
        .fields.push(newField);
    });
  }

  function editTab(tabId) {
    setActiveTab(tabId);
  }

  return (
    <div className={className}>
      <div className="list-of-tabs">
        <ul className="button-list">
          {settingsData.map((tab, tabIndex) => {
            return (
              <li key={tab.tabId}>
                <button onClick={() => editTab(tab.tabId)}>
                  {tab.tabTitle}
                </button>
              </li>
            );
          })}
        </ul>
        <button type="button" onClick={addNewTab}>
          add new tab
        </button>
      </div>
      {activeTab && <TabEditor activeTabId={activeTab} />}
    </div>
  );
}
export default styled(ModuleSettings)`
  display: flex;
  box-shadow: var(--shadow-lg);
  border-radius: 8px;
  padding: 10px;
  padding-bottom: 30px;
  margin-bottom: 20px;
`;
