'use strict';
import * as vscode from 'vscode';
import * as child_process from 'child_process';
import * as path from 'path';
const { exec } = require('child_process');
var player = require('play-sound')();
const _basePath: string = path.join(__dirname, '..');

//大文字小文字判定
const isUpperCase = (c: string) => {
    return /^[A-Z]+$/g.test(c);
}

//seのpath宣言
const _coinAudio: string = path.join(_basePath, 'music', 'get.mp3');
const _jumpAudio: string = path.join(_basePath, 'music', 'jump.mp3');
const _kinokoAudio: string = path.join(_basePath, 'music', 'getKinoko.mp3');
const _fireAudio: string = path.join(_basePath, 'music', 'fire.mp3');
const _dokanAudio: string = path.join(_basePath, 'music', 'dokan.mp3');
const _fumuAudio: string = path.join(_basePath, 'music', 'fumu.mp3');

export function activate(context: vscode.ExtensionContext) {
    let activeEditor = vscode.window.activeTextEditor;
    vscode.workspace.onDidChangeTextDocument(event => {
        //テキストの変化の検知 
        if (activeEditor && event.document === activeEditor.document) {
            for (const change of event.contentChanges) {
                let pressedKey = change.text;

                switch (pressedKey) {
                    case '':
                        if(event.contentChanges[0].rangeLength === 1){
                            // バックスペースかデリートが押された時
                            player.play(_fireAudio);
                        } else {
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
                                if (isUpperCase(change.text) === false){
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

export function deactivate() {} 
