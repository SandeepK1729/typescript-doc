import DeepPartial from "@/types/deep-partial/deep-partial";
import deepMerge from "../deepMerge";

// Merging with optional properties
type User = {
  name: string;
  age?: number;
  roles: string[];
};
const user1: User = {
  name: "Alice",
  roles: ["user"],
};
const user2: DeepPartial<User> = {
  age: 30,
  roles: ["admin"],
};

const mergedUser = deepMerge(user1, user2);

console.log(mergedUser);
// mergedUser will be { name: 'Alice', age: 30, roles: ['user', 'admin'] }
