$(document).ready(function () {
    var user = window.localStorage.getItem("user");
    user = JSON.parse(user);
    $("#username").text(user.username);

    $("body").css({ "min-height": $(window).height() });
    $("#header").css({ "height": $(window).height() * 0.2 });
   
    
});


$(document).on("click", "#logout", function () {
    logout();
});

function checkLogin(data) {
               
    if (data != null) {
        window.location = "html/guardian_tab.html";
    } else {

        window.location = "html/landing_page.html";
    }
   
}

function logout() {
   
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: 'http://savebarkley.org/towels/application/index.php/helper/AppLogout',
        crossDomain: true,
        success: function (data, textStatus, jqXHR) {
            window.location = "landing_page.html";
            
        }, error: function (jqXHR, textStatus, errorThrown) {
            console.log('Ajax error on passing data');
        }
    });

}

function makeAjax(data , url , successCallBack) {
    var url = "http://savebarkley.org/Rafael-Oliveira/index.php" + url;
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: url,
        crossDomain: true,
        data : data,
        success: function (data, textStatus, jqXHR) {
            successCallBack(data);

        }, error: function (jqXHR, textStatus, errorThrown) {
            console.log('Ajax error on passing data');
        }
    });

}