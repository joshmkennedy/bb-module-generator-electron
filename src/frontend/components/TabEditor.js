import React, { useState } from "react";
import { useModuleDataStore } from "../store";
import { TextInput } from "./elements";
import { defaultSection } from "../lib/defaultData";
import SectionEditor from "./SectionEditor";
import { Editor } from "../styledElements";

export default function TabEditor({ activeTabId }) {
  const activeTab = useModuleDataStore((state) =>
    state.moduleData.settingsData.find((tab) => tab.tabId === activeTabId)
  );
  const set = useModuleDataStore((state) => state.set);

  function updateTab({ value, id, key }) {
    set((state) => {
      state.moduleData.settingsData.find((tab) => tab.tabId === id)[
        key
      ] = value;
    });
  }
  function addNewSection() {
    const newSection = defaultSection();
    set((state) => {
      state.moduleData.settingsData
        .find((tab) => tab.tabId === activeTabId)
        .sections.push(newSection);
    });
    editSection(newSection.sectionId);
  }
  const [activeSectionId, setActiveSectionId] = useState(null);
  function editSection(sectionId) {
    setActiveSectionId(sectionId);
  }

  if (!activeTab) return null;
  return (
    <Editor>
      <div className="inputs">
        <h3>{activeTab.tabTitle}</h3>
        <TextInput
          shouldFocus
          inputId={activeTab.tabId}
          label="Tab Title"
          value={activeTab.tabTitle}
          name="tabTitle"
          handler={(e) =>
            updateTab({
              value: e.target.value,
              key: "tabTitle",
              id: activeTab.tabId,
            })
          }
        />
        <TextInput
          label="Tab Slug"
          value={activeTab.tabSlug}
          name="tabSlug"
          handler={(e) =>
            updateTab({
              value: e.target.value,
              key: "tabSlug",
              id: activeTab.tabId,
            })
          }
        />
        <div className="">
          Sections
          <ul className="button-list" style={{ "--list-width": "100%" }}>
            {activeTab.sections.map((section, sectionIndex) => {
              return (
                <li key={section.sectionId}>
                  <button onClick={() => editSection(section.sectionId)}>
                    {section.sectionTitle}
                  </button>
                </li>
              );
            })}
          </ul>
          <button type="button" onClick={addNewSection}>
            add new section
          </button>
        </div>
      </div>
      {activeSectionId && (
        <SectionEditor activeSectionId={activeSectionId} tabId={activeTabId} />
      )}
    </Editor>
  );
}
