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

function showCustomers(e){
	var transaction = db.transaction(["customers"],"readonly");
	var store = transaction.objectStore("customers");
	var index = store.index('name');
	var output = '';
	index.openCursor().onsuccess = function(e){
		var cursor = e.target.result;
		if(cursor){
			output += "<tr id='customer_"+cursor.value.id+"'>";
			output += "<td><span class='cursor customer' contenteditable='true' data-field='name' data-id='"+cursor.value.id+"'>"+cursor.value.name+"</span></td>";
			output += "<td><span class='cursor customer' contenteditable='true' data-field='city' data-id='"+cursor.value.id+"'>"+cursor.value.city+"</span></td>";
			output += "<td><span class='cursor customer' contenteditable='true' data-field='adress' data-id='"+cursor.value.id+"'>"+cursor.value.adress+"</span></td>";
			output += "<td><span class='cursor customer' contenteditable='true' data-field='email' data-id='"+cursor.value.id+"'>"+cursor.value.email+"</span></td>";
			output += "<td><span class='cursor customer' contenteditable='true' data-field='postal_code' data-id='"+cursor.value.id+"'>"+cursor.value.postal_code+"</span></td>";
			output += "<td><span class='cursor customer' contenteditable='true' data-field='nip_number' data-id='"+cursor.value.id+"'>"+cursor.value.nip_number+"</span></td>";
			output += "<td><span class='cursor customer' contenteditable='true' data-field='phone_number' data-id='"+cursor.value.id+"'>"+cursor.value.phone_number+"</span></td>";
			output += "<td><span class='cursor customer' contenteditable='true' data-field='id_card' data-id='"+cursor.value.id+"'>"+cursor.value.id_card+"</span></td>";
			output += "<td><a onclick='removeCustomer("+cursor.value.id+")' href=''>Delete</a></td>";
			output += "</tr>";
			cursor.continue();
		}
		$('#customers').html(output);
	}
}
function deleteCustomers(){
	indexedDB.deleteDatabase('customermanager');
	window.location.href="index.html";
}
