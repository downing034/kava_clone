export function numberToMoneyString(value) {
  return Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
}

export function numberToMoneyNoSymbol(value) {
  return Number(value).toLocaleString(undefined, { maximumFractionDigits: 2 })
}

export function numberToMoneyNoDecimal(value) {
    // use floor here to round down
  return Math.floor(Number(value)).toLocaleString()
}

export function formatPercentages(value, fixed) {
  // return in the value isa dash for the table
  if(value === '-') { return '-' }
  return `${Number(value).toFixed(fixed)}%`
}

export function numberToMoneyForTable(value) {
  // return in the value isa dash for the table
  if(value === '-') { return '-' }
  return `$${value}M`
}

// checks if a number is positive or negative (or 0)
// positive == 1, negative == -1, 0 will return 0
export function percentageDisplayClass(value) {
  let sign = Math.sign(Number(value))
  let appliedClass;
  switch (sign) {
    case -1:
      appliedClass = 'red'
      break;
    case 1:
      appliedClass = 'green'
      break;
    default:
      appliedClass = 'grey'
  };
  return appliedClass
}
