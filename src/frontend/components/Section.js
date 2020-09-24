import React from "react";
import { TextInput } from "./elements";

export default function Section({
  children,
  updateSection,
  sectionData,
  tabId,
  addNewField,
}) {
  return (
    <li>
      <details>
        <summary>Section</summary>
        <TextInput
          value={sectionData.sectionTitle}
          handler={(e) => {
            updateSection({
              value: e.target.value,
              key: "sectionTitle",
              tabId,
              id: sectionData.sectionId,
            });
          }}
          label="Section Title"
        />
        <TextInput
          value={sectionData.sectionSlug}
          handler={(e) => {
            updateSection({
              value: e.target.value,
              key: "sectionSlug",
              tabId,
              id: sectionData.sectionId,
            });
          }}
          label="Section Slug"
        />
        <ul className="repeater">{children}</ul>
        <button type="button" onClick={addNewField}>
          add new field
        </button>
      </details>
    </li>
  );
}
