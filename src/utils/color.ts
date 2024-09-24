export function invertColor(hex: string) {
  hex = hex.replace(/^#/, '');
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  // Invert colors
  const _r = (255 - r).toString(16).padStart(2, '0');
  const _g = (255 - g).toString(16).padStart(2, '0');
  const _b = (255 - b).toString(16).padStart(2, '0');

  return `#${_r}${_g}${_b}`;
}
