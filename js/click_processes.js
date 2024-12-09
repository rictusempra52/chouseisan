

function add_date() {
    const selected_date = $('#chousei-nittei').val();

    // 新しい列を右端に追加
    tableheading.push(selected_date);

    // user_dataに新しい列を追加
    user_data.forEach((user) => {
        user.participation.push(atnd.not_decided); // 参加未定のデフォルト値を設定
    });

    // ボタンのIDを更新するための再レンダリング
    render_buttons();
}

function submit_nittei_LS() {
    let i = 0;
    let user_dataJSON = [];
    user_data.map((user) => { user_dataJSON[i++] = user.toJSON(); });
    user_dataJSON = "[" + user_dataJSON + "]";
    localStorage.setItem('userdata', user_dataJSON);
    console.log(user_dataJSON);
}

/** user_dataの出欠情報を1つ進める 3を超えたら0(未定)に戻す*/
function change_participation(row, col) {
    // tableheadingには触らない

    // user_dataの出欠情報を1つ進める
    // 3を超えたら0(未定)に戻す　この操作は余りを利
    const currentStatus = user_data[row].participation[col];
    const newStatus = (currentStatus + 1) % 3;
    user_data[row].participation[col] = newStatus;

    // ボタンのdata-participationを更新(更新すると表示が変わる)
    // dataでなくattrにしないとCSSの変更が反映されないらしい
    const button = $(`#btn${row}-${col}`);
    button.attr('data-participation', newStatus);

    // ボタンの表示を手動で更新
    button.val(atnd_text[newStatus]);

}