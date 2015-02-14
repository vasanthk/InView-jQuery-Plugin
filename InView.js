/**
 * InView jQuery Plugin
 *
 * Watch elements and fire an event when it is first viewed.
 * 
 * TODO: Bower the crap out of this!
 * @author: Vasanth Krishnamoorthy
 */

(function ($, window) {
	var cache = [],
		inview_items = 0,
		$w = $(window);

	$.fn.trackInView = function (section_name) {
		var $element = $(this),
			startTime = _.now();

		inview_items++;

		function trackSectionViews($element, section_name, scroll_depth, timing) {
			var current_caption;
			if ($.inArray(section_name, cache) === -1 && $element.length) {
				if (scroll_depth >= $element.offset().top) {
					current_caption = section_name || 'Unknown';
					_gaq.push(["_trackEvent", current_caption, scroll_depth, timing, true]);
					cache.push(current_caption);
				}
			}
		}

		$w.on('scroll.trackInView', _.throttle(function () {
			var win_height = window.innerHeight || $w.height(),	// < IE9 doesn't use window property
				scroll_depth = $w.scrollTop() + win_height,
				timing = (_.now() - startTime) / 1000; // In seconds

			if (cache.length >= inview_items) { // Unbind scroll once done
				$w.off('scroll.trackInView');
				return;
			}

			if ($element) {
				trackSectionViews($element, section_name, scroll_depth, timing);
			}
		}, 500));
	};
})(jQuery, window);
