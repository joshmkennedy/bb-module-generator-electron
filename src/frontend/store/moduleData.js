import React, { useContext, useState } from "react";
import create from "zustand";
import produce from "immer";

import {
  defaultTab,
  defaultSection,
  defaultField,
  testModuleData,
} from "../lib/defaultData";

const useModuleDataStore = create((set) => ({
  moduleData: { ...testModuleData },
  set: (fn) => set(produce(fn)),
}));

export { useModuleDataStore };
