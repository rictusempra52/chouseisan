
// slide1がclickされた時の処理
$('.slide-down').on('click', slide_up_or_down);
$('#add_date').click(() => add_date());
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

    // // 見出しを更新
    const updatedcolumns = [...grid.config.columns]
    updatedcolumns[updatedcolumns.length - 1] = selected_date
    grid.updateConfig({ colomns: updatedcolumns, }).forceRender()

    //2. user_dataの各要素にparti_○というプロパティを追加する(追加するときは存在しない名前を定義する)
    user_data.forEach((e) => {
        const newprop = 'parti_' + newColumnIndex;
        console.log(newprop);
        e[newprop] = atnd.not_decided;

    });

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
    const parti_num = Math.floor(id / user_data.length) + 1;
    const targetprop = 'parti_' + parti_num;

    user_data[id][targetprop] = (user_data[id][targetprop]) % 3;

    console.log(user_data[id][targetprop]);
    console.log(id + ":id parti_num:" + parti_num);



    $('[id="' + id + '"]').val(["未定", "出席", "欠席"][user_data[id][targetprop]]);
}

