
// slide1がclickされた時の処理
$('.slide-down').on('click', slide_up_or_down);
// 日程決定ボタンがclickされた時の処理
$('#add_date').click(() => add_date());
// 日程送信ボタンがclickされた時の処理
$('#submit').click(() => submit_nittei());
// grid.js中の日程入力ボタンがclickされた時の処理
// このbuttonは動的に作成されているので、onを使わないといけないらしい
$(document).on('click', '.gridjs-td input[type="button"]', function () {
    // ボタンのidを取得(idには文字が含まれるので、parseFloatを使って数値に変換する)
    // parseFloatは文字列を数値に変換する関数で、文字を無視する
    const button_id = parseFloat($(this).attr('id').replace(/[^0-9.]/g, ''));

    change_participation(button_id);
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

    // 新しい列を右端に追加するためのインデックスを計算
    const newColumnIndex = tableheading.length - 1;

    // 新しい見出しを追加
    tableheading.push(selected_date);

    // 見出しを更新
    const updatedcolumns = [...grid.config.columns]
    updatedcolumns.push(selected_date)
    grid.updateConfig({ colomns: updatedcolumns, }).forceRender()

    //user_dataのparticipationプロパティ(配列)に、新しい列を追加
    user_data.map((user) => {
        user.push_participation(atnd.not_decided);
    })

    // 追加された列をtable_htmlに追加

    // 3. grid.jsの表を更新する
    addColumnToRight(selected_date);
}

function submit_nittei() {

}

/** 
* user_dataの出欠情報を1つ進める
* 3を超えたら0(未定)に戻す
*/
function change_participation(btnid) {
    // // parti_○　の○部分を計算する
    // const parti_num = Math.floor(index / user_data.length);
    // const targetprop = 'parti_' + parti_num;

    // console.log(index + ":id parti_num:" + parti_num);
    // console.log(user_data);

    // user_data[index].participation[index]
    const btncolomn = calculate_column(btnid);


    // user_data[btnid][btncolomn] = (user_data[btnid][btncolomn]) % 3;

}


/**
 * ボタンのIDを入れると、何列目にあるかを返す関数
 * @param {number} btnid - ボタンのID
 * @returns {number} - 何列目にあるか
*/
function calculate_column(btnid) {
    // participationの配列の長さ(=現在の日程選択肢の数)を取得
    const colomns_per_row = user_data[0].participation.length;
    // btnidをcolomns_per_rowで割った余り(=クリックされたボタンが何列目にあるか)を取得
    const colomn_num = btnid % colomns_per_row;

    console.log('ボタンのid:' + btnid);
    console.log('1行あたりの列数:' + colomns_per_row);
    console.log('ボタンの列数:' + colomn_num);

    return colomn_num
}