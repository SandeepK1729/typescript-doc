import DeepPartial from "@/types/deep-partial/deep-partial";

/**
 * checks if a value is an object 
 * @param value - The value to check if it is an object
 * @returns boolean - Returns true if the value is an object and not null
 */
const isObject = (value: unknown): value is Record<string, any> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

/**
 * deepMerge function
 * 
 * @author @SandeepK1729
 *  
 * @template T - The type of the source object
 * @param source - The source object to merge into
 * @param overrides - The overrides object containing properties to merge into the source
 * 
 * @description Merges two objects deeply, allowing for nested properties to be overridden.
 * - If the source is undefined or null, it returns the overrides as T.
 * - If both source and overrides are arrays, it concatenates them.
 * - If overrides is not an object, it returns overrides as T.
 * - If the property in overrides is an object, it recursively merges it with the corresponding property in source.
 * - If the property in overrides is a primitive value, it overrides the corresponding property in source.
 * 
 * @returns T - The merged object
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
  if (!isObject(overrides)) {
    return overrides as T;
  }

  // Iterate over the keys of overrides
  const overrideKeys = Object.keys(overrides) as (keyof DeepPartial<T>)[];

  return overrideKeys.reduce((acc, key) => {
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

export default deepMerge;
