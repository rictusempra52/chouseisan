window.onload = (e) => {
    console.log("ページ読み込み完了")

    let theading = ["名前", "肩書", "出欠1"]
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
        ["らんこ", "チューター"],
        ["こすげ", "チューター"],
        ["かわたつ", "チューター"],
        ["ぺんぎん", "チューター"],
    ]

    // すべての「出欠1」列にチェックボックスを挿入する
    for (let i = 0; i < data.length; i++) {
        data[i].push(checkbox(i, false))
    }

    make_grid_on_history_area(theading, data)

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
    function checkbox(id, checked) {
        const tmp = "<input type='checkbox' id=" + id
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
