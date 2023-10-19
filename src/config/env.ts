/**
 * 环境配置
 */
import * as fs from 'fs';
import * as path from 'path';

const isProd = process.env.NODE_ENV === 'production';

function parseEnv() {
  const devEnv = path.resolve('.env');
  const prodEnv = path.resolve('.env.prod');

  if (!fs.existsSync(devEnv) && !fs.existsSync(prodEnv)) {
    throw new Error('缺少环境配置文件');
  }

  const filePath = isProd && fs.existsSync(prodEnv) ? prodEnv : devEnv;

  return {
    path: filePath,
    isProd,
  };
}

export default parseEnv();
