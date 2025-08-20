export function useCurrencify(amount) {
  // format: "+ 4.000,99 | - 4.888,11"
  let posNegSymbol = ''
  if (amount > 0) posNegSymbol = '+'
  else if (amount < 0) posNegSymbol = '-'

  const amountPositive = Math.abs(amount)

  const amountFormatted = amountPositive.toLocaleString('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  return `${posNegSymbol} ${amountFormatted}`
}
