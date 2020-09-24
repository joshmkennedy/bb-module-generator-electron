import { genId } from "./genId";
export const defaultField = () => {
  return {
    fieldId: genId(),
    fieldSlug: "field-title",
    fieldLabel: "field Label",
    fieldType: "",
    fieldTypeSettings: {},
    fieldPreviewSettings: {},
  };
};
export const defaultSection = () => {
  return {
    sectionId: genId(),
    sectionSlug: "section-title",
    sectionTitle: "Section Title",
    fields: [defaultField()],
  };
};
export const defaultTab = () => {
  return {
    tabId: genId(),
    tabTitle: "tab title",
    tabSlug: "tab-title",
    sections: [defaultSection()],
  };
};
export const defaultModuleData = {
  moduleInformation: {
    moduleClassName: "TestModule",
    moduleName: "Test Module",
    moduleDescription: "This is a generative Module made by me",
    moduleCategory: "testing",
  },
  settingsData: [defaultTab()],
};
// default data with fields filled in with some test data for quick easy testing
export const testModuleData = {
  moduleInformation: {
    moduleClassName: "TestModule",
    moduleName: "Test Module",
    moduleDescription: "This is a generative Module made by me",
    moduleCategory: "testing",
    moduleSlug: "test-module",
    CONST_plugin: "TEST_PLUGIN",
  },
  settingsData: [
    {
      tabId: "bc3513a0-de7f-4155-9f84-d973a60ca95f",
      tabTitle: "General",
      tabSlug: "general",
      sections: [
        {
          sectionId: "9a933d68-dd77-4c3e-8885-55cb71fef196",
          sectionSlug: "heading",
          sectionTitle: "Heading",
          fields: [
            {
              fieldId: "b1a79259-01c1-41a5-b0ba-e3a45efa47db",
              fieldSlug: "heading_text",
              fieldLabel: "Heading Text",
              fieldType: "text",
              fieldTypeSettings: {
                fieldsTextDefaultValue: "A cool heading",
              },
              fieldPreviewSettings: { fieldClassSelector: "" },
            },
            {
              fieldId: "3beb27c0-2eda-46a0-912a-18cc640814db",
              fieldSlug: "paragraph",
              fieldLabel: "paragraph",
              fieldType: "textarea",
              fieldTypeSettings: {
                fieldsTextareaDefaultValue:
                  "some aiding text about the cool heading",
              },
              fieldPreviewSettings: { fieldClassSelector: "" },
            },
          ],
        },
      ],
    },
  ],
};
