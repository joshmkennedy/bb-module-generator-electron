import React from "react";
import { TextInput } from "./elements";

export default function FieldTypeSettings({ type, data, updateSettings }) {
  function handleUpdate(e) {
    return updateSettings(e.target.name, e.target.value);
  }

  switch (type) {
    case "text":
      return (
        <TextInput
          label="default value"
          value={data.fieldsTextDefaultValue}
          handler={handleUpdate}
          name="fieldsTextDefaultValue"
        />
      );
    case "textarea":
      return (
        <TextInput
          label="default value"
          value={data.fieldsTextareaDefaultValue}
          handler={handleUpdate}
          name="fieldsTextareaDefaultValue"
        />
      );
    default:
      return null;
  }
}
