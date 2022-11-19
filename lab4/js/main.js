$(document).ready(function(){
	var request = indexedDB.open('customermanager',1);
	
	request.onupgradeneeded = function(e){
		var db = e.target.result;
		
		if(!db.objectStoreNames.contains('customers')){
			var os = db.createObjectStore('customers',{keyPath: "id", autoIncrement:true});
			os.createIndex('name','name',{unique:false});
		}
	}
	request.onsuccess = function(e){
		console.log('Success: Opened Database...');
		db = e.target.result;
		showCustomers();
	}
	request.onerror = function(e){
		console.log('Error: Could Not Open Database...');
	}
});
