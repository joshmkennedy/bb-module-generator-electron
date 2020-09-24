const { createModule } = require("./createModule");

const settingsData = [
  {
    tabSlug: "general",
    tabTitle: "General",
    sections: [
      {
        sectionSlug: "headline",
        sectionTitle: "Headline",
        fields: [
          {
            fieldSlug: "headline_text",
            fieldLabel: "Headline Text",
            fieldType: "Text",
            fieldTypeSettings: { fieldsTextDefaultValue: "this is a test" },
            fieldPreviewSettings: { fieldClassSelector: "heading" },
          },
          {
            fieldSlug: "description_text",
            fieldLabel: "description",
            fieldType: "Text",
            fieldTypeSettings: { fieldsTextDefaultValue: "this is a test" },
            fieldPreviewSettings: { fieldClassSelector: "description" },
          },
        ],
      },
      {
        sectionSlug: "headline_two",
        sectionTitle: "Headline Two",
        fields: [
          {
            fieldSlug: "headline_two_text",
            fieldLabel: "Headline Text",
            fieldType: "Text",
            fieldTypeSettings: { fieldsTextDefaultValue: "this is a test" },
            fieldPreviewSettings: { fieldClassSelector: "heading-2" },
          },
          {
            fieldSlug: "description_text_two",
            fieldLabel: "description",
            fieldType: "Textarea",
            fieldTypeSettings: {
              fieldsTextareaDefaultValue: "this is a test",
              fieldsNumberOfRows: 6,
            },
            fieldPreviewSettings: { fieldClassSelector: "description-2" },
          },
        ],
      },
    ],
  },
];
const moduleInfo = {
  moduleClassName: "TestModule",
  moduleName: "Test Module",
  moduleDescription: "This is a generative Module made by me",
  moduleCategory: "testing",
  moduleSlug: "test-module",
  CONST_plugin: "TEST_PLUGIN",
  settingsData,
};

function createTestModule() {
  createModule(moduleInfo);
}

module.exports = { createTestModule };
