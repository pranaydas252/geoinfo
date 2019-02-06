var countries = {
	names: []
};

$.ajax({
	url: "https://restcountries.eu/rest/v2/all",
	dataType: "json",

	success: function(data)
	{    
		for(var i in data) {    

		    var item = data[i];   

		    countries.names.push({ 
		        "name" : item.name,
		    });
		}
	},

	type: 'GET'
});


function fetchList()
{
	var text = document.getElementById('search').value.toUpperCase();
	var list = document.getElementById('list');
	list.innerHTML = "";
	if (text != "") 
	{
		list.style.display = "block";
		for (var i = 0; i <= countries.names.length - 1; i++) 
		{
			if (countries.names[i].name.toUpperCase().startsWith(text, 0)) 
			{
				list.innerHTML += "<li>"+countries.names[i].name+"</li>";
			}
		}
	}
	else
	{
		list.style.display = "none";
	}
}

function setval(e) {
    e = e || window.event;
    return e.target || e.srcElement; 
}

var list = document.getElementById('list');
list.onclick = function(event) {
    var target = setval(event);
    document.getElementById('search').value = target.innerHTML;
    document.getElementById('list').style.display = "none";
};

function search()
{
	var search = document.getElementById('search').value;
	document.getElementById('results').style.display = "block";
	var form = document.getElementById('myForm');
	document.getElementById('results').innerHTML = "";

	form.style.display = "none";

	$.ajax({
		url: "https://restcountries.eu/rest/v2/name/"+ search +"?fullText=true",
		dataType: "json",

		success: function(data)
		{    
			results.innerHTML += "<div class='overlay' style='background: url("+data[0].flag+"); background-size: cover; background-position: center center;'></div>"
			results.innerHTML += "<div class='head text-center col-lg-12'>Information about "+data[0].name+"</div>"
			results.innerHTML += "<div class='row col-lg-12 col-md-6'><div class='res-column col-lg-4 col-md-2'><div class='res-info'><span>Top Level Domain</span><br><span class='title'>"+data[0].topLevelDomain+"</span></div><div class='res-info'><span>Calling Code</span><br><span class='title'>+"+data[0].callingCodes+"</span></div><div class='res-info'><span>Capital City</span><br><span class='title'>"+data[0].capital+"</span></div></div><div class='res-column col-lg-4 col-md-2'><div class='res-info'><span>Region</span><br><span class='title'>"+data[0].subregion+"</span></div><div class='res-info'><span>Population</span><br><span class='title'>"+data[0].population+"</span></div><div class='res-info'><span>Timezones</span><br><span class='title'>"+data[0].timezones.length+"</span></div></div><div class='res-column col-lg-4 col-md-2'><div class='res-info'><span>Native Name</span><br><span class='title'>"+data[0].nativeName+"</span></div><div class='res-info'><span>Currency</span><br><span class='title'>"+data[0].currencies[0].symbol+" ("+data[0].currencies[0].code+")</span></div></div></div>"
		},

		type: 'GET'
	});
}

document.getElementById('button').addEventListener('click', search, false);

		