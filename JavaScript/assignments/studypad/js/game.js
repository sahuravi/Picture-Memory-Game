var matchedImageCounter = 0;
var targetImage = "";
var imgArrLength = 0;
var countDown = 20;

var imgGridContainerId = "#img-grid-container";
var $imgGridContainer = $(imgGridContainerId);
var imgFolder = 'images/';
var $targetImg = $("#targetImg");


var imgNameList = [];

$(function () {
    startGame();
});

function startGame() {

    imgNameList = generateRandomArray(9, 25);
    imgArrLength = imgNameList.length;

    $.each(imgNameList, function (i, val) {
        $imgGridContainer.append(`<div id=card${i}><img src=${imgFolder + val}.jpg />`);
    });

    $("#img-grid-container div").click(showImage);

    $imgGridContainer.find('div').addClass('loader');
    $("#img-grid-container div").hide();

    $imgGridContainer.imagesLoaded()
        .done(function (instance) {
            // Here initial message is shown for 20 seconds to user to memorize the images.
            let $textContainer = $('.text-container');
            let $timerSpan = $textContainer.find('.timer');
            $timerSpan.text(countDown);
            $textContainer.show();

            let time = setInterval(() => {
                $timerSpan.text(--countDown);
                if (!countDown) {
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
            $imgGridContainer.find('div').removeClass("loader");
            console.log('all images successfully loaded');
        })
        .fail(function () {
            console.log('All images not loaded.');
        });
}

// This function get the random image from earlier show images.
function updateTargetImageContainer() {
    $targetImg = $targetImg;
    let number = getRandomNumber(imgNameList);
    imgNameList.splice(imgNameList.indexOf(number), 1);
    targetImage = `images/${number}.jpg`;;
    $targetImg.find('img').attr('src', targetImage);
    $targetImg.css('display', 'block');
    $('.text-2').css("display", "block");
}

// This function generate an array of random numbers from an array.
function generateRandomArray(ofLength, fromLength) {
    return shuffle(getArray(fromLength)).splice(0, ofLength);
}

// This function suffle my initial array i.e of length 25.
function shuffle(array) {
    let tmp, current, top = array.length;
    if (top)
        while (--top) {
            current = Math.floor(Math.random() * (top + 1));
            tmp = array[current];
            array[current] = array[top];
            array[top] = tmp;
        }
    return array;
}

// This function generate an array of given length.
function getArray(length) {
    let arr = [];
    for (let i = 0; i < length;) {
        arr[i] = ++i;
    }
    return arr;
}

// This is the handler function which is called on each click event on div.
function showImage() {
    let id = $(this).attr("id");
    let $currentElement = $("#" + id + " img");

    if ($currentElement.is(":hidden")) {
        $(imgGridContainerId + " div").unbind("click", showImage);

        $currentElement.slideDown('slow');
        let currentOpenedImage = $currentElement.attr("src");

        if (targetImage != currentOpenedImage) {
            $('.text-3').css("display", "block");
            setTimeout(function () {
                $('.text-3').fadeOut("slow");;
                $currentElement.slideUp('slow');
            }, 500);
        } else {
            $('.text-4').css("display", "block");
            setTimeout(function () {
                $('.text-4').fadeOut("slow");
            }, 500);
            updateTargetImageContainer();
            matchedImageCounter++;
        }
        setTimeout(function () {
            $(imgGridContainerId + " div").bind("click", showImage)
        }, 400);
    }

    if (matchedImageCounter == imgArrLength) {
        $targetImg.css("display", "none");
        $('.text-2').css("display", "none");
        $imgGridContainer.prepend('<p id="success-text">You matched all the pictrues</p>');
    }
}

// This function return a random number from the array.
function getRandomNumber(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// This functio is called when we click on reset game butto to reset the game.
function resetGame() {
    $(`${imgGridContainerId}`).children().remove();
    $(`${imgGridContainerId} div`).css("visibility", "visible");
    $("#targetImg img").attr("src", "#");
    $targetImg.css("display", "none");
    $('.text-2').css("display", "none");
    matchedImageCounter = 0;
    countDown = 20;
    startGame();
    return false;
}