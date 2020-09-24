export function findIndexById(arr, id, key) {
  return arr.findIndex((item) => item[key] === id);
}

export function updateObj(obj, key, value) {
  return { ...obj, [key]: value };
}

export function replaceItemByIndex(arr, index, value) {
  arr.splice(index, 1, value);
  return arr;
}

export function updateObjInArrayByIndex({ objKey, obj, value, array, index }) {
  const newObj = updateObj(obj, objKey, value);
  const updatedArray = replaceItemByIndex(array, index, newObj);
  return updatedArray;
}

export function updateObjInArrayById({ objKey, value, objId, idKey, array }) {
  const itemIndex = findIndexById(array, objId, idKey);
  const item = array[itemIndex];
  const updatedItem = updateObj(item, objKey, value);
  const updatedArr = replaceItemByIndex(array, itemIndex, updatedItem);
  return updatedArr;
}

export function newRepeaterItem({ state, key, item }) {
  return {
    ...state,
    [key]: [...state[key], item],
  };
}
