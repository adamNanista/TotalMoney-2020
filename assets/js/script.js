/* CROSS BROWSER requestAnimationFrame */

if (!window.requestAnimationFrame) {
	window.requestAnimationFrame = (function () {
		return window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			function (callback, element) {
				window.setTimeout(callback, 1000 / 60);
			};
	})();
}

/* TOGGLE COMPONENT */

var ToggleComponent = (function () {

	var DOM = {};

	function cacheDom() {
		DOM.menu = {
			toggle: document.querySelector('.js-menu__trigger'),
			module: document.querySelector('.js-menu__module')
		};
		DOM.overlay = document.querySelector('.js-overlay');
	}

	function bindEvents() {
		if (DOM.menu.toggle && DOM.menu.module) {
			DOM.menu.toggle.addEventListener('click', function (e) {
				e.preventDefault();
				toggleModule(DOM.menu);
			});
		}
		if (DOM.overlay) {
			DOM.overlay.addEventListener('click', function (e) {
				e.preventDefault();
				closeModule(DOM.menu);
			});
		}
	}

	function toggleModule(element) {
		var isClosed = element.module.getAttribute('data-toggle') === 'true';
		
		if (isClosed) {
			openModule(element);
		} else {
			closeModule(element);
		}
	}

	function closeModule(element) {
		element.toggle.classList.remove('open');
		element.module.classList.add('hidden');
		element.module.setAttribute('data-toggle', 'true');
	}

	function openModule(element) {
		element.toggle.classList.add('open');
		element.module.classList.remove('hidden');
		element.module.setAttribute('data-toggle', 'false');
	}

	function init() {
		cacheDom();
		bindEvents();
	}

	return {
		init: init
	};

}());

(function () {

	ToggleComponent.init();

})();
