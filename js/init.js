
//最小の日付を今日にする関数
$(function () {

    // input[type="date"]のminとmaxを現在日時取得して指定
    // min (現在の3日後)
    var minD = new Date();// 現在日時取得

    var minYear = minD.getFullYear();// 上書きしたので、年月日それぞれ取得

    var minMonth = minD.getMonth() + 1;
    if (minMonth < 10) {// 2桁にしないといけないので 10未満なら頭に0を追加
        var minMonth = '0' + minMonth;
    }

    var minDate = minD.getDate();
    if (minDate < 10) {// 2桁にしないといけないので 10未満なら頭に0を追加
        var minDate = '0' + minDate;
    }

    // yyyy-mm-ddになるようにまとめる
    var min = minYear + '-' + minMonth + '-' + minDate;
    // min属性を設定
    $('input[type ="date"]').attr('min', min);

});