window.onload = (e) => {
console.log("ページ読み込み完了")

    let theading = ["名前", "出欠1"]
    let data = [
        ["John", "john@example.com"],
        ["Mark", "mark@example.com"],
        ["Eoin", "eoin@example.com"],
        ["Sarah", "sarahcdd@example.com"],
        ["Afshin", "afshin@example.com"]
    ]
    makegrid(theading, data)

    // 見出しとデータを与えて表を出力する関数
    function makegrid(heading, data) {
        console.log("表の生成開始")
        const grid = new gridjs.Grid({
            sort: true,
            columns: heading,
            data: data
        });

        //grid.renderの引数をjqueryで指定する場合には、.get(0)をつける(DOMそのものを指定する必要があるため)
        grid.render($(".history-area").get(0));
    }

}
