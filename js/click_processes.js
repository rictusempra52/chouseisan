
// slide1がclickされた時の処理
$('.slide-down').on('click', slide_up_or_down);
// 日程決定ボタンがclickされた時の処理
$('#add_date').click(() => add_date());
// 日程送信ボタンがclickされた時の処理
$('#submit').click(() => submit_nittei_LS());
// grid.js中の日程入力ボタンがclickされた時の処理
// このbuttonは動的に作成されているので、onを使わないといけないらしい
$(document).on('click', '.gridjs-td input[type="button"]', function () {
    const row = $(this).attr('data-row');
    const col = $(this).attr('data-column');
    {
        console.log('row:' + row);
        console.log('col:' + col);
    }
    change_participation(row, col);

});



function slide_up_or_down() {

    const slide_class = $(this).attr('class');
    const data_slide = $(this).attr('data-slide');


    if (slide_class.indexOf('active') !== -1) {
        $('div.' + data_slide).slideUp();
        $(this).removeClass('active');

        console.log("slideupされた");

    } else {
        $('div.' + data_slide).slideDown();
        $(this).addClass('active');
        console.log("slidedownされた");

    }

}

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
    user_data.map((user) => {
        user.saveToLocalStorageAsJSON(i++);
    })
}

/** user_dataの出欠情報を1つ進める 3を超えたら0(未定)に戻す*/
function change_participation(row, col) {
    // tableheadingには触らない

    // user_dataの出欠情報を1つ進める
    // 3を超えたら0(未定)に戻す　この操作は余りを利用
    console.log(user_data[row]);

    const currentStatus = user_data[row].participation[col];
    const newStatus = (currentStatus + 1) % 3;
    user_data[row].participation[col] = newStatus;

    // ボタンの表示を手動で更新
    $(`#btn${row}-${col}`).val(atnd_text[newStatus]);

}