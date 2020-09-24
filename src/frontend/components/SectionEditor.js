import React, { useEffect, useState, useRef } from "react";
import { useModuleDataStore } from "../store";
import { TextInput } from "./elements";
import FieldEditor from "./FieldEditor";
import { defaultField } from "../lib/defaultData";
import { useFocusInput } from "../lib";
import { Editor } from "../styledElements";
export default function SectionEditor({ activeSectionId, tabId }) {
  const activeSection = useModuleDataStore((state) =>
    state.moduleData.settingsData
      .find((tab) => tab.tabId === tabId)
      .sections.find((section) => section.sectionId === activeSectionId)
  );
  const set = useModuleDataStore((state) => state.set);

  function updateSection({ value, id, key }) {
    set((state) => {
      state.moduleData.settingsData
        .find((tab) => tab.tabId === tabId)
        .sections.find((section) => section.sectionId === activeSectionId)[
        key
      ] = value;
    });
  }
  function addNewField() {
    const newField = defaultField();
    set((state) => {
      state.moduleData.settingsData
        .find((tab) => tab.tabId === tabId)
        .sections.find((section) => section.sectionId === activeSectionId)
        .fields.push(newField);
    });
    editField(newField.fieldId);
  }
  const [activeFieldId, setActiveFieldId] = useState(null);
  function editField(fieldId) {
    setActiveFieldId(fieldId);
  }

  if (!activeSection) return null;
  return (
    <Editor>
      <div className="inputs">
        <h3>{activeSection.sectionTitle}</h3>
        <TextInput
          label="Section Title"
          shouldFocus
          inputId={activeSection.sectionId}
          value={activeSection.sectionTitle}
          name="sectionTitle"
          handler={(e) =>
            updateSection({
              value: e.target.value,
              key: "sectionTitle",
              id: activeSection.sectionId,
            })
          }
        />
        <TextInput
          label="Section Slug"
          value={activeSection.sectionSlug}
          name="sectionSlug"
          handler={(e) =>
            updateSection({
              value: e.target.value,
              key: "sectionSlug",
              id: activeSection.sectionId,
            })
          }
        />
        <div className="list-of-sections">
          fields
          <ul className="button-list">
            {activeSection.fields.map((field, fieldIndex) => {
              return (
                <li key={field.fieldId}>
                  <button
                    onClick={() => editField(field.fieldId)}
                    style={{
                      background:
                        activeFieldId === field.fieldId && "var(--teal-light)",
                      color:
                        activeFieldId === field.fieldId && "var(--teal-dark)",
                    }}
                    data-active={activeFieldId === field.fieldId}
                  >
                    {field.fieldLabel}
                  </button>
                </li>
              );
            })}
          </ul>
          <button type="button" onClick={addNewField}>
            add new field
          </button>
        </div>
      </div>
      {activeFieldId && (
        <FieldEditor
          sectionId={activeSectionId}
          tabId={tabId}
          activeFieldId={activeFieldId}
        />
      )}
    </Editor>
  );
}
