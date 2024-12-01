
// slide1がclickされた時の処理
$('.slide-down').on('click', slide_up_or_down);
$('#add_date').click(() => add_date(Object.keys(user_data[0]).length));
$('#submit').click(() => submit_nittei());
// grid.js中の日程入力ボタンがclickされた時の処理
// このbuttonは動的に作成されているので、onを使うそうです
$(document).on('click', '.gridjs-td input[type="button"]', function () {
    change_participation($(this).attr('id'));
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

function add_date(column) {
    const selected_date = $('#chousei-nittei').val();
    tableheading[column] = selected_date
    $('.gridjs-th-content').eq(column).text(selected_date);
    console.log(selected_date);

    // 1. 新しい列の見出しを追加
    tableheading.push(selected_date);

    //2. user_dataの各要素にparti_○というプロパティを追加する(追加するときは存在しない名前を定義する)
    user_data.forEach((e) => {
        const tmp = 'parti_' + (column - 1)
        console.log(tmp);

        e[tmp] = atnd.not_decided

    });
    // console.log(user_data);
    // 3. grid.jsの表を更新する
    const table_html = user_data.map((row, index) => {
        return [
            row.name,
            row.stu_num,
            chousei_button(index, "participation", row['parti_' + (column - 1)])
        ];
    })

    make_grid_on_history_area(tableheading, table_html);
}

function submit_nittei() {

}

/** 
* user_dataの出欠情報を1つ進める
* 3を超えたら0(未定)に戻す
*/
function change_participation(id) {
    console.log(id);
    console.log(user_data[id]);

    user_data[id].parti_1 = (user_data[id].parti_1 + 1) % 3;
    $('[id="' + id + '"]').val(["未定", "出席", "欠席"][user_data[id].parti_1]);
}

