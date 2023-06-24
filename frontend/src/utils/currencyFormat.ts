export default (input: number) => new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',

  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}).format(input);
