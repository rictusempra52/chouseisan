//ページを開いたときに最初に実行される処理-------------------------


//データの定義
/**出欠ステータスを管理する定数オブジェクト* 
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
getUserDataFromLocalStrage();


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
const headcount = user_data.length

// 今日の日付以前は選択できないようにする
set_minimum_date();
// addColumn("日程")

console.log("日程調整用ボタン挿入完了 table_html↓");
console.log(table_html);

// 表を出力
make_grid_on_history_area(tableheading, table_html);

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

function getUserDataFromLocalStrage() {
    const user_dataJSON = localStorage.getItem('userdata');
    if (user_dataJSON) {
        const user_dataArray = JSON.parse(user_dataJSON);
        user_data = user_dataArray.map((user) => new User(user.name, user.student_number, user.participation))

        console.log("ユーザーデータをローカルストレージから取得しました。");
        console.log(user_data);

    }
}