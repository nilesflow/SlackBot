'use strict';

var slack = require('nodefw').slack;
var apigw = require('nodefw').aws.apigateway;

exports.handler = async (event) => {
    console.log(event);

    var s = new slack.Bot({
        channel_id: process.env.SLACK_NOTIFY_CHANNEL_ID,
        bot_token: process.env.SLACK_BOT_TOKEN,
        user_token: process.env.SLACK_USER_TOKEN,
        verify_token: process.env.SLACK_APP_VERIFY_TOKEN,
    });
    let body = await s.receiveEvent(event).catch(e => {
        // エラー応答
        if (e instanceof slack.error.SlackError) {
            // 自コードのエラー
            console.error('receiveEvent: '+ e.stack);
            // API Gatewayで解釈できる形に変換
            throw new apigw.ApiGatewayError(e.statusCode, e.name, e.message);
        }
        // それ以外のエラー
        throw new apigw.ApiGatewayError(500, "InternalError", e.message);
    });

    // 正常終了
    console.log(body);
    return body;
};
