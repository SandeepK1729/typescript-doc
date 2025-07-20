type DeepPartial<T> = {
  [P in keyof T]?:
    // If the property is an object, recursively apply DeepPartial
    // else keep the original type
    T[P] extends object
      ? DeepPartial<T[P]>
      : T[P];
};

export default DeepPartial;