

/**
 * Creates a type that recursively makes all properties of `T` optional.
 * 
 * @author @SandeepK1729
 * 
 * For each property in `T`, if the property is itself an object, `DeepPartial` is applied recursively.
 * Otherwise, the property's type is preserved but made optional.
 * 
 * Useful for scenarios where you want to allow partial updates to deeply nested objects.
 *
 * @template T - The type to make deeply partial.
 */
type DeepPartial<T> = {
  // For each property in T, make it optional
  [P in keyof T]?:
    // If the property is an object, recursively apply DeepPartial
    // else keep the original type
    T[P] extends object
      ? DeepPartial<T[P]>
      : T[P];
};

export default DeepPartial;
