'use strict';
//jyanken.js
(() => {
  let loseMyhands = [];//=>コンピュータが負けた配列を作成
  const hands = ['グー', 'チョキ', 'パー'];
  loseMyhands.push(hands);//=>コンピュータが負けたじゃんけんをコンピュータに記憶させる  
  const resultText = ['『あなたの勝ちです』', '『あなたの負けです』', '『あいこです』'];

  // 値を取得する
  const count = document.getElementById('gameCount');
  let countResult = count.innerHTML; 
  const rock = document.getElementById('rock');
  const scissors = document.getElementById('scissors');
  const paper = document.getElementById('paper');
  const myHandType = document.getElementById('myHand');
  const enemyHandType = document.getElementById('enemyHand');
  let result = document.getElementById('result');
  const reset = document.getElementById('reset');
  const winCount = document.getElementById('winCount');
  const loseCount = document.getElementById('loseCount');
  const winRate = document.getElementById('winRate');


  //試合数、勝ち数、負け数
  let gameCount = 0;
  let winResult = 0;
  let loseResult = 0;

  //試合数書き換え
  const gameCountReplace = (gameCount) => {              
    countResult = countResult.replace(countResult, gameCount);
    count.textContent = countResult;
  }

  const alert = (winResult, loseResult) => {
    if (winResult > loseResult) {
      window.alert('勝ち越しました！');
    } else if (winResult < loseResult) {
      window.alert('負け越しました！');
    } else {
      window.alert('引き分けでした！');
    }
  }

  //リセットボタン表示とreload()関数呼び出し
  const resetClick = () => {
    //ボタン要素作成
    const resetBtn = document.createElement('input');
    resetBtn.type = 'button';
    resetBtn.value = '更新';
    reset.appendChild(resetBtn); //親要素(reset)の子要素にボタンを配置する

    resetBtn.addEventListener('click', () => { //更新ボタンを押下後、画面リロードする
      location.reload(); 
    })
  }

  //10回到達したらボタンを非活性にする
  const inactive = () => {
    rock.disabled = true;
    scissors.disabled = true;
    paper.disabled = true;
  }

  //勝率計算
  const winRateCalc = (gameCount, winCount) => {
    const winRateResult = (winCount / gameCount) * 100;
    winRate.textContent = `${winRateResult}%`;
  }

  //ボタン押下関数
  const onClick = (event) => {
    const myHand = Number(event.target.value); //取得するvalue値はstring型のため、Number型に変換
    let enemyHand = Math.floor(Math.random() *  hands.length);

    myHandType.textContent = `自分の出した手：${hands[myHand]}`;        
    enemyHandType.textContent = `コンピュータの出した手：${hands[enemyHand]}`;        

    //勝敗判定
    let handResult = (myHand - enemyHand + 3) % hands.length;

    if (handResult === 2) {
      result.textContent = resultText[0];
      loseMyhands.push(hands[enemyHand]); // 負けた手を配列に追加
      gameCount++;
      winResult++;
      gameCountReplace(gameCount);

    } else if (handResult === 1) {
      result.textContent = resultText[1];
      gameCount++;
      loseResult++;
      gameCountReplace(gameCount);

    } else {
      result.textContent = resultText[2];
    }

    //勝敗判定ビジュアル.png
    document.getElementById("comJankenpon").src="img/jan" + enemyHand + ".png";//コンピュータの出した手の絵
    document.getElementById("myJankenpon").src="img/jan" + myHand + ".png";//自分が出した手の絵

    if (gameCount === 3) { //試合数が５回に到達したら実行される処理
      winCount.textContent = `${winResult}回`;
      loseCount.textContent = `${loseResult}回`;
      winRateCalc(gameCount, winResult);
      alert(winResult,loseResult)
      inactive();
      resetClick();
    }
  }

  // クリックした時の挙動はどのボタンも同じなので、関数を共通化
  rock.addEventListener('click', onClick);
  scissors.addEventListener('click', onClick);
  paper.addEventListener('click', onClick);

})();
//苦労した点
/*
1．じゃんけんゲームに自分とコンピュータの絵を合わせるところ
2．グー、チョキ、パーの文字列を数値型にして計算させた点
//工夫点
1.勝敗判定のプログラムにコンピュータが勝ったじゃんけんを変数に文字列で代入させた後
コンピュータの基本配列にpushさせて強くさせた点
2.試合数書き換えプログラムにゲーム数と勝敗数が文字列でも一致させるreplaceという
このプログラム期間では教わってないメソッドを使用して処理させた点 
//失敗した点
1．配列を文字列から数値型に変換させているので勝敗一致のプログラム
が複雑になり試合数がカウントされない時がありバグ修正が出来なかった点

以上を元にAIの橋掛けにして次回は改善したアプリを作成したいです！*/
// if (handResult === 2) {
//   result.textContent = resultText[0];
//   loseMyhands.push(hands[enemyHand]); // 負けた手を配列に追加
//   gameCount++;
//   winResult++;
//   gameCountReplace(gameCount);
// }
