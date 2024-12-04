
// slide1がclickされた時の処理
$('.slide-down').on('click', slide_up_or_down);
// 日程決定ボタンがclickされた時の処理
$('#add_date').click(() => add_date());
// 日程送信ボタンがclickされた時の処理
$('#submit').click(() => submit_nittei());
// grid.js中の日程入力ボタンがclickされた時の処理
// このbuttonは動的に作成されているので、onを使うそうです
$(document).on('click', '.gridjs-td input[type="button"]', function () {
    change_participation($(this).attr('id'), $(this).attr(''));
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

    //2. user_dataのparticipationプロパティ(配列)に、新しい列を追加
    user_data.map((user) => {
        user.push_participation(atnd.not_decided);
    })

    // 3. grid.jsの表を更新する
    addColumnToRight(
        selected_date,
        Array(table_html.length).fill(chousei_button("participation", atnd.not_decided))
    );
}

function submit_nittei() {

}

/** 
* user_dataの出欠情報を1つ進める
* 3を超えたら0(未定)に戻す
*/
function change_participation(id) {
    // console.log(id);
    // console.log(user_data[id]);

    // parti_○　の○部分を計算する
    const parti_num = Math.floor(id / user_data.length);
    const targetprop = 'parti_' + parti_num;

    console.log(id + ":id parti_num:" + parti_num);
    console.log(user_data);

    user_data[id][targetprop] = (user_data[id][targetprop]) % 3;

    $('[id="' + id + '"]').val(["未定", "出席", "欠席"][user_data[id][targetprop]]);
}

