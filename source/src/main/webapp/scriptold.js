var script = document.createElement('script');
script.src = '/jquery-3.3.1.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);


var lastrow={};

// For loading table
$(document).ready(function(){

      

		$.ajax({
			url:"/oldrelease",
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

	
function loadrelease(){
    console.log("inside load release "+lastrow['defects']);
    var updateddefects=lastrow['defects'];
   	var updateduserstories=lastrow['userstories'];	
	document.getElementById("updatedefects").value=updateddefects;
	document.getElementById("updateuserstories").value=updateduserstories;    
    
	
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




