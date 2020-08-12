import {
  bnbToBNB,
  ukavaToKAVA,
  nanoSecondsToSeconds,
  usdxToUSDX
} from 'utils/conversions';

describe('conversions', () => {

  it('converts bnb to BNB', () => {
    let value = 1234567890
    let expectedOutput = 12.3456789
    expect(bnbToBNB(value)).toBe(expectedOutput)
  });

  it('converts ukava to KAVA', () => {
    let value = 1234567890
    let expectedOutput = 1234.56789
    expect(ukavaToKAVA(value)).toBe(expectedOutput)
  });

  it('converts nano seconds to seconds', () => {
    let value = 1234567890
    let expectedOutput = 1.23456789
    expect(nanoSecondsToSeconds(value)).toBe(expectedOutput)
  });

  it('converts usdx to USDX', () => {
    let value = 1234567890
    let expectedOutput = 1234.56789
    expect(usdxToUSDX(value)).toBe(expectedOutput)
  });
});
