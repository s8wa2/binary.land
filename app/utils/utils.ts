import { modalSettings } from "~/routes/_index";

const getBasePrefix = (base: modalSettings['base']) => {
    return base === '2' ? '0b' : base === '10' ? '' : '0x';
  };

const formatString = (
    string: typeof BigInt extends (...args: infer U) => any ? U[0] : never,
    parseAs: modalSettings['base'],
    formatSettings: modalSettings
  ) => {
    const settingsBase = getBasePrefix(formatSettings.base);
    const parseAsBase = getBasePrefix(parseAs);
    const bigint = BigInt(parseAsBase + string);
    return (
      settingsBase +
      bigint.toString(parseInt(formatSettings.base)) +
      (formatSettings.useJSBigInt ? 'n' : '')
    );
  }

  export { formatString }