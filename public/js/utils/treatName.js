export function treatName(name) {
  name = name.trim();

  name = nameWithCapitalLetters(name);

  name = removeSpecialCharacters(name);

  return name;
}

function nameWithCapitalLetters(name) {
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function removeSpecialCharacters(name) {
  return name.replace(/[^a-zA-Z0-9 ]/gi, "");
}
