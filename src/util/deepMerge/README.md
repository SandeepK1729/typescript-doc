# Deep Merge Utility

```typescript
/**
 * 
 * @param source - The source object to merge into
 * @param overrides - The overrides object containing properties to merge into the source
 * @template T - The type of the source object
 * @description Merges two objects deeply, allowing for nested properties to be overridden.
 * - If the source is undefined or null, it returns the overrides as T.
 * - If both source and overrides are arrays, it concatenates them.
 * - If overrides is not an object, it returns overrides as T.
 * - If the property in overrides is an object, it recursively merges it with the corresponding property in source.
 * - If the property in overrides is a primitive value, it overrides the corresponding property in source.
 * @returns T - The merged object
 * 
 * @example
 * // Merging with optional properties and arrays
 * type User = {
 *   name: string;
 *   age?: number;
 *   roles: string[];
 * }
 * const user1: User = {
 *  name: 'Alice',
 *  roles: ['user']
 * };
 * const user2: DeepPartial<User> = {
 *  age: 30,
 *  roles: ['admin']
 * };
 * const mergedUser = deepMerge(user1, user2);
 * // mergedUser will be { name: 'Alice', age: 30, roles: ['user', 'admin'] }
 * 
 * @example
 * // Merging with nested objects
 * type Settings = {
 *  theme: string;
 *  notifications: {
 *   email: boolean;
 *   push: boolean;
 *  }
 * };
 * 
 * const settings1: Settings = {
 *   theme: 'dark',
 *   notifications: {
 *    email: true,
 *    push: false,
 *  }
 * };
 * 
 * const updatedSettings: DeepPartial<Settings> = {
 *  notifications: {
 *    push: true, // Only updating the push notification setting
 *  }
 * };
 * 
 * const mergedSettings = deepMerge(settings1, updatedSettings);
 * // mergedSettings will be {
 * //   theme: 'dark',
 * //   notifications: {
 * //     email: true,
 * //     push: true // Updated to true
 * //   }
 * // }
 */

const deepMerge = <T>(source: T, overrides: DeepPartial<T>): T => {
  // If source is undefined or null, return overrides as T
  // useful when optionals `?` are used in type T
  // example: deepMerge(undefined, { a: 1 }) should return { a: 1 }
  if (source === undefined || source === null) {
    return overrides as T;
  }

  // If both are arrays, concatenate them (Optional behavior, if objects doesn't have arrays)
  // example: deepMerge([1, 2], [3, 4]) should return [1, 2, 3, 4]
  if (Array.isArray(source) && Array.isArray(overrides)) {
    return [...source, ...overrides] as T;
  }

  // If overrides is not an object, return overrides as T
  // useful when overrides is a primitive value
  // exampple: deepMerge("hello", "world") should return "world"
  // example: deepMerge(42, 100) should return 100
  if (!isObject(overrides)) {
    return overrides as T;
  }

  // Iterate over the keys of overrides
  const overrideKeys = Object.keys(overrides) as (keyof DeepPartial<T>)[];

  return overrideKeys.reduce(
    (acc, key) => {
      const overrideVal = overrides[key] as DeepPartial<T[keyof T]>;

      // merge them recursively, if the value is defined
      if (overrideVal !== undefined && overrideVal !== null) {
        acc[key] = deepMerge(source[key], overrideVal);
      }

      return acc;
    },
    { ...source } as T
  );
}
```