import * as luxon from 'luxon';

import axios from 'axios';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

async function doIt() {
  await waterfallScraping(
    grepImgSrc(fs.readFileSync(path.join(__dirname, 'raw.txt')).toString())
  );
}

async function waterfallScraping(urls: string[]) {
  const dir = path.join(__dirname, '/imgs');
  const result = Promise.resolve();
  await urls.reduce(async (promise, url) => {
    await promise;
    const res = await downloadImgAndSaving(dir, url);
    console.log(res);
  }, result);
}

function grepImgSrc(raw: string) {
  console.log(`HTML Prase Start. type: ${typeof raw}. length: ${raw.length}`);
  const parsed = raw
    .split('\n')
    .filter((row) => row.match('javascript:viewDetail') !== null)
    .map((item) => {
      return item
        .split(' src="')[1]
        .split('"')[0]
        .replace('width=239&amp;height=239', 'width=10000');
    });

  console.log(`HTML Prase Done. length is ${parsed.length}`);

  return parsed;
}

async function downloadImgAndSaving(
  dir: string,
  url: string
): Promise<string | false> {
  try {
    const now = luxon.DateTime.local().toMillis();
    const result = await axios.get<Buffer>(url, {
      responseType: 'arraybuffer',
    });

    if (result.status >= 400) {
      throw new Error(`GET ${url} return ${result.status}`);
    }

    // console.log(result.data);
    const filename = `${now}_${crypto.randomBytes(16).toString('hex')}`;

    const ext = (() => {
      const ext = result.headers['content-type'].split('/')[1];
      if (ext === 'jpeg') {
        return '.jpg';
      }
      return `.${ext}`;
    })();
    const fullpath = path.join(dir, `${filename}${ext}`);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    fs.writeFileSync(path.join(fullpath), result.data);

    return `${filename}${ext}`;
  } catch (error) {
    console.error(error);
    return false;
  }
}

doIt();
