import {
  numberToMoneyString,
  numberToMoneyNoSymbol,
  numberToMoneyNoDecimal,
  formatPercentages,
  numberToMoneyForTable,
  percentageDisplayClass
} from 'utils/viewUtils';

describe('viewUtils', () => {
  it('formats numberToMoneyString', () => {
    let value = 1234567890
    let expectedOutput = "$1,234,567,890.00"
    expect(numberToMoneyString(value)).toBe(expectedOutput)
  });

  it('formats numberToMoneyNoSymbol', () => {
    let value = 1234567890
    let expectedOutput = "1,234,567,890"
    expect(numberToMoneyNoSymbol(value)).toBe(expectedOutput)
  });

  it('formats numberToMoneyNoDecimal', () => {
    let value = 1234567890
    let expectedOutput = "1,234,567,890"
    expect(numberToMoneyNoDecimal(value)).toBe(expectedOutput)
  });

  describe('formatPercentages', () => {
    it('formats when numbers passed in', () => {
      let value = 1234567890
      let expectedOutput = "1234567890%"
      expect(formatPercentages(value)).toBe(expectedOutput)
    });

    it('formats when - passed in', () => {
      let value = '-'
      let expectedOutput = "-"
      expect(formatPercentages(value)).toBe(expectedOutput)
    });
  });

  describe('numberToMoneyForTable', () => {

    it('formats when numbers passed in', () => {
      let value = 1234567890
      let expectedOutput = "$1234567890M"
      expect(numberToMoneyForTable(value)).toBe(expectedOutput)
    });

    it('formats when - passed in', () => {
      let value = '-'
      let expectedOutput = "-"
      expect(numberToMoneyForTable(value)).toBe(expectedOutput)
    });
  });

  describe('percentageDisplayClass', () => {
    it('when number is positive', () => {
      let value = 1234567890
      let expectedOutput = "green"
      expect(percentageDisplayClass(value)).toBe(expectedOutput)
    });

    it('when number is negative', () => {
      let value = -1234567890
      let expectedOutput = "red"
      expect(percentageDisplayClass(value)).toBe(expectedOutput)
    });

    it('when number is 0', () => {
      let value = 0
      let expectedOutput = "grey"
      expect(percentageDisplayClass(value)).toBe(expectedOutput)
    });
  });
});
