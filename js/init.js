//ページを開いたときに最初に実行される処理-------------------------

//データの定義
/**
 * 出欠ステータスを管理する定数オブジェクト
 * 
 * @constant {Object} attendance - 出欠の状態を表す定数オブジェクト
 * @property {number} not_decided - 未定 (0)
 * @property {number} presence - 出席 (1)
 * @property {number} absence - 欠席 (2)
 */
const atnd = {
    not_decided: 0, // 未定
    presence: 1,    // 出席
    absence: 2,     // 欠席
};

const atnd_text = ["未定", "出席", "欠席"];

let tableheading = ["名前", "出席番号"];
// /**
//  * 学生の出欠データリスト
//  * 
//  * @type {Array<Object>} data - 学生ごとの出欠情報を保持する配列
//  * @property {string} name - 学生の名前
//  * @property {string} [stu_num] - 学生番号
//  * @property {number} parti_0 - 出欠の状態 (attendance 定数を使用)
//  */
// let user_data = [
//     {
//         name: "ゆき",
//         stu_num: "TW01",
//         parti_0: atnd.not_decided // 出欠: 未定
//     },
//     {
//         name: "きみしー",
//         stu_num: "TW02",
//         parti_0: atnd.not_decided // 出欠: 未定
//     },
//     {
//         name: "りょーすけ",
//         stu_num: "TW03",
//         parti_0: atnd.not_decided // 出欠: 未定
//     },
//     {
//         name: "なつき",
//         stu_num: "TW04",
//         parti_0: atnd.not_decided // 出欠: 未定
//     },
//     {
//         name: "ふみや",
//         stu_num: "TW05",
//         parti_0: atnd.not_decided // 出欠: 未定
//     },
//     {
//         name: "あべちゃん",
//         stu_num: "TW06",
//         parti_0: atnd.not_decided // 出欠: 未定
//     },
//     {
//         name: "かがやん",
//         stu_num: "TW07",
//         parti_0: atnd.not_decided // 出欠: 未定
//     },
//     {
//         name: "かっしー",
//         parti_0: atnd.not_decided // 出欠: 未定
//     },
//     {
//         name: "ひろし",
//         parti_0: atnd.not_decided // 出欠: 未定
//     },
//     {
//         name: "たろー",
//         parti_0: atnd.not_decided // 出欠: 未定
//     },
//     {
//         name: "かわたつ",
//         parti_0: atnd.not_decided // 出欠: 未定
//     },
//     {
//         name: "こすげ",
//         parti_0: atnd.not_decided // 出欠: 未定
//     },
//     {
//         name: "ほそかわ",
//         parti_0: atnd.not_decided // 出欠: 未定
//     },
//     {
//         name: "ぺんぎん",
//         parti_0: atnd.not_decided // 出欠: 未定
//     },
//     {
//         name: "らんこ",
//         parti_0: atnd.not_decided // 出欠: 未定
//     }
// ];

let user_data = [
    new User("ゆき", "TW01"),
    new User("きみしー", "TW02"),
    new User("りょーすけ", "TW03"),
    new User("なつき", "TW04"),
    new User("ふみや", "TW05"),
    new User("あべちゃん", "TW06"),
    new User("かがやん", "TW07"),
    new User("かっしー"),
    new User("ひろし"),
    new User("たろー"),
    new User("かわたつ"),
    new User("こすげ"),
    new User("ほそかわ"),
    new User("ぺんぎん"),
    new User("らんこ"),
];

// テーブルデータのうち、名前と出席番号をtable_htmlに格納
let table_html = user_data.map((user) => {
    return [
        user.name,
        user.student_number,
    ];
});

/**
 * 日程調整用ボタンのIDを管理する変数
 * IDをかぶらせてはいけないため、この変数で最大値を管理
 */
let max_btn_id = 0;
let grid;
/**
 *合計人数を表す定数
   */
const headcount = user_data.length

// 今日の日付以前は選択できないようにする
set_minimum_date();

console.log("日程調整用ボタン挿入完了 table_html↓");
console.log(table_html);

// 表を出力
make_grid_on_history_area(tableheading, table_html);

addColumnToRight(
    "出欠", user_data.map((row) => {
        return chousei_button("participation", row.participation);
    })
);

//以下、function定義-----------------------------
/**
 * 今日の日付以前は選択できないように設定する
 * @function set_minimum_date
 */
function set_minimum_date() {
    const today = new Date().toISOString().split('T')[0];
    $('input[type="date"]').attr('min', today);
    $('input[type="date"]').attr('value', today);
}

