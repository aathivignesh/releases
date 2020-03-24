var script = document.createElement('script');
script.src = '/jquery-3.3.1.js';
script.type = 'text/javascript';
var script = document.createElement('script1');
script.src = '/jquery.dataTables.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

var temp=1;
var issue = null;
var jsonobj = [];
$(document).ready(function(){
	

	 
	 enablebuttonforissue();
		
	$.ajax({
		url:"/getbugfixissue",
		dataType:"json",			
		success: function (data){	
			jsonobj = data;		
			for(var i = 0; i <= jsonobj.length-1; i++)
			{
				 var value = jsonobj[i];
	                var d = new Date(value.updatedAt);
	                var month1=(d.getMonth() + 1);
	              
	                var fulldate=month1+"/"+d.getDate()+"/"+d.getFullYear();
				    var record="<tr><td><input  type=\"checkbox\" id="+i+" onclick = {handleClick("+i+")}></td><td>"+value.id +"</td><td>" +value.isNo+ "</td><td>"+value.isDet+ "</td><td>" +value.status+ "</td><td>" +value.createdbyuser+ "</td><td>" +fulldate+ "</td></tr>";
				    $('#myTable1').append(record);
				    
				    
				}
			}
        });
	});

function handleClick (issueNum) {
	if(issue == issueNum) {
		issue = null
	} else {
		issue = issueNum
	}

	for(var i = 0; i <= jsonobj.length-1; i++)
		{
		if(issueNum !== i){
			console.log("check box",document.getElementById(i).checked)
			document.getElementById(i).checked = false;
		}
			
	}
	console.log("Array",issue);
}
function createissue() {

    var IsNo = document.getElementById("IsNoadd").value;
    var IsDet = document.getElementById("IsDet").value;
    var createdbyuser = document.getElementById("createdbyuser").value;
    var Status = document.getElementById("status").value;
    
 
    var request ={};
    request['isNo'] = IsNo;
    request['isDet'] = IsDet;
    request['createdbyuser'] = createdbyuser;
    request['status'] = Status;
    

    
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/issuesubmit",
        data: JSON.stringify(request),
        dataType: "json",
        cache: false,
        success: function(data) {
          console.log("Added successfully!!");           
          
          
        },

     });        
}

function updateissue(){
	
	if (issue==null)
		{
			alert("Please select atleast one row");
			location.reload();
		}
	else{
			curid=issue+1;
			
			var value = jsonobj[issue];
			document.getElementById("updateIsNo").value=value.isNo;
			document.getElementById("updateIsDet").value=value.isDet;
			document.getElementById("updatestatus").value=value.status;
		
			
	}
	
}
	
	
	function updateissuedb() {
	    
		
		var updatedid=issue+1;	
	
		var newIsNo = document.getElementById("updateIsNo").value;
	    var newIsDet = document.getElementById("updateIsDet").value;   
	    var newstatus = document.getElementById("updatestatus").value;
	    var newcreatedby = document.getElementById("updatecreatedbyuser").value;
	    
	    
	    
		var requestupdate ={};
		requestupdate['isNo'] = newIsNo;		
		requestupdate['isDet'] = newIsDet;
		requestupdate['status'] = newstatus;
		requestupdate['createdbyuser'] = newcreatedby; 
		console.log(requestupdate);
		
	 
		
	    $.ajax({
	        type: "PUT",
	        contentType: "application/json",
	        url: "/UpdateBugfixIssue/"+updatedid,
	        data: JSON.stringify(requestupdate),
	        dataType: "json",
	        cache: false,
	        success: function() {
	         alert("Added successfully!!");           
	          
	        },

	     });
	     
	    
	}
	function enablebuttonforissue(){    
	       
	    if (userflag==2)
	    {
	    	
	    	document.getElementById("addbutton").disabled = true;
	        document.getElementById("updatebutton").disabled = true;
	        
	    }    
	
		
		
	}

	    

function AddIssuenumber(){
		
		for(var i = 0; i <= jsonobj.length-1; i++){			
			
			if (i==jsonobj.length-1){
			var lastid = jsonobj[i].id;
			var newisnum=lastid+1;
		
			document.getElementById("IsNoadd").value="BugFix_"+newisnum; 
			
			}
			
			
			}
	
	if(jsonobj.length==0){
		document.getElementById("IsNoadd").value="BugFix_1";
	}
	if(jsonobj.length==1){
		document.getElementById("IsNoadd").value="BugFix_2";
	}
			

			
		}
