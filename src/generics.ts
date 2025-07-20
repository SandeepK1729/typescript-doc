

interface Person {
  name: string;
  age: number;
}

const person: Person = {
  name: "Sam",
  age: 30
};

/* Without generics, the function would look like this: */
const getStudentProperty = (key: keyof Person): Person[keyof Person] => person[key];

// Example usage:
const data = getStudentProperty("age"); // Output: 30
//    ^? const data: string | number
// The above function works, but it is not type-safe.


const setStudentProperty = (key: keyof Person, value: Person[keyof Person]) => {
  person[key] = value; // This will throw an error if the value is not of the correct type.
  // Type 'string | number' is not assignable to type 'never'.
  //   Type 'string' is not assignable to type 'never'.ts(2322
}
// it will accept any possible value for the key, which is not type-safe.


/** With generics */

/**
 * This function retrieves a property from a person object based on the provided key.
 * It uses generics to ensure type safety, allowing the key to be any valid key of the Person interface.
 * 
 * @author @SandeepK1729
 *  
 * @template TKey - The type of the key, which must be a key of Person.
 * @param {<TKey>} key - The key of the property to retrieve from the person object.
 * @returns {Person[TKey]} - The value of the property corresponding to the key.
 * 
 * @example
 * const name = getStudentProperty("name"); // string
 * const age = getStudentProperty("age"); // number
 */
const getPersonProperty = <TKey extends keyof Person>(key: TKey): Person[TKey] => person[key];

// Example usage:
// manually specifying the key type
const a = getPersonProperty<"age">("age"); // Output: 30
//    ^? const a: number

// automatically inferring the key type
const b = getPersonProperty("name"); // Output: "Sam"
//    ^? const b: string

// This will throw type error, because the key is not a valid key of Person
const c = getPersonProperty("age1");
// Error: Argument of type '"age1"' is not assignable to parameter of type '"name" | "age"'.





/**
 * This function sets a property on a person object based on the provided key and value.
 * It uses generics to ensure type safety, allowing the key to be any valid key of the Person interface.
 * 
 * @author @SandeepK1729
 * 
 * @template TKey - The type of the key, which must be a key of Person.
 * @param {<TKey>} key - The key of the property to set on the person object.
 * @param {Person[TKey]} value - The value to set for the property corresponding to the key.
 * 
 * @example
 * setPersonProperty("name", "John"); // Sets the name property to "John"
 * setPersonProperty<"age">("age", 25); // Sets the age property to 25
 */
const setPersonProperty = <TKey extends keyof Person>(key: TKey, value: Person[TKey]) => {
  person[key] = value;
}


// Example usage:

// manually specifying the key type
setPersonProperty<"age">("age", 25); // Sets the age property to 25
//             ^? const setPersonProperty: (key: "age", value: number) => void

// automatically inferring the key type
setPersonProperty("name", "John"); // Sets the name property to "John"
//             ^? const setPersonProperty: <"name">(key: "name", value: string) => void

// This will throw type error, because the value type does not match the key type
setPersonProperty("name", 25);
// Error: Argument of type 'number' is not assignable to parameter of type 'string'.









// `Parameters` is a utility type that extracts the parameter types of a function as a tuple.
const exampleFunction = (a: string, b: number): void => {};

type ExampleFunctionParams = Parameters<typeof exampleFunction>;
//   ^?

// `keyof` is a TypeScript operator that creates a union type of the keys of an interface.
type PersonKeys = keyof Person;
//   ^?
// This will be "name" | "age"


const mergeObjects = <T>(key: keyof T, ...obj: T) => objs.find((obj) => obj[key]) ?? objs[0];

i