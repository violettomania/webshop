export default function formatPrice(price: string) {
  const numberPrice = Number(price);
  const formattedPrice = (numberPrice / 100).toFixed(2);
  return formattedPrice;
}
