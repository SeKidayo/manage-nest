import * as bcryptjs from 'bcryptjs';
/**
 * 密码加密解密方法
 */

// 加密盐值
const SALT = 10;

/**
 * 加密方法
 * @param password 密码
 * @returns 加密后的密码
 */
export function hashPassword(password) {
  return bcryptjs.hashSync(password, SALT);
}

/**
 * 校验方法
 * @param password 密码
 * @param encryptedPassword 加密后的密码
 * @returns {boolean} 两个密码是否一致
 */
export function compareSync(password, encryptedPassword): boolean {
  return bcryptjs.compareSync(password, encryptedPassword);
}
