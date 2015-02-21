﻿(function () {

	var nav = document.getElementById("nav"),
		main = document.getElementsByTagName("main")[0];

	function openMenu() {

		var active = nav.getElementsByClassName("active");

		if (active.length === 0)
			return;

		var li = active[0].parentNode;

		do {

			if (li.tagName === "LI" && li.childElementCount === 2)
				li.className = "open";

			li = li.parentNode;

		} while (li.parentNode !== nav);
	}

	function initMenu() {
		document.body.addEventListener("click", function (e) {

			if (e.target.tagName !== "A")
				return;

			var submenu = e.target.nextElementSibling,
				href = e.target.getAttribute("href");

			if (submenu) {
				e.preventDefault();
				e.target.parentNode.className = e.target.parentNode.className === "" ? "open" : "";

				// Close all other open menu items
				var open = nav.getElementsByClassName("open");
				for (var i = 0; i < open.length; i++) {
					if (e.target.parentNode !== open[i])
						open[i].removeAttribute("class")
				}
			}
			else if (href.indexOf("://") === -1 && history && history.pushState) {
				e.preventDefault();

				history.pushState(null, null, href);
				replaceContent(href);

				// Close all other open menu items
				var open = nav.getElementsByClassName("active");
				for (var i = 0; i < open.length; i++) {
					open[i].removeAttribute("class");
				}

				e.target.className = "active";
			}

		}, false);

		document.getElementById("burger").addEventListener("click", function (e) {
			e.preventDefault();
			var ul = e.target.nextElementSibling;
			var display = ul.style.display;
			ul.style.display = display === "" ? "block" : "";
		});
	}

	function replaceContent(url) {

		var xhr = new XMLHttpRequest();
		xhr.open("GET", url, true);
		xhr.setRequestHeader("x-content-only", "1");
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4 && xhr.status === 200) {
				main.innerHTML = xhr.responseText;
				document.title = xhr.getResponseHeader("x-title");
			}
		}

		xhr.send();
	}

	function initPushState() {

		if (!history && !history.pushState)
			return;

		window.addEventListener("popstate", function (e) {
			replaceContent(location.pathname);
		});
	}

	//function initAppCache() {
	//	if (!window.applicationCache)
	//		return;

	//	window.applicationCache.addEventListener('updateready', function (e) {
	//		if (window.applicationCache.status === window.applicationCache.UPDATEREADY) {
	//			// Browser downloaded a new app cache.
	//			//if (confirm('A new version of this site is available. Load it?')) {
	//			window.location.reload();
	//			//}
	//		}
	//	}, false);
	//}

	window.addEventListener('load', function (e) {

		initMenu();
		openMenu();
		initPushState();
		//initAppCache();

	}, false);

})();