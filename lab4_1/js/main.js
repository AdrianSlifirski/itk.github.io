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
		console.log('Success: Opened Database');
		db = e.target.result;
		
	}
	request.onerror = function(e){
		console.log('Error: Could Not Open Database');
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

function getCustomers()
{
	showCustomers();
}


function deleteCustomers(){
	indexedDB.deleteDatabase('customermanager');
	window.location.href="index.html";
}

function removeCustomer(id){
	var transaction = db.transaction(["customers"],"readwrite");
	var store = transaction.objectStore("customers");
	var request = store.delete(id);
	request.onsuccess = function(){
		console.log('customer '+id+' Deleted');
		$('.customer_'+id).remove();
	}
	request.onerror = function(e){
		console.log('Error', e.target.error.name);
	}
}

$('#customers').on('blur','.customer',function(){
	var newText = $(this).html();
	var field = $(this).data('field');
	var id = $(this).data('id');
	var transaction = db.transaction(["customers"],"readwrite");
	var store = transaction.objectStore("customers");
	var request = store.get(id);
	request.onsuccess = function(){
		var data = request.result;
		if(field == 'name'){
			data.name = newText;
		}
		else if(field == 'city'){
			data.city = newText;
		} 
		else if(field == 'adress'){
			data.adress = newText;
		}
		else if(field == 'email'){
			data.email = newText;
		}
		else if(field == 'postal_code'){
			data.postal_code = newText;
		}
		else if(field == 'nip_number'){
			data.nip_number = newText;
		}
		else if(field == 'id_card'){
			data.id_card = newText;
		}
		var requestUpdate = store.put(data);
		requestUpdate.onsuccess = function(){
			console.log('Customer field updated...');
		}
		requestUpdate.onerror = function(){
			console.log('Error: Customer field NOT updated...');
		}
	}
	request.onerror = function(e){
		console.log('Error test');
	}
});

function addCustomer(){
	var name = $('#name').val();
	var city = $('#city').val();
	var adress = $('#adress').val();
	var email = $('#email').val();
	var postal_code = $('#postal_code').val();
	var nip_number = $('#nip_number').val();
	var phone_number = $('#phone_number').val();
	var id_card = $('#id_card').val();
	var transaction = db.transaction(["customers"],"readwrite");
	var store = transaction.objectStore("customers");
	var customer = {
		name: name,
		city: city,
		adress: adress,
		email: email,
		postal_code: postal_code,
		nip_number: nip_number,
		phone_number: phone_number,
		id_card: id_card,
	}
	var request = store.add(customer);
	request.onsuccess = function(e){
		window.location.href="index.html";
	}
	request.onerror = function(e){
		console.log('Error the customer was not added', e.target.error.name);
	}
}

function GetRandom(){
	const bigAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var name1 = ["Adam","Adrian","Albert","Aleksander","Aleksy","Alfred","Amadeusz","Andrzej","Antoni","Arkadiusz"];
	var name2 = ["Nowak","Kowalski","Szczesny","Glik","Kowalczyk","Lewandowski","Zieliński","Kwiatkowski","Test","Test1","Test2","Test3","Test4"];
	var name = capFirst(name1[getRandomInt(0, name1.length + 1)]) + ' ' + capFirst(name2[getRandomInt(0, name2.length + 1)]);
	
	var City1 = ["Tessss","tEeeeee","Wrocław","Test","Pabianice","Gdynia","Poznań"];
	var City = capFirst(City1[getRandomInt(0, City1.length + 1)]);
	
	var adress1 = ["Teeeeeee","adsada","ssss","aaaaaaaaaaaaaa","cccccccccc","Tesssss","TEeeeeee","Aaaaaa"];
	var adress = capFirst(adress1[getRandomInt(0, City1.length + 1)]) + ' ' + getRandomIntInclusive(1, 222);
	
	var myElement1 = document.getElementById("name")
        myElement1.value = name;
	var myElement2 = document.getElementById("city")
        myElement2.value = City;
	var myElement3 = document.getElementById("adress")
        myElement3.value = adress;
	var myElement4 = document.getElementById("email")
        myElement4.value = Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5) + '@gmail.com';
	var myElement5 = document.getElementById("postal_code")
        myElement5.value = (Math.floor(Math.random() * 89 + 10) + '-' + Math.floor(Math.random() * 899 + 100)).toString();
	var myElement6 = document.getElementById("nip_number")
        myElement6.value = Math.floor(Math.random() * 899 + 100).toString() + '-' + Math.floor(Math.random() * 899 + 100).toString() + '-' + Math.floor(Math.random() * 89 + 10).toString() + '-' + Math.floor(Math.random() * 89 + 10).toString();
	var myElement7 = document.getElementById("phone_number")
        myElement7.value = Math.floor(Math.random() * 899 + 100).toString() + '-' + Math.floor(Math.random() * 899 + 100).toString() + '-' + Math.floor(Math.random() * 899 + 100).toString();
	var myElement8 = document.getElementById("id_card")
        myElement8.value = bigAlphabet[Math.floor(Math.random() * bigAlphabet.length)] + bigAlphabet[Math.floor(Math.random() * bigAlphabet.length)] + bigAlphabet[Math.floor(Math.random() * bigAlphabet.length)] + Math.floor(Math.random() * 899999 + 100000).toString();
}


function capFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getRandomInt(min, max) {
  	return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
