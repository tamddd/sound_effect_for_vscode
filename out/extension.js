'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const path = require("path");
const { exec } = require('child_process');
var player = require('play-sound')();
const _basePath = path.join(__dirname, '..');
//大文字小文字判定
const isUpperCase = (c) => {
    return /^[A-Z]+$/g.test(c);
};
//seのpath宣言
const _coinAudio = path.join(_basePath, 'music', 'get.mp3');
const _jumpAudio = path.join(_basePath, 'music', 'jump.mp3');
const _kinokoAudio = path.join(_basePath, 'music', 'getKinoko.mp3');
const _fireAudio = path.join(_basePath, 'music', 'fire.mp3');
const _dokanAudio = path.join(_basePath, 'music', 'dokan.mp3');
const _fumuAudio = path.join(_basePath, 'music', 'fumu.mp3');
function ja2Bit(str) {
    return (str.match(/^[\u30a0-\u30ff\u3040-\u309f\u3005-\u3006\u30e0-\u9fcf]+$/)) ? true : false;
}
function activate(context) {
    let activeEditor = vscode.window.activeTextEditor;
    vscode.workspace.onDidChangeTextDocument(event => {
        //テキストの変化の検知 
        if (activeEditor && event.document === activeEditor.document) {
            for (const change of event.contentChanges) {
                let pressedKey = change.text;
                switch (pressedKey) {
                    case '':
                        if (event.contentChanges[0].rangeLength === 1) {
                            // バックスペースかデリートが押された時
                            player.play(_fireAudio);
                        }
                        else {
                            // テキストカットの時
                            player.play(_dokanAudio);
                        }
                        break;
                    case ' ':
                        // スペースが押された時
                        player.play(_fumuAudio);
                        break;
                    case '\n':
                        //改行が押された時
                        player.play(_jumpAudio);
                        break;
                    default:
                        let textLength = pressedKey.trim().length;
                        switch (textLength) {
                            case 0:
                                // エンターが押されたとき
                                player.play(_fumuAudio);
                                break;
                            case 1:
                                //文字の大小で別のサウンドを鳴らす
                                if (isUpperCase(change.text) === false) {
                                    player.play(_coinAudio);
                                }
                                else {
                                    player.play(_kinokoAudio);
                                }
                                break;
                            default:
                                player.play(_dokanAudio);
                        }
                        break;
                }
            }
        }
    }, null, context.subscriptions);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map