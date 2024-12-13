//ページを開いたときに最初に実行される処理-------------------------

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import {
    getFirestore,
    collection,
    doc,
    setDoc,
    getDocs,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Your web app's Firebase configuration
import { firebaseConfig } from "../ignore/apikey.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

//データの定義

let tableheading = ["名前", "出席番号"];

/**出欠ステータスを管理する定数オブジェクト*
 *
 * @constant {Object} attendance - 出欠の状態を表す定数オブジェクト
 * @property {number} not_decided - 未定 (0)
 * @property {number} presence - 出席 (1)
 * @property {number} absence - 欠席 (2)
 */
const atnd = {
    not_decided: 0, // 未定
    presence: 1, // 出席
    absence: 2, // 欠席
};

let user_data = [
    new User("ゆき", "TW01", [atnd.not_decided]),
    new User("きみしー", "TW02", [atnd.not_decided]),
    new User("りょーすけ", "TW03", [atnd.not_decided]),
    new User("なつき", "TW04", [atnd.not_decided]),
    new User("ふみや", "TW05", [atnd.not_decided]),
    new User("あべちゃん", "TW06", [atnd.not_decided]),
    new User("かがやん", "TW07", [atnd.not_decided]),
    new User("かっしー", "", [atnd.not_decided]),
    new User("ひろし", "", [atnd.not_decided]),
    new User("たろー", "", [atnd.not_decided]),
    new User("かわたつ", "", [atnd.not_decided]),
    new User("こすげ", "", [atnd.not_decided]),
    new User("ほそかわ", "", [atnd.not_decided]),
    new User("ぺんぎん", "", [atnd.not_decided]),
    new User("らんこ", "", [atnd.not_decided]),
];

getUserDataFromFB();
/**テーブルデータ
 * @type {string[][]}
 * [名前, 出席番号, 出欠ボタン]
 * [名前, 出席番号, 出欠ボタン]…
 * の要領で格納されていく。そのままgridjsに突っ込めばよい状態
 */
let table_html = user_data.map((user) => {
    return [user.name, user.student_number];
});
let grid;
/**合計人数を表す定数  */
const headcount = user_data.length;

// 今日の日付以前は選択できないようにする
set_minimum_date();

console.log("日程調整用ボタン挿入完了 table_html↓");
console.log(table_html);

// 表を出力
make_grid_on_history_area(tableheading, table_html);

//以下、イベントハンドラ-----------------------------

// 日程決定ボタンがclickされた時の処理
$("#add_date").click(() => add_date());

// 日程送信ボタンがclickされた時の処理
$("#submit").click(() => submit_nittei_FB());
// grid.js中の日程入力ボタンがclickされた時の処理
// このbuttonは動的に作成されているので、onを使わないといけないらしい
$(document).on("click", '.gridjs-td input[type="button"]', function () {
    const row = $(this).attr("data-row");
    const col = $(this).attr("data-column");
    {
        console.log("row:" + row);
        console.log("col:" + col);
    }
    change_participation(row, col);
});

//以下、function定義-----------------------------
/**
 * 今日の日付以前は選択できないように設定する
 * @function set_minimum_date
 */
function set_minimum_date() {
    const today = new Date().toISOString().split("T")[0];
    $('input[type="date"]').attr("min", today);
    $('input[type="date"]').attr("value", today);
}

function getUserDataFromLocalStrage() {
    const user_dataJSON = localStorage.getItem("userdata");
    if (user_dataJSON) {
        const user_dataArray = JSON.parse(user_dataJSON);
        user_data = user_dataArray.map(
            (user) =>
                new User(user.name, user.student_number, user.participation)
        );

        console.log("ユーザーデータをローカルストレージから取得しました。");
        console.log(user_data);
    }
}

// function getUserDataFromFB(snapshot) {
//   snapshot.docChanges().forEach((change) => {
//     console.log("新しいデータ: ", change.doc.data());
//     user_data[change.doc.data().id] = new User(
//       change.doc.data().username,
//       change.doc.data().student_number,
//       change.doc.data().participation
//     );
//   });
// }
async function getUserDataFromFB() {
    try {
        // Firestoreのデータを一度だけ取得
        const snapshot = await getDocs(collection(db, "chousei2"));
        const updatedUserData = {};

        snapshot.forEach((doc) => {
            const data = doc.data();
            updatedUserData[doc.id] = new User(
                data.username,
                data.student_number,
                data.participation
            );
        });

        // ローカルの user_data を更新
        user_data = updatedUserData;

        console.log(
            "Firestore からユーザーデータを取得しました: ",
            user_data
        );
    } catch (error) {
        console.error(
            "Firestore からのデータ取得中にエラーが発生しました: ",
            error
        );
    }
}

function submit_nittei_FB() {
    let i = 0;
    user_data.map((user) => {
        let docRef = doc(db, "chousei2", String(i++));
        let data = {
            username: user.name,
            student_number: user.student_number,
            participation: user.participation,
        };
        if (typeof data.student_number === "undefined") {
            data.student_number = "";
        }
        setDoc(docRef, data);
    });
}

// onSnapshot(collection(db, "chousei"), (snapshot) => {
//   getUserDataFromFB(snapshot);
// });



function add_date() {
    const selected_date = $('#chousei-nittei').val();

    // 新しい列を右端に追加
    tableheading.push(selected_date);
    console.log(user_data);

    // user_dataに新しい列を追加
    user_data.forEach((user) => {
        user.participation.push(atnd.not_decided); // 参加未定のデフォルト値を設定
    });

    // ボタンのIDを更新するための再レンダリング
    render_buttons();
}

function submit_nittei_LS() {
    let i = 0;
    let user_dataJSON = [];
    user_data.map((user) => { user_dataJSON[i++] = user.toJSON(); });
    user_dataJSON = "[" + user_dataJSON + "]";
    localStorage.setItem('userdata', user_dataJSON);
    console.log(user_dataJSON);
}

/** user_dataの出欠情報を1つ進める 3を超えたら0(未定)に戻す*/
function change_participation(row, col) {
    // tableheadingには触らない

    // user_dataの出欠情報を1つ進める
    // 3を超えたら0(未定)に戻す　この操作は余りを利
    const currentStatus = user_data[row].participation[col];
    const newStatus = (currentStatus + 1) % 3;
    user_data[row].participation[col] = newStatus;

    // ボタンのdata-participationを更新(更新すると表示が変わる)
    // dataでなくattrにしないとCSSの変更が反映されないらしい
    const button = $(`#btn${row}-${col}`);
    button.attr('data-participation', newStatus);

    // ボタンの表示を手動で更新
    button.val(atnd_text[newStatus]);

}