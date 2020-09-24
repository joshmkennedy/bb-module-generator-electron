export default function ({ state, key, item }) {
  return {
    ...state,
    [key]: [...state[key], item],
  };
}
