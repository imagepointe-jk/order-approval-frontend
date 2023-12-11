function clamp(val: number, min: number, max: number) {
  if (val < min) return min;
  if (val > max) return max;
  return val;
}

export function generateDottedPriceRow(
  leftText: string,
  dollarAmountStr: string,
  maxDots: number
) {
  const dotsCount = clamp(
    maxDots - leftText.length - `$${dollarAmountStr}`.length,
    0,
    maxDots
  );
  return [leftText, ".".repeat(dotsCount), `$${dollarAmountStr}`];
}

export function getAccessCodeFromURL() {
  const splitURL = document.URL.split("/");
  const lastURLPiece = splitURL[splitURL.length - 1];
  return lastURLPiece;
}
