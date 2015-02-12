﻿(function () {

	function openMenu() {

		var active = document.querySelector("nav .active");

		if (!active || (active.offsetWidth === 0 && active.offsetHeight === 0)) // Only if visible
			return;

		while (active.parentNode.parentNode.tagName === "UL") {
			active = active.parentNode.parentNode;

			var sibling = active.previousElementSibling;

			if (sibling)
				sibling.className = "open";
		}
	}

	function initMenu() {
		document.querySelector("nav > ul").addEventListener("click", function (e) {
			var submenu = e.target.nextElementSibling;

			if (e.target.tagName === "A" && submenu) {
				e.preventDefault();
				e.target.className = e.target.className === "" ? "open" : "";
			}

		}, false);
	}

	function initAppCache() {
		if (!window.applicationCache)
			return;

		window.applicationCache.addEventListener('updateready', function (e) {
			if (window.applicationCache.status === window.applicationCache.UPDATEREADY) {
				// Browser downloaded a new app cache.
				//if (confirm('A new version of this site is available. Load it?')) {
				window.location.reload();
				//}
			}
		}, false);
	}

	window.addEventListener('load', function (e) {

		initMenu();
		openMenu();
		initAppCache();

	}, false);

})();