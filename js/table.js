window.onload = (e) => {
    console.log("ページ読み込み完了")

    let tableheading = ["名前", "肩書", "出欠1"]
    let data = [
        ["ゆき", "TW01"],
        ["きみしー", "TW02"],
        ["りょーすけ", "TW03"],
        ["なつき", "TW04"],
        ["ふみや", "TW05"],
        ["あべちゃん", "TW06"],
        ["かがやん", "TW07"],
        ["かっしー", "副担任"],
        ["ひろし", "担任"],
        ["たろー", "講師"],
        ["かわたつ", "チューター"],
        ["こすげ", "チューター"],
        ["ぺんぎん", "チューター"],
        ["らんこ", "チューター"],
    ]
    // 合計人数を表す定数
    const headcount = data.length

    // すべての「出欠1」列にチェックボックスを挿入する
    for (let i = 0; i < headcount; i++) {
        data[i][2] = checkbox(i, "participation", false)
        console.log(i + "番目の☑を挿入");
    }

    // 合計人数を最下列に表示
    data.push(["合計人数：" + headcount, ""])

    // 表を出力する関数
    make_grid_on_history_area(tableheading, data);

    // 見出しとデータを与えて表を出力する関数
    function make_grid_on_history_area(heading, data) {
        console.log("表の生成開始")
        const grid = new gridjs.Grid({
            sort: true,
            columns: heading,
            data: data
        });

        //grid.renderの引数をjqueryで指定する場合には、.get(0)をつける(DOMそのものを指定する必要があるため)
        grid.render($(".history-area").get(0));
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
