export class FormatUtils {
  static readonly regexRemoveSpecialChar = /[^\w\s]/gi;
  // Hàm chuyển tiền kiểu string sang kiểu số - sonhsa
  static moneyToNumber(value: any): number {
    const result = String(value);
    return Number(result.replace(FormatUtils.regexRemoveSpecialChar, ''));
  }
  // Format sang dạng tiền tệ. VD: 10000000 -> 10,000,000
  static formatMoney(input: string): string {
    let value = String(input);
    while (value.charAt(0) === '0') {
      value = value.substr(1);
    }
    value = value.replace(/[^\d.\',']/g, '');
    const point = value.indexOf('.');
    if (point >= 0) {
      value = value.slice(0, point + 3);
    }

    const decimalSplit = value.split('.');
    let intPart = decimalSplit[0];
    let decPart = decimalSplit[1];

    intPart = intPart.replace(/[^\d]/g, '');
    if (intPart.length > 3) {
      let intDiv = Math.floor(intPart.length / 3);
      while (intDiv > 0) {
        let lastComma = intPart.indexOf(',');
        if (lastComma < 0) {
          lastComma = intPart.length;
        }
        if (lastComma - 3 > 0) {
          intPart = (intPart.slice(0, lastComma - 3) + ',' + intPart.slice(lastComma - 3 + Math.abs(0)));
        }
        intDiv--;
      }
    }

    if (decPart === undefined) {
      decPart = '';
    } else {
      decPart = '.' + decPart;
    }
    const res = intPart + decPart;
    return res;
  }
}
