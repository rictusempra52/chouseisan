
//データの定義
/**
 * 出欠ステータスを管理する定数オブジェクト
 * 
 * @constant {Object} attendance - 出欠の状態を表す定数オブジェクト
 * @property {number} not_decided - 未定 (0)
 * @property {number} presence - 出席 (1)
 * @property {number} absence - 欠席 (2)
 */
const attendance = {
    not_decided: 0, // 未定
    presence: 1,    // 出席
    absence: 2,     // 欠席
};

// let tableheading = ["名前", "出席番号", "出欠1"]
/**
 * 学生の出欠データリスト
 * 
 * @type {Array<Object>} data - 学生ごとの出欠情報を保持する配列
 * @property {string} name - 学生の名前
 * @property {string} [stu_num] - 学生番号
 * @property {number} parti_1 - 出欠の状態 (attendance 定数を使用)
 */
let member_data = [
    {
        name: "ゆき",
        stu_num: "TW01",
        parti_1: attendance.not_decided // 出欠: 未定
    },
    {
        name: "きみしー",
        stu_num: "TW02",
        parti_1: attendance.not_decided // 出欠: 未定
    },
    {
        name: "りょーすけ",
        stu_num: "TW03",
        parti_1: attendance.not_decided // 出欠: 未定
    },
    {
        name: "なつき",
        stu_num: "TW04",
        parti_1: attendance.not_decided // 出欠: 未定
    },
    {
        name: "ふみや",
        stu_num: "TW05",
        parti_1: attendance.not_decided // 出欠: 未定
    },
    {
        name: "あべちゃん",
        stu_num: "TW06",
        parti_1: attendance.not_decided // 出欠: 未定
    },
    {
        name: "かがやん",
        stu_num: "TW07",
        parti_1: attendance.not_decided // 出欠: 未定
    },
    {
        name: "かっしー",
        parti_1: attendance.not_decided // 出欠: 未定
    },
    {
        name: "ひろし",
        parti_1: attendance.not_decided // 出欠: 未定
    },
    {
        name: "たろー",
        parti_1: attendance.not_decided // 出欠: 未定
    },
    {
        name: "かわたつ",
        parti_1: attendance.not_decided // 出欠: 未定
    },
    {
        name: "こすげ",
        parti_1: attendance.not_decided // 出欠: 未定
    },
    {
        name: "ほそかわ",
        parti_1: attendance.not_decided // 出欠: 未定
    },
    {
        name: "ぺんぎん",
        parti_1: attendance.not_decided // 出欠: 未定
    },
    {
        name: "らんこ",
        parti_1: attendance.not_decided // 出欠: 未定
    }
];


/**
 *合計人数を表す定数
   */
const headcount = member_data.length

// input[type="date"]のminとmaxを現在日時取得して指定
//今日の日付をYYYY-MM-DDに整形
const today = new Date().toISOString().split('T')[0];
// min属性を設定
$('input[type ="date"]').attr('min', today);
$('input[type ="date"]').attr('value', today);
console.log(today + "を初期値に設定");


window.onload = (e) => {
    console.log("ページ読み込み完了")

    // すべての「出欠1」列にチェックボックスを挿入する
    for (let i = 0; i < headcount; i++) {
        member_data[i][2] = checkbox(i, "participation", false)
    } console.log("☑を挿入完了");


    // 合計人数を最下列に表示
    member_data.push(["合計人数：" + headcount, ""])

    // 表を出力
    make_grid_on_history_area(tableheading, member_data);

    // 見出しとデータを与えると表を出力する関数
    function make_grid_on_history_area(heading, data) {
        console.log("表の生成開始")
        const grid = new gridjs.Grid({
            width: '100%',
            sort: true,
            search: true,
            columns: heading,
            data: data
        });

        //grid.renderの引数をjqueryで指定する場合には、.get(0)をつける(DOMそのものを指定する必要があるため)
        grid.render($(".history-area").get(0));
        console.log("表の出力完了");

    }

    // 表の中にチェックボックスを挿入する関数
    function checkbox(id, name, checked) {
        const tmp = "<input type='checkbox' id=" + id + " name=" + name
        switch (checked) {
            case true:
                return gridjs.html(tmp + " checked />");
                break;

            default:
                return gridjs.html(tmp + " />");
                break;
        }
    }

}
