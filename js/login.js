
$(document).on("click", "#login-btn", function () {
    $("#login-modal").modal("show");
    
});

$(document).on("click", "#create-account-btn", function () {
    $("#create-account-modal").modal("show");

});

$(document).on("click", "#submit-login", function () {
    var username = $("#username").val();
    var pass = $("#password").val();
    makeAjax({ username: username, password: pass } , "/site/login" , successLogin);
});

$(document).on("click", "#submit-account", function () {
    var username = $("#c-username").val();
    var pass = $("#c-password").val();
    makeAjax({ username: username, password: pass }, "/User/Create", successCreateAccount);
});

function successCreateAccount(data) {
    if (data != null) {

        window.localStorage.setItem("user", JSON.stringify(data));

        window.location = "guardian_tab.html";
    } else {

        $("#login-error").empty().text(data.message).css("display", "inline");
    }


}



function successLogin(data){
    if (data != null) {
                
        window.localStorage.setItem("user", JSON.stringify(data.user));
          
        window.location = "guardian_tab.html";
    } else {
                
        $("#login-error").empty().text(data.message).css("display" , "inline");
    }
    

}

