var $html = $('html');

var BrowserDetect = {
    init: function () {
        this.browser = this.searchString(this.dataBrowser) || "Other";
        this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
    },
    searchString: function (data) {
        for (var i = 0; i < data.length; i++) {
            var dataString = data[i].string;
            this.versionSearchString = data[i].subString;

            if (dataString.indexOf(data[i].subString) !== -1) {
                return data[i].identity;
            }
        }
    },
    searchVersion: function (dataString) {
        var index = dataString.indexOf(this.versionSearchString);
        if (index === -1) {
            return;
        }

        var rv = dataString.indexOf("rv:");
        if (this.versionSearchString === "Trident" && rv !== -1) {
            return parseFloat(dataString.substring(rv + 3));
        } else {
            return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
        }
    },

    dataBrowser: [
        {string: navigator.userAgent, subString: "Edge", identity: "MS Edge"},
        {string: navigator.userAgent, subString: "MSIE", identity: "Explorer"},
        {string: navigator.userAgent, subString: "Trident", identity: "Explorer"},
        {string: navigator.userAgent, subString: "Firefox", identity: "Firefox"},
        {string: navigator.userAgent, subString: "Opera", identity: "Opera"},
        {string: navigator.userAgent, subString: "OPR", identity: "Opera"},
        {string: navigator.userAgent, subString: "Chrome", identity: "Chrome"},
        {string: navigator.userAgent, subString: "Safari", identity: "Safari"}
    ]
};

BrowserDetect.init();

$html.addClass(BrowserDetect.browser.toLowerCase());

$('#about-page, .popup-about').on('click', function(e){
    e.preventDefault();
    $('body').addClass('lock');
    $('.b-wrap__popup').addClass('b-wrap__popup--visible');
    $('#popup-1').addClass('this-visible');
});

$('#submit-page, .popup-submit').on('click', function(e){
    e.preventDefault();
    $('body').addClass('lock');
    $('.b-wrap__popup').addClass('b-wrap__popup--visible');
    $('#popup-2').addClass('this-visible');
});

$('.b-wrap__popup-close-area').on('click', function(e){
    e.preventDefault();
    $('body').removeClass('lock');
    $('.b-wrap__popup').removeClass('b-wrap__popup--visible');
    $('#popup-1').removeClass('this-visible');
    $('#popup-2').removeClass('this-visible');
});

$('.b-card__like').on('click', function(e){
    e.preventDefault();
    $(this).addClass('liked');
});

$('.hamburger, .more-information').on('click', function(e){
    e.preventDefault();
    $('body').toggleClass('lock');
    $(this).toggleClass('is-active');
    $('.b-sidebar').toggleClass('this-visible');
});




var $grid = $('.b-wrap__cards').masonry({
    itemSelector: '.b-card',
    percentPosition: true,
    transitionDuration: 0
});
// layout Masonry after each image loads
$grid.imagesLoaded().progress( function() {
    $grid.masonry('layout');
});


