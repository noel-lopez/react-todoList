export const getButtonClass = ({rounded, square}) => {
  if (rounded) return 'rounded';
  if (square) return 'square';
  return '';
};