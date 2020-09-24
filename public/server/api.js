const { ipcMain, dialog } = require("electron");
const storage = require("electron-json-storage");
const fs = require("fs");
const { createModule } = require("./moduleGeneration/createModule.js");
const typesAndFields = require("./moduleGeneration/typesAndFields.json");

module.exports = function api(rendererWindow) {
  handleResponse("get-settings", () => {
    return JSON.stringify(typesAndFields);
  });
  handleResponse("create-module", async (event, arg) => {
    const data = await JSON.parse(arg);
    console.log(data);
    await createModule(data);
    return JSON.stringify({ message: "done" });
  });
  handleResponse("initSetDirPath", (event, arg) => {
    return dialog
      .showOpenDialog(rendererWindow, {
        properties: ["openDirectory"],
      })
      .then(async (directory) => {
        storage.set("directoryPath", directory.filePaths[0]);
        console.log(directory.filePaths[0]);
        return JSON.stringify({ path: directory.filePaths[0] });
      });
  });
  handleResponse("getDirPath", (event, arg) => {
    return new Promise((resolve, reject) => {
      storage.get("directoryPath", (err, path) => {
        console.log({ path });
        resolve(JSON.stringify({ path }));
      });
    });
  });
};

function handleResponse(event, cb) {
  ipcMain.handle(event, cb);
}
