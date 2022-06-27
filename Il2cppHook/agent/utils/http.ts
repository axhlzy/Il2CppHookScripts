import { get, IncomingMessage, request, RequestOptions } from "http";

// http://v0.yiketianqi.com/api?unescape=1&version=v91&appid=43656176&appsecret=I42og6Lm&ext=&cityid=&city=%E5%B9%BF%E5%B7%9E
const httpGet = (url: string) => {
    if (!url.startsWith("http")) url = "http://" + url
    get(url, (res: IncomingMessage) => {
        res.setEncoding('utf8');
        res.on("data", (chunk) => LOGD(chunk))
    })
}

// const postData = JSON.stringify({
//     'key': 'value'
// })

// @notTest
const httpPost = (url: string, postData: any) => {
    if (!url.startsWith("http")) url = "http://" + url
    let req = request(url, {
        method: "POST",
        // port: 80,
        // path: '/upload',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData),
            'Content-Encoding': 'gzip'
        }
    }, (res: IncomingMessage) => {
        res.setEncoding('utf8');
        res.on("data", (chunk) => LOGD(chunk))
    })
    req.write(postData)
}

export { httpGet, httpPost }

declare global {
    var get: (url: string) => void
    var post: (url: string, postData: any) => void
}
globalThis.get = httpGet
globalThis.post = httpPost