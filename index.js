"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const luxon = __importStar(require("luxon"));
const axios_1 = __importDefault(require("axios"));
const crypto_1 = __importDefault(require("crypto"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
async function doIt() {
    await waterfallScraping(grepImgSrc(fs_1.default.readFileSync(path_1.default.join(__dirname, 'raw.txt')).toString()));
}
async function waterfallScraping(urls) {
    const dir = path_1.default.join(__dirname, '/imgs');
    const result = Promise.resolve();
    await urls.reduce(async (promise, url) => {
        await promise;
        const res = await downloadImgAndSaving(dir, url);
        console.log(res);
    }, result);
}
function grepImgSrc(raw) {
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
async function downloadImgAndSaving(dir, url) {
    try {
        const now = luxon.DateTime.local().toMillis();
        const result = await axios_1.default.get(url, {
            responseType: 'arraybuffer',
        });
        if (result.status >= 400) {
            throw new Error(`GET ${url} return ${result.status}`);
        }
        // console.log(result.data);
        const filename = `${now}_${crypto_1.default.randomBytes(16).toString('hex')}`;
        const ext = (() => {
            const ext = result.headers['content-type'].split('/')[1];
            if (ext === 'jpeg') {
                return '.jpg';
            }
            return `.${ext}`;
        })();
        const fullpath = path_1.default.join(dir, `${filename}${ext}`);
        if (!fs_1.default.existsSync(dir)) {
            fs_1.default.mkdirSync(dir);
        }
        fs_1.default.writeFileSync(path_1.default.join(fullpath), result.data);
        return `${filename}${ext}`;
    }
    catch (error) {
        console.error(error);
        return false;
    }
}
doIt();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBK0I7QUFFL0Isa0RBQTBCO0FBQzFCLG9EQUE0QjtBQUM1Qiw0Q0FBb0I7QUFDcEIsZ0RBQXdCO0FBRXhCLEtBQUssVUFBVSxJQUFJO0lBQ2pCLE1BQU0saUJBQWlCLENBQ3JCLFVBQVUsQ0FBQyxZQUFFLENBQUMsWUFBWSxDQUFDLGNBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FDeEUsQ0FBQztBQUNKLENBQUM7QUFFRCxLQUFLLFVBQVUsaUJBQWlCLENBQUMsSUFBYztJQUM3QyxNQUFNLEdBQUcsR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMxQyxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDakMsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLEVBQUU7UUFDdkMsTUFBTSxPQUFPLENBQUM7UUFDZCxNQUFNLEdBQUcsR0FBRyxNQUFNLG9CQUFvQixDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNqRCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25CLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUNiLENBQUM7QUFFRCxTQUFTLFVBQVUsQ0FBQyxHQUFXO0lBQzdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLE9BQU8sR0FBRyxhQUFhLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQzVFLE1BQU0sTUFBTSxHQUFHLEdBQUc7U0FDZixLQUFLLENBQUMsSUFBSSxDQUFDO1NBQ1gsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLHVCQUF1QixDQUFDLEtBQUssSUFBSSxDQUFDO1NBQzVELEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ1osT0FBTyxJQUFJO2FBQ1IsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNsQixLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2IsT0FBTyxDQUFDLDBCQUEwQixFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQ3hELENBQUMsQ0FBQyxDQUFDO0lBRUwsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFFM0QsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQUVELEtBQUssVUFBVSxvQkFBb0IsQ0FDakMsR0FBVyxFQUNYLEdBQVc7SUFFWCxJQUFJO1FBQ0YsTUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUM5QyxNQUFNLE1BQU0sR0FBRyxNQUFNLGVBQUssQ0FBQyxHQUFHLENBQVMsR0FBRyxFQUFFO1lBQzFDLFlBQVksRUFBRSxhQUFhO1NBQzVCLENBQUMsQ0FBQztRQUVILElBQUksTUFBTSxDQUFDLE1BQU0sSUFBSSxHQUFHLEVBQUU7WUFDeEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLEdBQUcsV0FBVyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztTQUN2RDtRQUVELDRCQUE0QjtRQUM1QixNQUFNLFFBQVEsR0FBRyxHQUFHLEdBQUcsSUFBSSxnQkFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztRQUVwRSxNQUFNLEdBQUcsR0FBRyxDQUFDLEdBQUcsRUFBRTtZQUNoQixNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6RCxJQUFJLEdBQUcsS0FBSyxNQUFNLEVBQUU7Z0JBQ2xCLE9BQU8sTUFBTSxDQUFDO2FBQ2Y7WUFDRCxPQUFPLElBQUksR0FBRyxFQUFFLENBQUM7UUFDbkIsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNMLE1BQU0sUUFBUSxHQUFHLGNBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsUUFBUSxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFFckQsSUFBSSxDQUFDLFlBQUUsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDdkIsWUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNuQjtRQUVELFlBQUUsQ0FBQyxhQUFhLENBQUMsY0FBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFbkQsT0FBTyxHQUFHLFFBQVEsR0FBRyxHQUFHLEVBQUUsQ0FBQztLQUM1QjtJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ2QsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQixPQUFPLEtBQUssQ0FBQztLQUNkO0FBQ0gsQ0FBQztBQUVELElBQUksRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgbHV4b24gZnJvbSAnbHV4b24nO1xyXG5cclxuaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcclxuaW1wb3J0IGNyeXB0byBmcm9tICdjcnlwdG8nO1xyXG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xyXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGRvSXQoKSB7XHJcbiAgYXdhaXQgd2F0ZXJmYWxsU2NyYXBpbmcoXHJcbiAgICBncmVwSW1nU3JjKGZzLnJlYWRGaWxlU3luYyhwYXRoLmpvaW4oX19kaXJuYW1lLCAncmF3LnR4dCcpKS50b1N0cmluZygpKVxyXG4gICk7XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIHdhdGVyZmFsbFNjcmFwaW5nKHVybHM6IHN0cmluZ1tdKSB7XHJcbiAgY29uc3QgZGlyID0gcGF0aC5qb2luKF9fZGlybmFtZSwgJy9pbWdzJyk7XHJcbiAgY29uc3QgcmVzdWx0ID0gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgYXdhaXQgdXJscy5yZWR1Y2UoYXN5bmMgKHByb21pc2UsIHVybCkgPT4ge1xyXG4gICAgYXdhaXQgcHJvbWlzZTtcclxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGRvd25sb2FkSW1nQW5kU2F2aW5nKGRpciwgdXJsKTtcclxuICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgfSwgcmVzdWx0KTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ3JlcEltZ1NyYyhyYXc6IHN0cmluZykge1xyXG4gIGNvbnNvbGUubG9nKGBIVE1MIFByYXNlIFN0YXJ0LiB0eXBlOiAke3R5cGVvZiByYXd9LiBsZW5ndGg6ICR7cmF3Lmxlbmd0aH1gKTtcclxuICBjb25zdCBwYXJzZWQgPSByYXdcclxuICAgIC5zcGxpdCgnXFxuJylcclxuICAgIC5maWx0ZXIoKHJvdykgPT4gcm93Lm1hdGNoKCdqYXZhc2NyaXB0OnZpZXdEZXRhaWwnKSAhPT0gbnVsbClcclxuICAgIC5tYXAoKGl0ZW0pID0+IHtcclxuICAgICAgcmV0dXJuIGl0ZW1cclxuICAgICAgICAuc3BsaXQoJyBzcmM9XCInKVsxXVxyXG4gICAgICAgIC5zcGxpdCgnXCInKVswXVxyXG4gICAgICAgIC5yZXBsYWNlKCd3aWR0aD0yMzkmYW1wO2hlaWdodD0yMzknLCAnd2lkdGg9MTAwMDAnKTtcclxuICAgIH0pO1xyXG5cclxuICBjb25zb2xlLmxvZyhgSFRNTCBQcmFzZSBEb25lLiBsZW5ndGggaXMgJHtwYXJzZWQubGVuZ3RofWApO1xyXG5cclxuICByZXR1cm4gcGFyc2VkO1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBkb3dubG9hZEltZ0FuZFNhdmluZyhcclxuICBkaXI6IHN0cmluZyxcclxuICB1cmw6IHN0cmluZ1xyXG4pOiBQcm9taXNlPHN0cmluZyB8IGZhbHNlPiB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IG5vdyA9IGx1eG9uLkRhdGVUaW1lLmxvY2FsKCkudG9NaWxsaXMoKTtcclxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGF4aW9zLmdldDxCdWZmZXI+KHVybCwge1xyXG4gICAgICByZXNwb25zZVR5cGU6ICdhcnJheWJ1ZmZlcicsXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAocmVzdWx0LnN0YXR1cyA+PSA0MDApIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBHRVQgJHt1cmx9IHJldHVybiAke3Jlc3VsdC5zdGF0dXN9YCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY29uc29sZS5sb2cocmVzdWx0LmRhdGEpO1xyXG4gICAgY29uc3QgZmlsZW5hbWUgPSBgJHtub3d9XyR7Y3J5cHRvLnJhbmRvbUJ5dGVzKDE2KS50b1N0cmluZygnaGV4Jyl9YDtcclxuXHJcbiAgICBjb25zdCBleHQgPSAoKCkgPT4ge1xyXG4gICAgICBjb25zdCBleHQgPSByZXN1bHQuaGVhZGVyc1snY29udGVudC10eXBlJ10uc3BsaXQoJy8nKVsxXTtcclxuICAgICAgaWYgKGV4dCA9PT0gJ2pwZWcnKSB7XHJcbiAgICAgICAgcmV0dXJuICcuanBnJztcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gYC4ke2V4dH1gO1xyXG4gICAgfSkoKTtcclxuICAgIGNvbnN0IGZ1bGxwYXRoID0gcGF0aC5qb2luKGRpciwgYCR7ZmlsZW5hbWV9JHtleHR9YCk7XHJcblxyXG4gICAgaWYgKCFmcy5leGlzdHNTeW5jKGRpcikpIHtcclxuICAgICAgZnMubWtkaXJTeW5jKGRpcik7XHJcbiAgICB9XHJcblxyXG4gICAgZnMud3JpdGVGaWxlU3luYyhwYXRoLmpvaW4oZnVsbHBhdGgpLCByZXN1bHQuZGF0YSk7XHJcblxyXG4gICAgcmV0dXJuIGAke2ZpbGVuYW1lfSR7ZXh0fWA7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxufVxyXG5cclxuZG9JdCgpO1xyXG4iXX0=