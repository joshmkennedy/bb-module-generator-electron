import React, { useState, useCallback, useRef } from "react";
import styled from "styled-components";
import { useModuleDataStore } from "../store";
import { defaultField } from "../lib/defaultData";
import { useFocusInput } from "../lib";
import Field from "./Field";

function FieldEditor({ sectionId, tabId, activeFieldId, className }) {
  const activeField = useModuleDataStore((state) =>
    state.moduleData.settingsData
      .find((tab) => tab.tabId === tabId)
      .sections.find((section) => section.sectionId === sectionId)
      .fields.find((field) => field.fieldId === activeFieldId)
  );
  const set = useModuleDataStore((state) => state.set);

  const updateField = useCallback(
    ({ value, key }) => {
      set((state) => {
        state.moduleData.settingsData
          .find((tab) => tab.tabId === tabId)
          .sections.find((section) => section.sectionId === sectionId)
          .fields.find((field) => field.fieldId === activeFieldId)[key] = value;
      });
    },
    [activeFieldId, tabId, set, sectionId]
  );
  if (!activeField) return null;
  return (
    <div className={`${className} inputs`}>
      <h3>{activeField.fieldLabel}</h3>
      <Field
        updateField={updateField}
        fieldData={activeField}
        tabId={tabId}
        sectionId={sectionId}
      />
    </div>
  );
}
export default styled(FieldEditor)`
  background: white;
  border-radius: 8px;
  box-shadow: var(--shadow-lg);
  padding: 10px;
  width: 100%;
  margin-left: 20px;
`;
