/**
 * Dot Notation Type Utility
 * 
 * This utility type converts an object type into a dot notation string type.
 * It recursively traverses the object properties and constructs a string
 * representation of the paths to each property, using dot notation.
 * 
 * @example
 * type Example = {
 *   user: {
 *     name: string;
 *     address: {
 *       street: string;
 *       city: string;
 *     };
 *   };
 * };
 * 
 * type Result = DotNotation<Example>;
 * // Result will be "user.name" | "user.address.street" | "user.address.city"
 */
 type DotNotation<T, Prefix extends string = ''> = {
  [K in keyof T]: T[K] extends object
    ? DotNotation<T[K], `${Prefix}${K & string}.`>
    : `${Prefix}${K & string}`
}[keyof T];

/**
 * ValueAtPath Type Utility
 * 
 * This utility type retrieves the type of a property at a given path in an object.
 * It supports dot notation for nested properties and returns the type of the value
 * at that path, or `never` if the path does not exist.
 * 
 * @example
 * type Example = {
 *   user: {
 *     name: string;
 *     address: {
 *       street: string;
 *       city: string;
 *     };
 *   };
 * };
 * 
 * type Result = ValueAtPath<Example, 'user.address.street'>; // Result will be string
 * type Result2 = ValueAtPath<Example, 'user.address.zipCode'>; // Result2 will be never
 */
type ValueAtPath<T, P extends string> = 
  P extends `${infer Key}.${infer Rest}`
    ? Key extends keyof T
      ? ValueAtPath<T[Key], Rest>
      : never
    : P extends keyof T
      ? T[P]
      : never;