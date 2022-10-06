export function treatName(name: string) {
  name = name.trim();

  name = nameWithCapitalLetters(name);

  name = removeSpecialCharacters(name);

  return name;
}

function nameWithCapitalLetters(name: string) {
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function removeSpecialCharacters(name: string) {
  return name.replace(/[^a-zA-ZÀ-ÿ0-9\s-~´]/g, "");
}
