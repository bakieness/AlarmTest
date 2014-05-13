var db = openDatabase('mytest', '1.0', 'Test DB', 2 * 1024 * 1024);
var msg;

if (window.localStorage.getItem("new") === null)
	{
		window.localStorage.setItem("new", "notnow");
		window.localStorage.setItem("i", 0);
	}

db.transaction(function (tx) {
  tx.executeSql('CREATE TABLE IF NOT EXISTS LOGS (id unique, log)');
});

function set()
{
	var _name = document.getElementById("name").value;
	window.localStorage.setItem("name", _name);
}

function add()
{
	var _name = window.localStorage.getItem("name");
	var i = window.localStorage.getItem("i");
	i++;
	window.localStorage.setItem("i", i);
	db.transaction(function (tx) {
		tx.executeSql('INSERT INTO LOGS (id, log) VALUES (?, ?)', [i, _name]);
		
	});
}

function show()
{
	db.transaction(function (tx) {
		tx.executeSql('SELECT * FROM LOGS', [], function (tx, results) {
			var len = results.rows.length, i;
			msg = "<p>Found rows: " + len + "</p>";
			document.querySelector('#status').innerHTML +=  msg;
			for (i = 0; i < len; i++){
				msg = "<p><b>" + results.rows.item(i).id + " " + results.rows.item(i).log + "</b></p>";
				document.querySelector('#status').innerHTML +=  msg;
			}
		}, null);
	});
}

function cleardata()
{
	document.querySelector('#status').innerHTML = "";
}