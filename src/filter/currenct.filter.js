export default function currencyFilter(value, currency = 'UZS') {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency
  }).format(value)
}