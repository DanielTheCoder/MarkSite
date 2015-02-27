﻿(function () {

	var nav = document.getElementById("nav"),
		burger = document.getElementById("burger"),
		main = document.getElementsByTagName("main")[0],
		hero = document.getElementById("hero"),
		pageCache = [];

	function openMenu() {

		if (location.pathname === "/")
			return;

		var active = nav.getElementsByClassName("active");

		if (active.length === 0)
			return;

		var li = active[0].parentNode;

		do {

			if (li.tagName === "LI" && li.childElementCount === 2) {
				li.className = "open";
			}

			li = li.parentNode;

		} while (li.parentNode !== nav);
	}

	function initMenu() {
		document.body.addEventListener("click", function (e) {

			if (e.target.tagName !== "A")
				return;

			var href = e.target.getAttribute("href");

			if (e.target.nextElementSibling) {
				e.preventDefault();

				var parent = e.target.parentNode;

				if (parent.tagName !== "LI")
					return;

				parent.className = parent.className === "" ? "open" : "";

				// Close all other open menu items
				var open = nav.getElementsByClassName("open");
				for (var i = 0; i < open.length; i++) {
					if (parent !== open[i])
						open[i].removeAttribute("class");
				}
			}
			else if (href.indexOf("://") === -1 && history && history.pushState) {
				e.preventDefault();

				replaceContent(href, e.target);
				history.pushState(null, null, href);

				// Close all other open menu items
				var active = nav.getElementsByClassName("active");
				for (var a = 0; a < active.length; a++) {
					active[a].removeAttribute("class");
				}

				e.target.className = "active";
			}

		}, false);

		burger.addEventListener("click", function (e) {
			e.preventDefault();
			var ul = e.target.nextElementSibling;
			var visible = ul.style.visibility;
			ul.style.visibility = visible === "" ? "visible" : "";
		});
	}

	function toggleHero(href) {
		if ((!href && location.pathname === "/") || href === "/") {
			hero.style.maxHeight = "";
		}
		else {
			hero.style.maxHeight = 0;
		}
	}

	function replaceContent(url, target) {
		
		var cached = pageCache[url];

		if (cached) {
			changeContent(cached);
			return;
		}

		target && target.setAttribute("data-spinner", "true");

		var xhr = new XMLHttpRequest();
		xhr.open("GET", url, true);
		xhr.setRequestHeader("X-Content-Only", "1");
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4 && xhr.status === 200) {
				var page = { url: url, content: xhr.responseText, title: xhr.getResponseHeader("X-Title"), next: xhr.getResponseHeader("X-Next"), prev: xhr.getResponseHeader("X-Prev") };
				changeContent(page);
				pageCache[url] = page;
				target && target.removeAttribute("data-spinner");
			}
		};

		xhr.send();
	}

	function SetFlipAheadLinks(next, prev) {
		var nextLink = document.head.querySelector("link[rel=next]");
		var prevLink = document.head.querySelector("link[rel=prev]");

		setLink(nextLink, next, "next");
		setLink(prevLink, prev, "prev");

		function setLink(link, href, rel) {
			if (href) {
				link = link || createLink(rel, href);
				link.href = href;
			}
			else if (link) {
				link.parentNode.removeChild(link);
			}
		}

		function createLink(rel, href) {
			var link = document.createElement("link");
			link.rel = rel;
			link.href = href;
			return document.head.appendChild(link);
		}
	}

	function changeContent(page) {
		setTimeout(function () {
			main.innerHTML = page.content;
			document.title = page.title;
			SetFlipAheadLinks(page.next, page.prev);
			
			scrollTo(0, 0);
			main.style.opacity = 1;
		}, 250);

		if (burger.offsetLeft > 0 || burger.offsetTop > 0) { // If small screen
			burger.nextElementSibling.style.visibility = "";
		}

		main.style.opacity = 0;
		toggleHero(page.url);
	}

	function initPushState() {

		if (!history || !history.pushState)
			return;

		window.addEventListener("popstate", function (e) {
			replaceContent(location.pathname);
		});
	}

	function initPinnedSite() {
		try {
			if (window.external.msIsSiteMode()) {
				ext = window.external;
				ext.msSiteModeCreateJumpList("Navigation");

				var mainItems = document.querySelectorAll("#nav > ul > li > a");

				for (var i = mainItems.length - 1; i > -1; i--) {
					var link = mainItems[i];
					ext.msSiteModeAddJumpListItem(link.innerHTML, link.href, "/themes/standard/favicon/favicon.ico");
				}
			}
		}
		catch (e) { }
	}

	initMenu();
	openMenu();
	initPushState();
	initPinnedSite();

})();