// From https://developer.mozilla.org/ja/docs/Web/JavaScript/Enumerability_and_ownership_of_properties
export class SimplePropertyRetriever {
  getOwnEnumerables(obj: any) {
    return SimplePropertyRetriever.getPropertyNames(obj, true, false, SimplePropertyRetriever.enumerable);
    // Or could use for..in filtered with hasOwnProperty or just this: return Object.keys(obj);
  }

  getOwnNonenumerables(obj: any) {
    return SimplePropertyRetriever.getPropertyNames(obj, true, false, SimplePropertyRetriever.notEnumerable);
  }

  getOwnEnumerablesAndNonenumerables(obj: any) {
    return SimplePropertyRetriever.getPropertyNames(
      obj,
      true,
      false,
      SimplePropertyRetriever.enumerableAndNotEnumerable
    );
    // Or just use: return Object.getOwnPropertyNames(obj);
  }

  getPrototypeEnumerables(obj: any) {
    return SimplePropertyRetriever.getPropertyNames(obj, false, true, SimplePropertyRetriever.enumerable);
  }

  getPrototypeNonenumerables(obj: any) {
    return SimplePropertyRetriever.getPropertyNames(obj, false, true, SimplePropertyRetriever.notEnumerable);
  }

  getPrototypeEnumerablesAndNonenumerables(obj: any) {
    return SimplePropertyRetriever.getPropertyNames(
      obj,
      false,
      true,
      SimplePropertyRetriever.enumerableAndNotEnumerable
    );
  }

  getOwnAndPrototypeEnumerables(obj: any) {
    return SimplePropertyRetriever.getPropertyNames(obj, true, true, SimplePropertyRetriever.enumerable);
    // Or could use unfiltered for..in
  }

  getOwnAndPrototypeNonenumerables(obj: any) {
    return SimplePropertyRetriever.getPropertyNames(obj, true, true, SimplePropertyRetriever.notEnumerable);
  }

  getOwnAndPrototypeEnumerablesAndNonenumerables(obj: any) {
    return SimplePropertyRetriever.getPropertyNames(
      obj,
      true,
      true,
      SimplePropertyRetriever.enumerableAndNotEnumerable
    );
  }

  // Private static property checker callbacks
  private static enumerable(obj: any, prop: any) {
    return obj.propertyIsEnumerable(prop);
  }

  private static notEnumerable(obj: any, prop: any) {
    return !obj.propertyIsEnumerable(prop);
  }

  private static enumerableAndNotEnumerable(obj: any, prop: any) {
    return true;
  }

  // Inspired by http://stackoverflow.com/a/8024294/271577
  private static getPropertyNames(
    obj: any,
    iterateSelf: boolean,
    iteratePrototype: boolean,
    includePropCb: (obj: any, prop: any) => boolean
  ): Array<string | number> {
    const props: any[] = [];

    do {
      if (iterateSelf) {
        for (const prop of Object.getOwnPropertyNames(obj)) {
          if (props.indexOf(prop) === -1 && includePropCb(obj, prop)) {
            props.push(prop);
          }
        }
      }
      if (!iteratePrototype) {
        break;
      }
      iterateSelf = true;
    } while ((obj = Object.getPrototypeOf(obj)));

    return props;
  }
}

export const simplePropertyRetriever = new SimplePropertyRetriever();
