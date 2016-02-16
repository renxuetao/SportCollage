window.onload = (function (){
    var doc = document.getElementsByClassName("navbar-brand");
    for(var i= 0;i < doc.length;i++) {
        doc[i].innerHTML = "<a class='sc' href='/'><font style = 'font-size: 25px;font-weight: bold;color: #333333;font-family: Cursive;'>Sport</font><font style = 'font-size: 25px;font-weight: bold;color:#009a61;font-family: Cursive;'>Collage</font></a>";
    }
});