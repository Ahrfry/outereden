$(document).ready(function () {
    var mission_id = window.localStorage.getItem("current_mission");
    makeAjax({ mission_id, mission_id }, "/mission/GetMission", getMissionContent);
    $("#dump-requirements").css({ "height": $(window).height() * 0.8 });

    
    //$("#header").css({ "height": $(window).height() * 0.2 });
    
});


$(document).on("click", "[data-control]", function () {
    var goTo = $("#dump-requirements").data("current-window") + $(this).data("value");

    //console.log("go to "+ goTo , "size " +$("#dump-requirements").data("length") , "current " +($("#dump-requirements").data("current-window")));

    $("#dump-requirements").data("current-window", goTo);

    if (goTo == 0) {
        $("[data-control=back]").prop("disabled", true);
    } else {
        $("[data-control=back]").prop("disabled", false);
    }

    $("[data-control=next]").prop("disabled", true);
    
    $("[data-window]").removeClass("show").addClass("hide");
    $("[data-window=" + goTo + "]").addClass("show");
    $(".requirement-row").css({ "height": $(window).height() * 0.8 });
});

$(document).on("click", "[data-options]", function () {
    var parent = $(this).closest("[data-window]");
    parent.children().removeClass("selected");
    $(this).addClass("selected");

    console.log($("#dump-requirements").data("length") , ($("#dump-requirements").data("current-window")) +2);

    if ($("#dump-requirements").data("length") == ($("#dump-requirements").data("current-window") + 1)) {

        $("#submit-requirements").prop("disabled", false);
        $("[data-control=next]").prop("disabled", true);
    } else {
        $("#submit-requirements").prop("disabled", true);
        $("[data-control=next]").prop("disabled", false);
    }
});


$(document).on("click", "#submit-requirements", function () {
    //console.log($("[data-window]"));
    var data = $("[data-window]");
    var load = [];
    load["items"] = [];
    var correct = "correct-answer";
    var message = "Parabéns, você conseguiu!";
    
    _.each(data, function (item, i) {
        
        var requirement_answer = $(item).data("answer");
        var user_answered = $(item).find(".selected").data("options");
        var requirement_description = $(item).find("[data-requirement-description]").find("p").text();

        
        if (requirement_answer != user_answered) {
            correct = "wrong-answer";
            message = "Você falhou!";
        }

        load["items"].push({ correct: correct, description: requirement_description });

    });

    load["message"] = message;
    //hide buttons
    $("#submit-requirements").addClass("hide");
    $("[data-control").addClass("hide");
    $("#finalize").removeClass("hide");

    var user = window.localStorage.getItem("user");
    user = JSON.parse(user);

    var data = { mission_id_fk: window.localStorage.getItem("current_mission"), user_id_fk: user.id };

    var body_load = _.template($('#tmpl-result').text());
    $('#dump-requirements').empty().append(body_load({ data: load }));

    if (correct == "correct-answer") {
        makeAjax(data, '/MissionCompleted/SaveCompletion', saveCompletionSuccess);
        
    } 
});

$(document).on("click", "#finalize", function () {
    window.location = "guardian_tab.html";
});

function saveCompletionSuccess(data) {
    console.log(data);
}

function getMissionContent(data) {
    $("[data-mission-name]").text(data.mission.name);
    $("#description").text(data.mission.mission_description);
    $("#mission-image-row").css('background-image' , 'url('+data.mission.image_url+')');
    var body_load = _.template($('#tmpl-requirements').text());
    $('#dump-requirements').append(body_load({ requirements: data.requirements })).attr("data-length" , data.requirements.length);

    
    $(".requirement-mission-name").css({ "height": $(window).height() * 0.05 });
    $(".requirement-footer").css({ "height": $(window).height() * 0.15 });
    
}

