import semver from "semver";

export function verificarVersion() {
  const VERSION_ACTUAL = process.env.API_VERSION;
  const VERSION_MINIMA = process.env.MIN_VERSION;
  const VERSION_MAXIMA = process.env.MAX_VERSION;

  if (!semver.valid(VERSION_ACTUAL)) {
    console.log("La versión actual no es válida.");
    return false;
  }

  if (semver.lt(VERSION_ACTUAL, VERSION_MINIMA)) {
    console.log(`Versión ${VERSION_ACTUAL} es menor que la mínima (${VERSION_MINIMA}).`);
    return false;
  }

  if (semver.gt(VERSION_ACTUAL, VERSION_MAXIMA)) {
    console.log(`Versión ${VERSION_ACTUAL} supera la máxima permitida (${VERSION_MAXIMA}).`);
    return false;
  }

  console.log(`Versión ${VERSION_ACTUAL} está dentro del rango permitido.`);
  return true;
}
