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
//				msg = "<p><b>" + results.rows.item(i).id + " " + results.rows.item(i).log + "</b></p>";
//				document.querySelector('#status').innerHTML +=  msg;
				var newDiv = document.createElement("div")
				
				newDiv.setAttribute('id', i);
				
				var a = document.createElement("p");
				var b = document.createElement("p");
			
				a.setAttribute('id', 'p1');
				b.setAttribute('id', 'p2');
			
				var t=document.createTextNode(results.rows.item(i).id);
				var q=document.createTextNode(results.rows.item(i).log);
				
				a.appendChild(t);
				b.appendChild(q);
			
				newDiv.appendChild(a);
				newDiv.appendChild(b);
				
				newDiv.style.backgroundColor = '#FB9B9B';
				$content = document.getElementById("status");
				$content.appendChild(newDiv);
			}
		}, null);
	});
}

function cleardata()
{
	document.querySelector('#status').innerHTML = "";
}