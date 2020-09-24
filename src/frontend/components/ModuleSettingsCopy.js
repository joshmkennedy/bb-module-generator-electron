import React, { useState } from "react";
import styled from "styled-components";
import Tab from "./Tab";
import Section from "./Section";
import Field from "./Field";
import { defaultTab, defaultSection, defaultField } from "../lib/defaultData";

function ModuleSettings({ settingsData, updateSettings, className }) {
  const [activeTab, setActiveTab] = useState(settingsData[0].tabId);
  //
  function updateTab({ value, id, key }) {
    updateSettings((state) => {
      state.moduleData.settingsData.find((tab) => tab.tabId === id)[
        key
      ] = value;
    });
  }
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
  }
  function addNewSection(tabId) {
    const newSection = defaultSection();
    updateSettings((state) => {
      state.moduleData.settingsData
        .find((tab) => tab.tabId === tabId)
        .sections.push(newSection);
    });
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

  return (
    <div className={className}>
      <div className="navigation">
        <h3>Tabs</h3>
        <ul>
          {settingsData?.map((tab) => (
            <li key={tab.tabId}>
              <button
                onClick={() => {
                  setActiveTab(tab.tabId);
                }}
              >
                {tab.tabTitle}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <ul className="repeater">
          {settingsData
            ?.filter((tab) => tab.tabId === activeTab)
            .map((tab) => {
              const tabKey = tab.tabId;
              return (
                <Tab
                  tabData={tab}
                  key={tabKey}
                  updateTab={updateTab}
                  addNewSection={() => addNewSection(tabKey)}
                >
                  {tab?.sections?.map((section) => {
                    const sectionKey = section.sectionId;
                    return (
                      <Section
                        sectionData={section}
                        key={sectionKey}
                        tabId={tabKey}
                        updateSection={updateSection}
                        addNewField={() => addNewField(tabKey, sectionKey)}
                      >
                        {section?.fields?.map((field) => {
                          const fieldKey = field.fieldId;
                          return (
                            <Field
                              fieldData={field}
                              key={fieldKey}
                              tabId={tabKey}
                              sectionId={sectionKey}
                              updateField={updateField}
                              addNew={() => console.log("new")}
                            />
                          );
                        })}
                      </Section>
                    );
                  })}
                </Tab>
              );
            })}
        </ul>
        <button type="button" onClick={addNewTab}>
          add new tab
        </button>
      </div>
    </div>
  );
}
export default styled(ModuleSettings)`
  display: flex;
  padding-bottom: 30px;
`;
