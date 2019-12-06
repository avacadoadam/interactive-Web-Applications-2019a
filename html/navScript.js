
(function ($) {
    "use strict"; // Start of use s ztrict

    $('.alert').alert();

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: (target.offset().top - 70)
                }, 1000, "easeInOutExpo");
                return false;
            }
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $('.js-scroll-trigger').click(function () {
        $('.navbar-collapse').collapse('hide');
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $('body').scrollspy({
        target: '#mainNav',
        offset: 100
    });

    // Collapse Navbar
    var navbarCollapse = function () {
        if ($("#mainNav").offset().top > 100) {
            $("#mainNav").addClass("navbar-shrink");
        } else {
            $("#mainNav").removeClass("navbar-shrink");
        }
    };
    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);
    //test now click
    $('#start_test').click(() => {
        //fetch components
        var test1 = {
            "question": "The dog _ in the park",
            "choices": [
                "walk",
                "walking",
                "walked"
            ]
        };
        var test2 = {
            "question": "I really take pride in my ability to cook",
            "choices": [
                "can",
                "ability",
                "able",
                "way"
            ]
        };

        function builder(testObj) {
            return ' <span class="question" >' + testObj.question + '</span>\n' +
                '            <select name="choices" id="choices">\n' +
                '                <option value="0" class="form-control">' + testObj.choices[0] + '</option>\n' +
                '                <option value="1" class="form-control">' + testObj.choices[1] + '</option>\n' +
                '                <option value="2" class="form-control">' + testObj.choices[2] + '</option>\n' +
                '                <option value="3" class="form-control">' + testObj.choices[3] + '</option>\n' +
                '            </select>'
        }

        $('#testContainer').append(builder(test1));
        $('#testContainer').append(builder(test2));
        $('#start_test').text("submit");


    });

})(jQuery); // End of use strict
