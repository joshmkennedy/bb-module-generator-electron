import React from "react";
import styled from "styled-components";
import { updateObj } from "../lib";
import { TextInput } from "./elements";
function ModuleInformation({ moduleInformation, updateSettings, className }) {
  function onChangeHandler(e) {
    const { name, value } = e.target;

    updateSettings((state) => {
      state.moduleData.moduleInformation[name] = value;
    });
  }
  return (
    <div className={className}>
      <h2>General Settings</h2>
      <div>
        <TextInput
          value={moduleInformation.moduleClassName}
          label="moduleClassName"
          name="moduleClassName"
          handler={onChangeHandler}
        />
        <TextInput
          value={moduleInformation.moduleName}
          label="moduleName"
          name="moduleName"
          handler={onChangeHandler}
        />
        <TextInput
          value={moduleInformation.moduleDescription}
          label="moduleDescription"
          name="moduleDescription"
          handler={onChangeHandler}
        />
        <TextInput
          value={moduleInformation.moduleCategory}
          label="moduleCategory"
          name="moduleCategory"
          handler={onChangeHandler}
        />
        <TextInput
          value={moduleInformation.moduleSlug}
          label="moduleSlug"
          name="moduleSlug"
          handler={onChangeHandler}
        />
        <TextInput
          value={moduleInformation.CONST_plugin}
          label="CONST_plugin"
          name="CONST_plugin"
          handler={onChangeHandler}
        />
      </div>
    </div>
  );
}
export default styled(ModuleInformation)`
  box-shadow: var(--shadow-lg);
  border-radius: 8px;
  padding: 10px;
  padding-bottom: 30px;
  margin-bottom: 20px;
`;
