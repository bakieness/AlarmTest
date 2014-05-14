var db = openDatabase('newtestdb', '1.0', 'Test DB', 2 * 1024 * 1024);
var msg;

if (window.localStorage.getItem("test") === null)
	{
		window.localStorage.setItem("new", "notnow");
		window.localStorage.setItem("i", 0);
	}

//creates database table if it does not already exist
db.transaction(function (tx) {
  tx.executeSql('CREATE TABLE IF NOT EXISTS LOGS (id INTEGER PRIMARY KEY ASC, log, time)');
});

//sets localstrage to last user entered data
function set()
{
	var _name = document.getElementById("name").value;
	var _time = document.getElementById("time").value;
	window.localStorage.setItem("name", _name);
	window.localStorage.setItem("time", _time);
}

//adds user inputed data to database
function add()
{
	var _name = window.localStorage.getItem("name");
	var _time = window.localStorage.getItem("time");
	var i = window.localStorage.getItem("i");
	i++;
	window.localStorage.setItem("i", i);
	db.transaction(function (tx) {
		tx.executeSql('INSERT INTO LOGS (id, log, time) VALUES (?, ?, ?)', [i, _name, _time]);
		
	});
}

//gets data from database and displays on screen
function show()
{
	db.transaction(function (tx) {
		tx.executeSql('SELECT * FROM LOGS', [], function (tx, results) {
			var len = results.rows.length, i;
			msg = "<p>Found rows: " + len + "</p>";
			document.querySelector('#status').innerHTML +=  msg;
			for (i = 0; i < len; i++){

				var newDiv = document.createElement("div")
				
				newDiv.setAttribute('id', i);
				newDiv.setAttribute('onClick', 'window.location = "index.html#details"; setid(this)');
								
				var a = document.createElement("p");
				var b = document.createElement("p");
				
				a.setAttribute('id', 'p1');
				b.setAttribute('id', 'p2');
			
				var t=document.createTextNode(results.rows.item(i).id);
				var q=document.createTextNode(" " + results.rows.item(i).log);
				var u=document.createTextNode(results.rows.item(i).time);
				
				a.appendChild(q);
				b.appendChild(u);
			
				newDiv.appendChild(t);
				newDiv.appendChild(a);
				newDiv.appendChild(b);
				
				newDiv.style.backgroundColor = '#FB9B9B';
				$content = document.getElementById("status");
				$content.appendChild(newDiv);
			}
		}, null);
	});
}

//clears data results from screen
function cleardata()
{
	document.querySelector('#status').innerHTML = "";
}

//deletes data from database
function deletedata()
{
	var id = window.localStorage.getItem("dataid");
	alert(id);
	if (db) {
	db.transaction(function (tx) {
		//t.executeSql("DELETE FROM cars WHERE id=?", [id]
		tx.executeSql("DELETE * FROM LOGS WHERE id = ?", [id]);
		});
	}
}

//gets the database id value from the div tag clicked
function setid(div)
{
	$(document.body).click(function(evt){
		var clicked = evt.target; 
		var currentID = clicked.id;
		var text = $.trim($('#' + currentID).text()),
    	word = text.split(' ');
    	dataid = word[0]
		window.localStorage.setItem("dataid", dataid);
		})
	
}