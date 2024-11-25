
//データの定義
let tableheading = ["名前", "出席番号", "出欠1"]
let data = [
    ["ゆき", "TW01"],
    ["きみしー", "TW02"],
    ["りょーすけ", "TW03"],
    ["なつき", "TW04"],
    ["ふみや", "TW05"],
    ["あべちゃん", "TW06"],
    ["かがやん", "TW07"],
    ["かっしー",],
    ["ひろし",],
    ["たろー",],
    ["かわたつ",],
    ["こすげ",],
    ["ほそかわ"],
    ["ぺんぎん",],
    ["らんこ",],
]
// 合計人数を表す定数
const headcount = data.length

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
        data[i][2] = checkbox(i, "participation", false)
    } console.log("☑を挿入完了");


    // 合計人数を最下列に表示
    data.push(["合計人数：" + headcount, ""])

    // 表を出力
    make_grid_on_history_area(tableheading, data);

    // 見出しとデータを与えると表を出   力する関数
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
