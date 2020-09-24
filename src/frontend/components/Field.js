import React, { useEffect } from "react";
import { TextInput, SelectEnum } from "./elements";
import FieldTypeSettings from "./FieldTypeSettings";
export default function Field({
  _ref,
  updateField,
  fieldData,
  tabId,
  sectionId,
}) {
  useEffect(() => {
    if (fieldData.fieldType !== "") {
      if (fieldData.fieldType === "text") {
        updateField({
          value: {
            fieldsTextDefaultValue: "",
          },
          key: "fieldTypeSettings",
          tabId,
          sectionId,
        });
        updateField({
          value: {
            fieldClassSelector: "",
          },
          key: "fieldPreviewSettings",
          tabId,
          sectionId,
        });
      }
      if (fieldData.fieldType === "textarea") {
        updateField({
          value: {
            fieldsTextareaDefaultValue: "",
          },
          key: "fieldTypeSettings",
          tabId,
          sectionId,
        });
        updateField({
          value: {
            fieldClassSelector: "",
          },
          key: "fieldPreviewSettings",
          tabId,
          sectionId,
        });
      }
    }
  }, [fieldData.fieldType, fieldData.fieldId, sectionId, tabId, updateField]);
  return (
    <li>
      <TextInput
        shouldFocus
        inputId={fieldData.fieldId}
        value={fieldData.fieldLabel}
        handler={(e) => {
          updateField({
            value: e.target.value,
            key: "fieldLabel",
            tabId,
            sectionId,
            id: fieldData.fieldId,
          });
        }}
        label="Field Label"
      />
      <TextInput
        value={fieldData.fieldSlug}
        handler={(e) => {
          updateField({
            value: e.target.value,
            key: "fieldSlug",
            tabId,
            sectionId,
            id: fieldData.fieldId,
          });
        }}
        label="Field Slug"
      />
      <SelectEnum
        value={fieldData.fieldType}
        handler={(e) => {
          updateField({
            value: e.target.value,
            key: "fieldType",
            tabId,
            sectionId,
            id: fieldData.fieldId,
          });
        }}
        label="Field Type"
        options={["text", "textarea"]}
      />
      {fieldData.fieldType && fieldData.fieldTypeSettings && (
        <FieldTypeSettings
          type={fieldData.fieldType}
          data={fieldData.fieldTypeSettings}
          updateSettings={(settingsKey, value) =>
            updateField({
              value: {
                ...fieldData.fieldTypeSettings,
                [settingsKey]: value,
              },
              key: "fieldTypeSettings",
              tabId,
              sectionId,
              id: fieldData.fieldId,
            })
          }
        />
      )}
      {/* {fieldData.fieldType && (
          <fieldPreviewSettings type={fieldData.fieldType} data={fieldData} />
        )} */}
    </li>
  );
}
