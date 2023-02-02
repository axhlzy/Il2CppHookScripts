import { randomUUID } from "crypto";
import { get, IncomingMessage, request, RequestOptions } from "http"

let key = "<your-translator-key>";
// let endpoint = "https://api.cognitive.microsofttranslator.com";
// let endpoint = "http://translate.googleapis.com/translate_a/single?client=gtx&dt=t&sl=en&tl=zh-CN&q=%22test%22"

// get(endpoint, (res: IncomingMessage) => {
//     res.setEncoding('utf8')
//     res.on("data", (chunk) => LOGD(chunk))
// })

// axios({
//     baseURL: endpoint,
//     url: '/translate',
//     method: 'post',
//     headers: {

//         'Ocp-Apim-Subscription-Key': key,
//         // location required if you're using a multi-service or regional (not global) resource.
//         'Ocp-Apim-Subscription-Region': location,
//         'Content-type': 'application/json',
//         'X-ClientTraceId': randomUUID()
//     },
//     params: {
//         'api-version': '3.0',
//         'from': 'en',
//         'to': ['fr', 'zu']
//     },
//     data: [{
//         'text': 'I would really like to drive your car around the block a few times!'
//     }],
//     responseType: 'json'
// }).then(function (response) {
//     console.log(JSON.stringify(response.data, null, 4));
// })