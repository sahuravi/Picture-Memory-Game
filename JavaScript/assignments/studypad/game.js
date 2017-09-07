var BoxOpened = "";
var ImgOpened = "";
var Counter = 0;
var ImgFound = 0;

var Source = "#boxcard";
var container = $("#boxcard");
var basePath = 'images/';


var ImgSource = [];

$(function () {
    $("#boxcard").addClass("loading");
    $("#boxcard div").hide();

    $('#boxcard').imagesLoaded()
        .done(function (instance) {
            let $textContainer = $('.text-container');
            let $timerSpan = $textContainer.find('.timer');
            let counter = 20;
            $textContainer.show();

            setInterval(() => {
                $timerSpan.text(counter);
                counter--;
            }, 1000);
            $("#boxcard div").show();
            $("#boxcard").removeClass("loading");
            console.log('all images successfully loaded');
        })
        .fail(function () {
            console.log('all images loaded, at least one is broken');
        });

    ImgSource = generateRandomArray(9, 25);

    $.each(ImgSource, function (i, val) {
        container.append("<div id=card" + i + "><img src=" + basePath + val + ".jpg />");
    });

    $("#boxcard div").click(OpenCard);

    setTimeout(() => {
        $("#boxcard div img").css('display', 'none');
        $("#targetImg").css('display', 'block');
    }, 2000);
    //ShuffleImages();
});

function generateRandomArray(ofLength, fromLength) {
    return shuffle(getArray(fromLength)).splice(0, ofLength);
}

function shuffle(array) {
    var tmp, current, top = array.length;
    if (top)
        while (--top) {
            current = Math.floor(Math.random() * (top + 1));
            tmp = array[current];
            array[current] = array[top];
            array[top] = tmp;
        }
    return array;
}

function getArray(length) {
    for (var a = [], i = 0; i < length;) {
        a[i] = ++i;
    }
    return a;
}

function OpenCard() {
    var id = $(this).attr("id");

    if ($("#" + id + " img").is(":hidden")) {
        $(Source + " div").unbind("click", OpenCard);

        $("#" + id + " img").slideDown('fast');

        if (ImgOpened == "") {
            BoxOpened = id;
            ImgOpened = $("#" + id + " img").attr("src");
            setTimeout(function () {
                $(Source + " div").bind("click", OpenCard)
            }, 300);
        } else {
            CurrentOpened = $("#" + id + " img").attr("src");
            if (ImgOpened != CurrentOpened) {
                setTimeout(function () {
                    $("#" + id + " img").slideUp('fast');
                    $("#" + BoxOpened + " img").slideUp('fast');
                    BoxOpened = "";
                    ImgOpened = "";
                }, 400);
            } else {
                $("#" + id + " img").parent().css("visibility", "hidden");
                $("#" + BoxOpened + " img").parent().css("visibility", "hidden");
                ImgFound++;
                BoxOpened = "";
                ImgOpened = "";
            }
            setTimeout(function () {
                $(Source + " div").bind("click", OpenCard)
            }, 400);
        }
        Counter++;
        $("#counter").html("" + Counter);

        if (ImgFound == ImgSource.length) {
            $("#counter").prepend('<span id="success">You Found All Pictues With </span>');
        }
    }
}

function RandomFunction(MaxValue, MinValue) {
    return Math.round(Math.random() * (MaxValue - MinValue) + MinValue);
}

function ResetGame() {
    ShuffleImages();
    $(Source + " div img").hide();
    $(Source + " div").css("visibility", "visible");
    Counter = 0;
    $("#success").remove();
    $("#counter").html("" + Counter);
    BoxOpened = "";
    ImgOpened = "";
    ImgFound = 0;
    return false;
}
/* 
function ShuffleImages() {
    var ImgAll = container.children();
    var ImgThis = $(Source + " div:first-child");
    var ImgArr = new Array();

    for (var i = 0; i < ImgAll.length; i++) {
        ImgArr[i] = $("#" + ImgThis.attr("id") + " img").attr("src");
        ImgThis = ImgThis.next();
    }

    ImgThis = $(Source + " div:first-child");

    for (var z = 0; z < ImgAll.length; z++) {
        var RandomNumber = RandomFunction(0, ImgArr.length - 1);

        $("#" + ImgThis.attr("id") + " img").attr("src", ImgArr[RandomNumber]);
        ImgArr.splice(RandomNumber, 1);
        ImgThis = ImgThis.next();
    }
} */