/**
 * Display a number with 2 digits
 * @param {str | number} price 
 */
export const formatPrice = (price) => {
  return parseFloat(price).toFixed(2)
}