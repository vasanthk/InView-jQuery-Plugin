/**
 * InView jQuery Plugin
 *
 * Watch elements on the page (#id elements) and fire a callback function when it is viewed.
 *
 * @author: Vasanth Krishnamoorthy
 */

(function ($, window) {
    var cache = [],
        inviewItems = 0,
        $w = $(window);

    $.fn.inView = function (callback) {
        if (typeof callback !== 'function') {
            return;
        }
        var $element = $(this),
            selectorName = $element.selector; // Used to refer elements are being watched on the page.

        inviewItems++;

        $w.on('scroll.inView', throttle(function () {
            var win_height = window.innerHeight || $w.height(),	// < IE9 doesn't use window property
                scroll_depth = $w.scrollTop() + win_height;

            if (cache.length >= inviewItems) { // Unbind scroll after element has been viewed
                $w.off('scroll.inView');
                return;
            }

            if ($element.length && $.inArray(selectorName, cache) === -1 && scroll_depth >= $element.offset().top) {
                callback.call(this);
                cache.push(selectorName);
            }
        }));

        function throttle(fn) { //  rate limits the execution of scroll event.
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
