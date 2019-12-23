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
//var qs = require("querystring");
// var http = require("http");

// var options = {
//   "method": "POST",
//   // "hostname": [
//   //   "sealang",
//   //   "net"
//   // ],
//   "path": [
//     "pm",
//     "bitext.pl"
//   ],
//   "headers": {
//     "Content-Type": "application/x-www-form-urlencoded",
//     //"User-Agent": "PostmanRuntime/7.20.1",
//     "Accept": "*/*",
//     "Cache-Control": "no-cache",
//     //"Postman-Token": "4700a0e6-91ef-4e95-bc4a-7d39c275166b,0d57394c-ea9a-47c8-bb2c-acf39ce12303",
//     "Host": "sealang.net",
//     "Accept-Encoding": "gzip, deflate",
//     "Content-Length": "129",
//     "Connection": "keep-alive",
//     "cache-control": "no-cache"
//   }
// };

// var ce_request = http.request(options, function (res) {
//   var chunks = [];

//   res.on("data", function (chunk) {
//     chunks.push(chunk);
//   });

//   res.on("end", function () {
//     var body = Buffer.concat(chunks);
//     console.log(body.toString());
//     example_sentences = body.toString()
//   });
// });

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
                    text: "ビルマはミャンマーの旧名称で,myanmarで話されていることばです話者は5000万人ほどいます。"
                }));
            }
            else{
                // ce_request.write(qs.stringify({ approx: 'W',
                //   bitectMatch: 'or',
                //   near: '10',
                //   return: 'html',
                //   seaLanguage: 'burmese',
                //   seaTarget: '',
                //   type: 'bitext',
                //   westernLanguage: 'english',
                //   westernTarget: event.message.text }));
                // ce_request.end().then(()=>{
                //   console.log(example_sentences)
                //   events_processed.push(bot.replyMessage(event.replyToken,{
                //     type: "text",
                //     text: example_sentences
                //   }));
                // });
                   const request = require("request");
                   const rp = require("request-promise");
                   const { JSDOM } = require("jsdom");
                   const Iconv = require("iconv").Iconv;
                   const cheerio = require("cheerio")


                   var options = { method: 'POST',
                     url: 'http://sealang.net/pm/bitext.pl',
                     encoding: "utf-8",
                     qs:
                      { 'seaLanguage\t': 'burmese',
                        type: 'bitext',
                        westernLanguage: 'english',
                        westernTarget: event.message.text,
                        bitextMatch: 'or',
                        near: '10',
                        approx: 'W',
                        return: 'html',
                        seaTarget: '',
                        'seaLanguage%09': 'burmese' },
                     headers:
                      { 'cache-control': 'no-cache',
                        Connection: 'keep-alive',
                        'Content-Length': '129',
                        'Accept-Encoding': 'gzip, deflate',
                        Host: 'sealang.net',
                        'Postman-Token': '4700a0e6-91ef-4e95-bc4a-7d39c275166b,35576d36-b581-4000-98f3-64afcb7022ed',
                        'Cache-Control': 'no-cache',
                        Accept: '*/*',
                        'User-Agent': 'PostmanRuntime/7.20.1',
                        'Content-Type': 'application/x-www-form-urlencoded' },
                     form:
                      { approx: 'W',
                        bitectMatch: 'or',
                        near: '10',
                        return: 'html',
                        seaLanguage: 'burmese',
                        seaTarget: '',
                        type: 'bitext',
                        westernLanguage: 'english',
                        westernTarget: event.message.text } };

                   var options_2 = { method: 'POST',
                     url: 'http://sealang.net/pm/bitext.pl',
                     encoding: "utf-8",
                     qs:
                      { 'seaLanguage\t': 'burmese',
                        type: 'bitext',
                        westernLanguage: 'english',
                        westernTarget: event.message.text,
                        bitextMatch: 'or',
                        near: '10',
                        approx: 'W',
                        return: 'html',
                        seaTarget: '',
                        'seaLanguage%09': 'burmese' },
                     headers:
                      { 'cache-control': 'no-cache',
                        Connection: 'keep-alive',
                        'Content-Length': '129',
                        Host: 'sealang.net',
                        //'Postman-Token': '4700a0e6-91ef-4e95-bc4a-7d39c275166b,35576d36-b581-4000-98f3-64afcb7022ed',
                        //'Cache-Control': 'no-cache',
                        Accept: '*/*',
                        //'User-Agent': 'PostmanRuntime/7.20.1',
                        'Content-Type': 'application/x-www-form-urlencoded' },
                     form:
                      { approx: 'W',
                        bitectMatch: 'or',
                        near: '10',
                        return: 'html',
                        seaLanguage: 'burmese',
                        seaTarget: '',
                        type: 'bitext',
                        westernLanguage: 'english',
                        westernTarget: event.message.text } };

                  //  request(options, function (error, response, body) {
                  //    if (error) throw new Error(error);
                  //    try {
                  //     console.log(body)

                  //    } catch (error) {
                  //      console.error(error)
                  //    }
                  //    //console.log(body);
                  //  });
                  rp(options_2)
                    .then((body) => {
                      console.log(body)
                      const $ = cheerio.load(body)
                      const sentences = $("cell").children();
                      console.log(sentences);
                      console.log(typeof sentences);
                      for (let keys of Object.keys(sentences)){
                        console.log(key,sentences[key].text().trim());
                        events_processed.push(bot.replyMessage(event.replyToken, {
                            type: "text",
                            text: sentence[key].text().trim()
                        }));
                      }
                      //const sentence2 = $("cell").children().second().text().trim();

                  }).catch((err) => {
                    console.error(err)
                  });

            }
        }
    });
    // すべてのイベント処理が終了したら何個のイベントが処理されたか出力。
    Promise.all(events_processed).then(
        (response) => {
            console.log(`${response.length} event(s) processed.`);
        }
    );
});

