import { initialValue, Options } from "../options";

export const saveOptions = (options: Options) => {
  chrome.storage.sync.set({ options });
};

export const loadOptions = (): Promise<Options> =>
  new Promise(resolve => {
    chrome.storage.sync.get(values => {
      resolve(values.options ?? initialValue);
    });
  });

export const onChangeOptions = (
  callback: (newOptions: Options, oldOptions: Options) => void,
  useInitialFire: boolean
) => {
  chrome.storage.onChanged.addListener(changes => {
    callback(
      changes?.options.newValue ?? initialValue,
      changes?.options.oldValue ?? initialValue
    );
  });

  if (useInitialFire) {
    callback(initialValue, initialValue);
  }
};
