const DASH_ID_LENGTH_VALID = 36;
const DASH_ID_CLEAN_LENGTH_VALID = 32;

const isValidId = (id: string) => {
  if (id.length != DASH_ID_LENGTH_VALID) return false;

  const parts = id.split("-");
  return parts.length == 5;
};

export const dashifyId = (id: string) => {
  if (isValidId(id)) return id;

  const clean = id.replace(/-/g, "");
  if (clean.length != DASH_ID_CLEAN_LENGTH_VALID) throw new Error(`Incorrect id format: ${id}`);

  return [
    clean.substring(0, 8),
    "-",
    clean.substring(8, 12),
    "-",
    clean.substring(12, 16),
    "-",
    clean.substring(16, 20),
    "-",
    clean.substring(20, 32),
  ].reduce((acc: string, element) => `${acc}${element}`);
};
