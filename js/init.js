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

/**テーブルデータ 
 * @type {string[][]} 
 * [名前, 出席番号, 出欠ボタン]
 * [名前, 出席番号, 出欠ボタン]…
 * の要領で格納されていく。そのままgridjsに突っ込めばよい状態
 */
let table_html = user_data.map((user) => {
    return [user.name, user.student_number,];
});

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

addColumnToRight("出欠");

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

