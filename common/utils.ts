import BigNumber from 'bignumber.js';

export function promisify(...args): Promise<any> {
  const func = [].shift.call(args);
  return new Promise((res, rej) => {
    func(...args, (err: any, data: any) => {
      if (err) { return rej(err); }
      return res(data);
    });
  });
}

export function isBigNumber (object: any) {
  return object instanceof BigNumber ||
    (object && object.constructor && object.constructor.name === 'BigNumber');
}

export function toBigNumber (value: number | string | BigNumber): BigNumber {
  value = value || 0;

  if (isBigNumber(value)) {
    return <BigNumber>value;
  }

  if (typeof value === 'string' && (value.indexOf('0x') === 0 || value.indexOf('-0x') === 0)) {
    return new BigNumber(value.replace('0x', ''), 16);
  }

  return new BigNumber(value.toString(), 10);
}

export function tens(m: number): string {
  return new BigNumber(10).pow(m).toString(10);
}

export function unitUp(value: number | string | BigNumber, decimals: number = 18): string {
  const returnValue = toBigNumber(value).dividedBy(tens(decimals));

  return returnValue.toString(10);
}

export function unitDown(value: number | string | BigNumber, decimals: number = 18): string {
  const returnValue = toBigNumber(value).times(tens(decimals));

  return returnValue.toString(10);
}
