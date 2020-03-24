var script = document.createElement('script1');
script.src = '/jquery-3.3.1.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);



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