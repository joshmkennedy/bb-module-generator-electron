const fs = require("fs");
const { TEST_PATH } = require("../config");
const storage = require("electron-json-storage");
const { createBBModuleContent } = require("./generateModulePHP");

async function createModule(data) {
  const formattedData = {
    ...data.moduleInformation,
    settingsData: [...data.settingsData],
  };
  const { moduleSlug, moduleName } = formattedData;
  //create moduleDir
  await mkDirAsync(`${moduleSlug}`);
  //create includes Dir
  await mkDirAsync(`${moduleSlug}/includes`);
  //create frontend.php
  writeFileAsync(
    `${moduleSlug}/includes/frontend.php`,
    `<?php ?>
    <h1>${moduleName}</h1>`
  );
  //create css Dir
  await mkDirAsync(`${moduleSlug}/css`);
  //create index.css
  writeFileAsync(`${moduleSlug}/css/index.css`, `/* ${moduleName}'s css */`);
  //create js Dir
  await mkDirAsync(`${moduleSlug}/js`);
  //create index.js
  await writeFileAsync(`${moduleSlug}/js/index.js`, `/* ${moduleName}'s js */`);
  //create module.php
  await createModulePHP(formattedData);
}

async function createModulePHP(data) {
  const { moduleSlug } = data;
  const moduleContent = await createBBModuleContent(data);
  writeFileAsync(`${moduleSlug}/${moduleSlug}.php`, moduleContent);
}

async function writeFileAsync(path, data) {
  return new Promise((resolve, reject) => {
    getDirectory().then((dir) => {
      fs.writeFile(`${dir}/${path}`, data, "utf8", (e, data) => {
        if (e) {
          reject(e);
        } else {
          resolve(data);
        }
      });
    });
  });
}
async function mkDirAsync(path) {
  return new Promise((resolve, reject) => {
    getDirectory().then((dir) => {
      fs.mkdir(`${dir}/${path}`, (e) => {
        if (e) {
          reject(e);
        } else {
          resolve();
        }
      });
    });
  });
}
function getDirectory() {
  return new Promise((resolve, reject) => {
    storage.get("directoryPath", function (error, data) {
      if (error) {
        reject(error);
      }
      resolve(data);
    });
  });
}
module.exports = { createModule };
