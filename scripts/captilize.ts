const captilize = (text: string) =>
    (text[0].toUpperCase() + text.slice(1, text.length)).replaceAll("_", " ");

export default captilize;
