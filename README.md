# Ideas

## For editing an already created module

Lets save the settings as a json file to send to frontend and set it as the Module Settings state.
Edit the templates:

- create a separate file called settings.php and just include it in the module.php file. - this allows the editing of the main file and it wont get over written when saved.
  need to abstract some of the code generation functions. Need to create two modes
- new module generation,
- editing module generation.
  so we dont create new files just replace the necessary content.

- 2 modes
  - if we are creating a new module
    - then create create all the files with default data immediately, then switch to editing mode
  - else
    - read files and update them with new data

## Editing the css, and js, and html for the module

- create and editor.
- create state and ui on the frontend that reads and updates files.

## Settings Editor

- col 1: Tabs
- col 2: Selected Tab
  - gen info
  - sections
- col 3:
  - gen info or
  - active section
    - gen info
    - fields
- [x] lets add immer and zustand
- [x] create a store for data
- [x] create functions rewrite all functions to use new store
- [ ] put children inside actual components
- [ ] each with active child state
- [ ] sketch or in figma what it will look like
- [ ] render layout
