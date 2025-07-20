import DeepPartial from "@/types/deep-partial/deep-partial";
import deepMerge from "../deepMerge";

// Merging with nested objects
type Settings = {
theme: string;
notifications: {
  email: boolean;
  push: boolean;
}
};

const settings1: Settings = {
  theme: 'dark',
  notifications: {
  email: true,
  push: false,
}
};

const updatedSettings: DeepPartial<Settings> = {
notifications: {
  push: true, // Only updating the push notification setting
}
};

const mergedSettings = deepMerge(settings1, updatedSettings);

console.log(mergedSettings);
// mergedSettings will be {
//   theme: 'dark',
//   notifications: {
//     email: true,
//     push: true // Updated to true
//   }
// }