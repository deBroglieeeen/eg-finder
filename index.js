// モジュールのインポート
const server = require("express")();
const line = require("@line/bot-sdk"); // Messaging APIのSDKをインポート
// -----------------------------------------------------------------------------
// パラメータ設定
const line_config = {
    channelAccessToken: process.env.LINE_ACCESS_TOKEN,
    channelSecret: process.env.LINE_CHANNEL_SECRET
};

// -----------------------------------------------------------------------------
// Webサーバー設定
server.listen(process.env.PORT || 3000);

const bot = new line.Client(line_config);

// -----------------------------------------------------------------------------
let example_sentences = ""
// -----------------------------------------------------------------------------
import { stringify } from "querystring";
import { request } from "http";

var options = {
  "method": "POST",
  "hostname": [
    "sealang",
    "net"
  ],
  "path": [
    "pm",
    "bitext.pl"
  ],
  "headers": {
    "Content-Type": "application/x-www-form-urlencoded",
    "User-Agent": "PostmanRuntime/7.20.1",
    "Accept": "*/*",
    "Cache-Control": "no-cache",
    "Postman-Token": "4700a0e6-91ef-4e95-bc4a-7d39c275166b,0d57394c-ea9a-47c8-bb2c-acf39ce12303",
    "Host": "sealang.net",
    "Accept-Encoding": "gzip, deflate",
    "Content-Length": "129",
    "Connection": "keep-alive",
    "cache-control": "no-cache"
  }
};

var ce_request = request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
    example_sentences = body.toString()
  });
});

// -----------------------------------------------------------------------------
// ルーター設定
server.post('/bot/webhook', line.middleware(line_config), (req, res, next) => {
    res.sendStatus(200);
    console.log(req.body);

    let events_processed = [];
    req.body.events.forEach((event) => {
        // この処理の対象をイベントタイプがメッセージで、かつ、テキストタイプだった場合に限定。
        if (event.type == "message" && event.message.type == "text"){
            if (event.message.text == "ビルマ語？"){
                // replyMessage()で返信し、そのプロミスをevents_processedに追加。
                events_processed.push(bot.replyMessage(event.replyToken, {
                    type: "text",
                    text: "ビルマ語はミャンマーの旧名称でその地域で話されていることばです話者は5000万人ほどいます。"
                }));
            }
            // else{
            //     ce_request.write(stringify({ approx: 'W',
            //       bitectMatch: 'or',
            //       near: '10',
            //       return: 'html',
            //       seaLanguage: 'burmese',
            //       seaTarget: '',
            //       type: 'bitext',
            //       westernLanguage: 'english',
            //       westernTarget: event.message.text }));
            //     ce_request.end().then(()=>{
            //       console.log(example_sentences)
            //       events_processed.push(bot.replyMessage(event.replyToken,{
            //         type: "text",
            //         text: example_sentences
            //       }));
            //     });
            // }
        }
    });
    // すべてのイベント処理が終了したら何個のイベントが処理されたか出力。
    Promise.all(events_processed).then(
        (response) => {
            console.log(`${response.length} event(s) processed.`);
        }
    );
});

