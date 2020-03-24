var script = document.createElement('script');
script.src = '/jquery-3.3.1.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);


var lastrow={};

// For loading table
$(document).ready(function(){

        enablebutton();


		$.ajax({
			url:"/prodrelease",
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
				    $('#Bugfixtable').append(record);
				    
				    	
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


function createprodrelease() {
    var buildversion = document.getElementById("prodbuildversion").value;
    var defects = document.getElementById("proddefects").value;
    var userstories = document.getElementById("produserstories").value;
    var svnversion = document.getElementById("prodsvnversion").value;
    var lastupdatedby = document.getElementById("prodlastupdatedby").value;
    
    var request ={};
    request['buildversion'] = buildversion;
    request['defects'] = defects;
    request['userstories'] = userstories;
    request['svnversion'] = svnversion;
    request['lastupdatedby'] = lastupdatedby;
    
    
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/prodreleasesubmit",
        data: JSON.stringify(request),
        dataType: "json",
        cache: false,
        success: function(data) {
          console.log("Added successfully!!");           
         location.reload();
          
        },

     });        
}



function loadprodrelease(){
	
	var logusername= document.getElementById("logusername").textContent;   
    if (logusername=="Aathi Vignesh Bose")
    {
        alert("Welcome Aathi!!");
        document.getElementById("updateprodsvnversion").readOnly = false;
        var x= document.getElementById("updateprodsvnversion").readOnly;
        console.log(x);
        
    }
    
    console.log("inside load release "+lastrow['defects']);
    var updateddefects=lastrow['defects'];
   	var updateduserstories=lastrow['userstories'];	
   	var updatesvnversion=lastrow['svnversion'];
   	
	document.getElementById("updateproddefects").value=updateddefects;
	document.getElementById("updateproduserstories").value=updateduserstories;    
	document.getElementById("updateprodsvnversion").value=updatesvnversion;
	
	
}

function updateprodrelease() {
    

	var updatedid=parseInt(lastrow['id']);	
	var newdefects = document.getElementById("updateproddefects").value;
    var newuserstories = document.getElementById("updateproduserstories").value;   
    var newsvnversion = document.getElementById("updateprodsvnversion").value; 
    var newlastupdatedby = document.getElementById("updateprodlastupdatedby").value; 
    
	var requestupdate ={};    
	requestupdate['defects'] = newdefects;
	requestupdate['userstories'] = newuserstories;  
	requestupdate['svnversion'] = newsvnversion; 
	requestupdate['lastupdatedby'] = newlastupdatedby;
	
    $.ajax({
        type: "PUT",
        contentType: "application/json",
        url: "/produpdaterelease/"+updatedid,
        data: JSON.stringify(requestupdate),
        dataType: "json",
        cache: false,
        success: function(data) {
          console.log("Added successfully!!"); 
          location.reload();
          
        },

     });
     
}

