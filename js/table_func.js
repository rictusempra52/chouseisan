
/**見出しとデータを与えると表を出力する関数*/
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

/** ボタンIDを再生成して正確に列を反映させる関数 
 * この関数は、ユーザーの参加状態に基づいてボタンを再生成し、
 * 表のデータを更新して、画面に反映させます。
 */
function render_buttons() {
    // 全ユーザーに対して処理
    user_data.forEach((user, rowIndex) => {
        // 各ユーザーの「参加状態」を管理している配列は「participation」プロパティ
        // 参加状態（0: 未定, 1: 出席, 2: 欠席）ごとに処理
        user.participation.forEach((status, colIndex) => {

            // ボタンを作成
            const buttonHTML = chousei_button(status, rowIndex, colIndex);
            // table_html 配列に、ボタンのHTMLを格納
            table_html[rowIndex][colIndex + 2] = buttonHTML;// +2は非ボタン列の分を考慮
            // log
            {
                console.log('ボタンを追加しました。');
                console.log('行:' + rowIndex);
                console.log('列:' + colIndex);
                console.log(buttonHTML);
            }
        });
    });

    // 表を再更新して画面に表示
    update_grid(tableheading, table_html);
}


/**表を更新する関数*/
function update_grid(heading, data) {
    console.log("表の更新開始");
    
    // 更新した列情報とデータを設定して再描画
    grid.updateConfig({
        columns: heading, // 更新した列名リスト
        data: data,       // 更新したデータ
    }).forceRender(); // 更新した内容を画面に即座に反映
}

/**表の中に日程変更用のボタンを挿入する関数 
 * @function chousei_button
 * @param {number} status - ボタンの初期状態を示す番号 (0: 未定, 1: 出席, 2: 欠席)
 * @param {number} row - ボタンが配置される行番号
 * @param {number} column - ボタンが配置される列番号
 * @returns {gridjs.html} - 状態変更用ボタンのHTML要素を表す文字列
 */
function chousei_button(status, row, column) {
    // status が 0, 1, 2 以外の場合は 0 ("未定") にする
    console.log("status:" + status);

    if (![0, 1, 2].includes(status)) { status = 0; }

    // ボタンHTMLを作成
    const btnhtml =
        `<input type='button' id='btn${row}-${column}' name='participation' value='${atnd_text[status]}' data-row='${row}' data-column='${column}' />`;
    rtrn = gridjs.html(btnhtml);
    console.log("htmlデータ:");
    console.log(rtrn);

    return rtrn;
}


/**列を右端に追加する関数
* @param {string} columnName - 新しく追加する列の名前
*/
function addColumnToRight(columnName) {
    for (let row = 0; row < table_html.length; row++) {
        // 列を追加し、ボタンに行・列番号を設定
        const newColumn = table_html[row].length - 2; // -2は非ボタン列の分を考慮
        table_html[row].push(chousei_button(atnd.not_decided, row, newColumn));
    }

    // 新しい列名を追加
    tableheading.push(columnName);

    // 表を更新
    update_grid(tableheading, table_html);
}
