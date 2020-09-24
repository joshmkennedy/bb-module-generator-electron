import React from "react";
import { TextInput } from "./elements";
export default function Tab({
  tabData,
  children,
  updateTab,
  addNewSection,
  index,
}) {
  return (
    <li>
      <h3>Tab</h3>
      <TextInput
        label="Tab Title"
        value={tabData.tabTitle}
        name="tabTitle"
        handler={(e) =>
          updateTab({
            value: e.target.value,
            key: "tabTitle",
            id: tabData.tabId,
          })
        }
      />
      <TextInput
        label="Tab Slug"
        value={tabData.tabSlug}
        name="tabSlug"
        handler={(e) =>
          updateTab({
            value: e.target.value,
            key: "tabSlug",
            id: tabData.tabId,
          })
        }
      />
      <ul className="repeater">{children}</ul>
      <button type="button" onClick={addNewSection}>
        add new section
      </button>
    </li>
  );
}
