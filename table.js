const grid = new gridjs.Grid({
    columns: ['Name', 'Email'],
    data: [
        ["John", "john@example.com"],
        ["Mark", "mark@example.com"],
        ["Eoin", "eoin@example.com"],
        ["Sarah", "sarahcdd@example.com"],
        ["Afshin", "afshin@example.com"]
    ]
});

//grid.renderの引数をjqueryで指定する場合には、.get(0)をつける(DOMそのものを指定する必要があるため)
grid.render($(".history-area").get(0));