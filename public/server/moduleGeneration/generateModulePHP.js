const handlebars = require("handlebars");
const fs = require("fs");

async function createBBModuleContent(moduleData) {
  //core
  const { moduleClassName, settingsData } = moduleData;
  const templatesFn = await generateTemplates();
  const moduleSettingsTabs = createAllTabsSettings(settingsData);
  const registerModuleData = { moduleClassName, moduleSettingsTabs };
  const moduleSettings = templatesFn.moduleSettingsTemplate(registerModuleData);
  moduleData.moduleSettings = moduleSettings;
  const compiledModuleContent = templatesFn.moduleClassTemplate(moduleData);
  return compiledModuleContent;

  //CLOSURES
  function createAllTabsSettings(tabArray) {
    return tabArray.reduce((compiledSettingsString, tabObj) => {
      const compiledTabSetting = compileTabDataToString(tabObj);
      return `${compiledSettingsString}${
        compiledSettingsString !== "" ? "," : ""
      }
      ${compiledTabSetting}`;
    }, "");
  }
  function createAllSectionsSettings(sectionArray) {
    return sectionArray.reduce((compiledSettingsString, sectionObj) => {
      const compiledSectionSetting = compileSectionDataToString(sectionObj);
      return `${compiledSettingsString}${
        compiledSettingsString !== "" ? "," : ""
      } 
      ${compiledSectionSetting}`;
    }, "");
  }
  function createAllFieldSettings(fieldArray) {
    return fieldArray.reduce((compiledSettingsString, fieldObj) => {
      const compiledFieldSetting = compileFieldDataToString(fieldObj);
      return `${compiledSettingsString}${
        compiledSettingsString !== "" ? "," : ""
      } 
      ${compiledFieldSetting}`;
    }, "");
  }

  function compileTabDataToString(tabObj) {
    tabObj._allTabSections = createAllSectionsSettings(tabObj.sections);
    return templatesFn.settingsTabTemplate(tabObj);
  }
  function compileSectionDataToString(sectionObj) {
    sectionObj._allSectionFields = createAllFieldSettings(sectionObj.fields);
    return templatesFn.settingsSectionTemplate(sectionObj);
  }
  function compileFieldDataToString(fieldObj) {
    const { fieldType, fieldTypeSettings, fieldPreviewSettings } = fieldObj;
    fieldObj._fieldTypeSettings = compileFieldTypeSettings(
      fieldType,
      fieldTypeSettings
    );
    fieldObj._fieldTypePreview = compileFieldPreviewSettings(
      fieldType,
      fieldPreviewSettings
    );
    return templatesFn.settingsFieldTemplate(fieldObj);
  }
  function compileFieldTypeSettings(type, typeSettingObj) {
    const templateName = `fields${capitalize(type)}FieldSettingsTemplate`;
    console.log(templateName);
    return templatesFn[templateName](typeSettingObj);
  }
  function compileFieldPreviewSettings(type, typePreviewObj) {
    console.log(type);
    const templateName = `fields${capitalize(type)}FieldPreviewTemplate`;
    return templatesFn[templateName](typePreviewObj);
  }
}
//creates the handlebar template function for each template.
// returns a object with the name for each template as the key
async function generateTemplates() {
  const templateFiles = [
    "moduleClass.txt",
    "moduleSettings.txt",
    "settingsTab.txt",
    "settingsSection.txt",
    "settingsField.txt",
    "fields/Text/FieldPreview.txt",
    "fields/Text/FieldSettings.txt",
    "fields/Textarea/FieldPreview.txt",
    "fields/Textarea/FieldSettings.txt",
  ];
  const compiledTemplates = await Promise.all(
    templateFiles.map(async (fileName) => {
      const templateNamePrefix = fileName.replace(/\//g, "").split(".")[0];
      const templateName = `${templateNamePrefix}Template`;
      const templatesFn = await createHandlebarTemplate(fileName);
      return { name: templateName, fn: templatesFn };
    })
  );
  return compiledTemplates.reduce((returnObj, { name, fn }) => {
    returnObj[name] = fn;
    return returnObj;
  }, {});
}

async function createHandlebarTemplate(fileSlug) {
  const path = `${__dirname}/templates/${fileSlug}`;
  const templateString = await readTemplate(path);
  return handlebars.compile(templateString);
}
function readTemplate(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (e, data) => {
      if (e) {
        reject(e);
      } else {
        resolve(data);
      }
    });
  }).then((res) => res.toString());
}
function capitalize(string) {
  const letters = string.split("");
  const firstLetter = letters[0].toUpperCase();
  letters[0] = firstLetter;
  const capString = letters.join("");
  return capString;
}

module.exports = { createBBModuleContent };
