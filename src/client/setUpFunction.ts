import { Event } from "./types/index";
// Extract matches attribute name from curEvent
const clientMatchesKey = (eventObj: Event) => {
  const fixedKeys = [
    "id",
    "name",
    "sport",
    "league",
    "rounds",
    "year",
    "startDate",
    "createdAt",
    "updatedAt",
  ];
  const customKey = Object.keys(eventObj).find(
    (key) => !fixedKeys.includes(key)
  );
  return eventObj[customKey as string];
};
export default clientMatchesKey;
