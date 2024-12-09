//データの定義

const atnd_text = ["未定", "出席", "欠席"];
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