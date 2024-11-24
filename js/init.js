
//最小の日付を今日にする関数
$(function () {

    // input[type="date"]のminとmaxを現在日時取得して指定
    var minD = new Date();// 現在日時取得
    //minDをYYYY-MM-DDに整形
    var min = minD.toISOString().split('T')[0];
    // min属性を設定
    $('input[type ="date"]').attr('min', min);

});