// JavaScript Document
document.addEventListener("deviceready", onDeviceReady, false);

function SetData()
{
	var name = document.getElementById("name").value;	
	var age = document.getElementById("age").value;	
	var gender = document.getElementById("gender").value;
	
	window.localStorage.setItem("name", name);	
	window.localStorage.setItem("age", age);
	window.localStorage.setItem("gender", gender);
}

function onDeviceReady()
{
	var db = window.openDatabase("myTestDB", "1.0", "myDb", 1024 * 1024 * 500);	
	
	db.transaction(function(tx) 
	{
		tx.executeSql('CREATE TABLE ALARMS (name, age, gender)');
	});
}

function AddAlarms()
{
	var db = window.openDatabase("myTestDB", "1.0", "myDb", 1024 * 1024 * 500);
	
	var name = window.localStorage.getItem("name");	
	var age = window.localStorage.getItem("age");
	var gender = window.localStorage.getItem("gender");
		
	db.transaction(function(tx) 
	{
		tx.executeSql('INSERT INTO ALARMS (name, age, gender) VALUES (?, ?, ?)', [name, age, gender]);
	});
}