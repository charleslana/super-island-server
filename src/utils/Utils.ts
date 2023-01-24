import bcrypt from 'bcrypt';

export default class Utils {
  public static encrypt(password: string): string {
    const salt = +(process.env.BCRYPT_SALT as string);
    return bcrypt.hashSync(`${password}${process.env.BCRYPT_PASSWORD}`, salt);
  }

  public static decrypt(password: string, hashPassword: string): boolean {
    return bcrypt.compareSync(
      `${password}${process.env.BCRYPT_PASSWORD}`,
      hashPassword
    );
  }

  public static randomString(length: number) {
    let string = '';
    const randomChar = function () {
      const number = Math.floor(Math.random() * 62);
      if (number < 10) return number;
      if (number < 36) return String.fromCharCode(number + 55);
      return String.fromCharCode(number + 61);
    };
    while (string.length < length) string += randomChar();
    return string;
  }
}
