var script = document.createElement('script');
script.src = '/jquery-3.3.1.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);


var lastrow={};

// For loading table
$(document).ready(function(){

    
    enablebutton();
		$.ajax({
			url:"/release",
			dataType:"json",			
			success: function (data){	
				var jsonobj = data;		
				for(var i = 0; i <= jsonobj.length-1; i++)
				{
                    var value = jsonobj[i];
                    var d = new Date(value.updatedAt);
                    var month1=(d.getMonth() + 1);
                    
                    var fulldate=month1+"/"+d.getDate()+"/"+d.getFullYear();
				    var record="<tr><td>"+value.id +"</td><td>" +fulldate+ "</td><td>"+value.buildversion+ "</td><td>" +value.defects+ "</td><td>" +value.userstories+ "</td><td>" +value.svnversion+ "</td><td>" +value.lastupdatedby+ "</td></tr>";
				    $('#myTable').append(record);
				    
				    	
				  		if (i==jsonobj.length-1){
                              lastrow['id'] = value.id;
                              lastrow['Date']=value.createdAt;
				  			lastrow['buildversion'] = value.buildversion;
				  			lastrow['defects'] = value.defects;
				  			lastrow['userstories'] = value.userstories;
				  			lastrow['svnversion'] = value.svnversion;
				  			lastrow['lastupdatedby'] = value.lastupdatedby;
				  			console.log(lastrow);
				  		}				  		
					}
				}
			});
		
		});

// For Creating New Release 
function createrelease() {
    var buildversion = document.getElementById("buildversion").value;
    var defects = document.getElementById("defects").value;
    var userstories = document.getElementById("userstories").value;
    var svnversion = document.getElementById("svnversion").value;
    var lastupdatedby = document.getElementById("lastupdatedby").value;
    
    var request ={};
    request['buildversion'] = buildversion;
    request['defects'] = defects;
    request['userstories'] = userstories;
    request['svnversion'] = svnversion;
    request['lastupdatedby'] = lastupdatedby;
    
    
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/releasesubmit",
        data: JSON.stringify(request),
        dataType: "json",
        cache: false,
        success: function(data) {
          console.log("Added successfully!!");           
          location.reload();
          
        },

     });        
}
	
function loadrelease(){
	
	var logusername= document.getElementById("logusername").textContent;   
    if (logusername=="Aathi Vignesh Bose (ab8633@att.com)")
    {
        alert("Welcome Aathi!!");
        document.getElementById("updatesvnversion").readOnly = false;
        var x= document.getElementById("updatesvnversion").readOnly;
        console.log(x);
        
    }

    
	
    console.log("inside load release "+lastrow['defects']);
    var updateddefects=lastrow['defects'];
   	var updateduserstories=lastrow['userstories'];	
   	var updatesvnversion=lastrow['svnversion'];
	document.getElementById("updatedefects").value=updateddefects;
	document.getElementById("updateuserstories").value=updateduserstories;    
	document.getElementById("updatesvnversion").value=updatesvnversion;
	
	
}

function updaterelease() {
    

	var updatedid=parseInt(lastrow['id']);	
	var newdefects = document.getElementById("updatedefects").value;
    var newuserstories = document.getElementById("updateuserstories").value;   
    var newsvnversion = document.getElementById("updatesvnversion").value; 
    var newlastupdatedby = document.getElementById("updatelastupdatedby").value; 
    
	var requestupdate ={};    
	requestupdate['defects'] = newdefects;
	requestupdate['userstories'] = newuserstories;  
	requestupdate['svnversion'] = newsvnversion; 
	requestupdate['lastupdatedby'] = newlastupdatedby;
	
    $.ajax({
        type: "PUT",
        contentType: "application/json",
        url: "/updaterelease/"+updatedid,
        data: JSON.stringify(requestupdate),
        dataType: "json",
        cache: false,
        success: function(data) {
          console.log("Added successfully!!"); 
          
          location.reload();
          
        },

     });
     
}

function exportToExcel(tableID){
    var tab_text="<table border='2px'>";

    tab = document.getElementById(tableID); // id of table
    for(j = 0 ; j < tab.rows.length ; j++)
    {
        tab_text=tab_text;
        tab_text=tab_text+tab.rows[j].innerHTML.toUpperCase()+"</tr>";
        //tab_text=tab_text+"</tr>";
    }
    tab_text= tab_text+"</table>";
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer
    {
        txtArea1.document.open("txt/html","replace");
        txtArea1.document.write( 'sep=,\r\n' + tab_text);
        txtArea1.document.close();
        txtArea1.focus();
        sa=txtArea1.document.execCommand("SaveAs",true,"Download.txt");
    }
    else {
       sa = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(tab_text));
    }
    
    return (sa);
}

function enablebutton(){    
    var logusername= document.getElementById("logusername").textContent;   
    if (logusername=="Aathi Vignesh Bose")
    {
        alert("Welcome Aathi!!");
    }

    else{
        document.getElementById("addbutton").disabled = true;
    }


}
