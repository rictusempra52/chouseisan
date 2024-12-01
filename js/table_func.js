
// 見出しとデータを与えると表を出力する関数
function make_grid_on_history_area(heading, data) {
    // すでに表があれば、削除してから新しく表を出力する
    console.log("表の削除開始");
    $(".history-area").empty()

    console.log("表の生成開始")
    grid = new gridjs.Grid({
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

/**
 * 表の中に日程変更用のボタンを挿入する関数
 * 
 * @function chousei_button
 * @param {string} name - ボタンの名前属性
 * @param {number} status - ボタンの初期状態を示す番号 (0: 未定, 1: 出席, 2: 欠席) 0,1,2 以外の場合は 0 ("未定") になります。
 * @returns {string} - 状態変更用ボタンのHTML要素を表す文字列 (gridjs の html ラッパーを使用)
 * 
 * @description
 * この関数は、指定された状態 (`status`) に基づいてボタンを生成します。
 * 状態は "未定", "出席", "欠席" の3種類があり、対応するラベルがボタンの `value` 属性として設定されます。
 * 生成されたボタンは grid.js の `html` メソッドを使用してテーブルに挿入することが想定されています。
 * 
 * @example
 * // 状態が "出席" のボタンを作成
 * const buttonHtml = chousei_button("attendance", 1);
 * // => <input type='button' id='btn1' name='attendance' value='出席' />
 */
function chousei_button(name, status) {
    // status が 0, 1, 2 以外の場合は 0 ("未定") にする
    if (![0, 1, 2].includes(status)) {
        status = 0;
    }

    const txt = ["未定", "出席", "欠席"]; // 各状態に対応するテキスト
    let tmp = "<input type='button' id='";
    tmp += max_btn_id++
    tmp += "' name='" + name
    tmp += "' value='" + txt[status] + "' />";
    return gridjs.html(tmp);
}

// 列を右端に追加する関数
/**
* @param {string} columnName - 新しく追加する列の名前
* @param {array} data - 新しい列に表示するデータ（各行ごとに値を設定する配列）
*/
function addColumnToRight(columnName, data) {
    console.log("表の更新");

    // 既存の列情報を取得し、新しい列名を追加
    const updatedColumns = [...grid.config.columns, columnName];

    // 既存の行データを取得し、それぞれの行に新しいデータを追加
    const updatedData = grid.config.data.map((row, index) => [...row, data[index]]);

    // 更新した列情報とデータを設定して再描画
    grid.updateConfig({
        columns: updatedColumns, // 更新した列名リスト
        data: updatedData,       // 更新したデータ
    }).forceRender(); // 更新した内容を画面に即座に反映
}