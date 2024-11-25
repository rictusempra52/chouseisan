
/*--------------------------------------------------------------
	
    Script Name : click-process
    Author      : FIRSTSTEP - Motohiro Tani
    Author URL  : https://www.1-firststep.com
    Create Date : 2018/10/28
    Version     : 1.0
    Last Update : 2018/10/28
	
--------------------------------------------------------------*/


// slide1がclickされた時の処理
$('.slide-down').on('click', slide_up_or_down);
$('#submit_date').click(() => submit_date(2));
$('#submit').click(() => submit_nittei());


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

function submit_date(column) {
    const selected_date = $('#chousei-nittei').val();
    tableheading[column] = selected_date
    $('.gridjs-th-content').eq(column).text(selected_date);
    console.log(selected_date);
}

function submit_nittei() {
    const sanka = $('input[type="checkbox"][name="participation"]')
        .map(function () {
            return {
                checked: $(this).prop('checked')
            }; // 各要素の値(value)を配列にする

        }).get();
    console.log(sanka);
    
}