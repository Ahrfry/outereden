$(document).ready(function () {
    
    var user = window.localStorage.getItem("user");
    user = JSON.parse(user);

    makeAjax({user_id: user.id }, "/event/GetEvents" , loadEvents);
    
});

function loadEvents(data) {
            
    var body_load = _.template($('#tmpl-events').text());
    $('#events').append(body_load({ data: data }));

}

$(document).on("click", "[data-go-to-mission]", function () {
    window.localStorage.setItem("current_mission", $(this).data("go-to-mission"));
   
    window.location = "mission_tab.html";
});
