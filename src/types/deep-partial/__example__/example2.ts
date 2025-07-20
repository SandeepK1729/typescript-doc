import DeepPartial from "../deep-partial";

type User = {
  name: string;
  age: number;
  notification: {
    email: boolean;
    push: boolean;
  };
};

// Partial<User> will be:
// {
//     name?: string | undefined;
//     age?: number | undefined;
//     notification?: {
//         email: boolean;
//         push: boolean;
//     } | undefined;
// }
const userPartial: Partial<User> = {
  name: "Alice",
  notification: {
    // throws error: Property 'email' is missing in type '{ push: boolean; }' 
    // but required in type '{ email: boolean; push: boolean; }'.
    email: true,
  }
};

// DeepPartial<User> will be:
// {
//     name?: string | undefined;
//     age?: number | undefined;
//     notification?: {
//         email?: boolean | undefined;
//         push?: boolean | undefined;
//     } | undefined;
// }
const userDeepPartial: DeepPartial<User> = {
  name: "Alice",
  notification: {
    // No error, email and push are optional
    email: true,
  }
};
