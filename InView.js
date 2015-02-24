/**
 *
 * InView jQuery Plugin
 *
 * Watch elements on the page (#id elements) and fire a callback function when it is viewed.
 * @author: Vasanth Krishnamoorthy
 *
 * Do What The F*ck You Want To Public License (WTFPL)
 *
 */

(function ($, window) {
    var cache = [],
        inViewItems = 0,
        $w = $(window);

    $.fn.inView = function (callback) {
        if (typeof callback !== 'function') {
            return;
        }
        var $element = $(this),
        // Used to refer elements being watched on the page.
            selectorName = $element.selector;

        inViewItems++;

        // Custom event handler
        $w.on('scroll.inView', throttle(function () {
            var winHeight = window.innerHeight || $w.height(),	// < IE9 doesn't use window property
                scrollDepth = $w.scrollTop() + winHeight;

            // Unbind scroll after all elements to be watched have been viewed
            if (cache.length >= inViewItems) {
                $w.off('scroll.inView');
                return;
            }

            // Fire callback function
            if ($element.length && $.inArray(selectorName, cache) === -1 && scrollDepth >= $element.offset().top) {
                callback.call(this);
                cache.push(selectorName);
            }
        }));

        //  Rate limit scroll event to fire only once in 500ms
        function throttle(fn) {
            var wait = false;
            return function () {
                if (!wait) {
                    fn.call();
                    wait = true;
                    setTimeout(function () {
                        wait = false;
                    }, 500);
                }
            };
        }
    };
})(jQuery, window);
