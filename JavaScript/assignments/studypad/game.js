// var BoxOpened = "";
// var ImgOpened = "";
// var placeImageCounter = 0;
var matchedImageCounter = 0;
var targetImage = "";
var imgArrLength = 0;

var imgGridContainerId = "#img-grid-container";
var $imgGridContainer = $(imgGridContainerId);
var imgFolder = 'images/';
var $targetImg = $("#targetImg");


var imgNameList = [];

$(function() {
    startGame();
});

function startGame() {
    $imgGridContainer.addClass("loading");
    $("#img-grid-container div").hide();

    $imgGridContainer.imagesLoaded()
        .done(function(instance) {
            let $textContainer = $('.text-container');
            let $timerSpan = $textContainer.find('.timer');
            let counter = 5;
            $timerSpan.text(counter);
            $textContainer.show();

            let time = setInterval(() => {
                $timerSpan.text(--counter);
                if (!counter) {
                    stopTimer();
                }
            }, 1000);

            function stopTimer() {
                clearInterval(time);
                $textContainer.hide();
                $("#img-grid-container div img").css('display', 'none');
                updateTargetImageContainer();
            }

            $("#img-grid-container div").show();
            $imgGridContainer.removeClass("loading");
            console.log('all images successfully loaded');
        })
        .fail(function() {
            console.log('all images loaded, at least one is broken');
        });

    imgNameList = generateRandomArray(9, 25);
    imgArrLength = imgNameList.length;

    $.each(imgNameList, function(i, val) {
        $imgGridContainer.append(`<div id=card${i}><img src=${imgFolder + val}.jpg />`);
    });

    $("#img-grid-container div").click(showImage);
}

function updateTargetImageContainer() {
    $targetImg = $targetImg;
    let number = getRandomNumber(imgNameList);
    imgNameList.splice(imgNameList.indexOf(number), 1);
    targetImage = `images/${number}.jpg`;;
    $targetImg.find('img').attr('src', targetImage);
    $targetImg.css('display', 'block');
}

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
    let arr = [];
    for (let i = 0; i < length;) {
        arr[i] = ++i;
    }
    return arr;
}

function showImage() {
    let id = $(this).attr("id");
    let $currentElement = $("#" + id + " img");

    if ($currentElement.is(":hidden")) {
        $(imgGridContainerId + " div").unbind("click", showImage);

        $currentElement.slideDown('fast');
        let currentOpenedImage = $currentElement.attr("src");

        if (targetImage != currentOpenedImage) {
            setTimeout(function() {
                $currentElement.slideUp('fast');
            }, 400);
        } else {
            updateTargetImageContainer();
            matchedImageCounter++;
        }
        setTimeout(function() {
            $(imgGridContainerId + " div").bind("click", showImage)
        }, 400);
    }

    if (matchedImageCounter == imgArrLength) {
        $targetImg.css("display", "none");
        $imgGridContainer.prepend('<span id="success">You matched all the pictrues</span>');
    }
}

function getRandomNumber(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function RandomFunction(MaxValue, MinValue) {
    return Math.round(Math.random() * (MaxValue - MinValue) + MinValue);
}

function resetGame() {
    $(`${imgGridContainerId}`).children().remove();
    $(`${imgGridContainerId} div`).css("visibility", "visible");
    $("#targetImg img").attr("src", "#");
    $targetImg.css("display", "none");
    matchedImageCounter = 0;
    startGame();
    return false;
}