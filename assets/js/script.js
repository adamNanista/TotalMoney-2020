
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

/* Show More Products */

var ShowMoreProducts = (function () {
	
	var toShow = 9;
	var toAdd = 3;
	
	var mobileResolution = window.matchMedia('(max-width: 1023px)');
	
	if (mobileResolution.matches) {
		var toShow = 6;
		var toAdd = 2;
	}

	var DOM = {};

	function cacheDom() {
		DOM.productsItems = document.querySelectorAll('.products__item');
		DOM.loadMoreButton = document.querySelector('.load-more__button');
	}
	function bindEvents() {
		if (DOM.productsItems.length && DOM.loadMoreButton) {
			DOM.loadMoreButton.addEventListener('click', function (e) {
				e.preventDefault();
				showMoreProducts(toAdd);
			});
		}
	}
	
	function showProductsInit(productsItemsCount) {
		if (DOM.productsItems.length) {
			// Vsetky itemy skryt
			for (var i = 0; i < DOM.productsItems.length; i++) {
				DOM.productsItems[i].classList.add('hidden');
			}
			// Odkryt iba tolko kolko je vo var toShow
			for (var i = 0; i < productsItemsCount; i++) {
				DOM.productsItems[i].classList.remove('hidden');
			}
		}
	}
	
	function showMoreProducts(productsItemsToAdd) {
		
		var visibleProductsItems = document.querySelectorAll('.products__item:not(.hidden)').length;
		
		var productsItemsToShow = visibleProductsItems + productsItemsToAdd;
		
		if (productsItemsToShow > DOM.productsItems.length) {
			productsItemsToShow = DOM.productsItems.length;
		}
		
		// Vsetky itemy skryt
		for (var i = 0; i < DOM.productsItems.length; i++) {
			DOM.productsItems[i].classList.add('hidden');
		}
		// Odkryt iba tolko kolko je vo var productsItemsToShow
		for (var i = 0; i < productsItemsToShow; i++) {
			DOM.productsItems[i].classList.remove('hidden');
		}
		
	}
	
	function init() {
		cacheDom();
		bindEvents();
		showProductsInit(toShow);
	}

	return {
		init: init
	};

}());

/* Toggle Sub Menu */

var ToggleSubMenu = (function () {

	var DOM = {};

	function cacheDom() {
		DOM.menuItems = document.querySelectorAll('.nav__list__anchor');
	}

	function bindEvents() {
		if (DOM.menuItems.length) {
			for (var i = 0; i < DOM.menuItems.length; i++) {
				DOM.menuItems[i].addEventListener('click', function (e) {
					if (this.nextElementSibling) {
						e.preventDefault();
						toggleSubMenu(this);
					}
				});
			}
		}
	}
	
	function toggleSubMenu(subMenuToggle) {
		var subMenu = subMenuToggle.nextElementSibling;
		
		subMenuToggle.classList.toggle('open');
		subMenu.classList.toggle('hidden');
	}
		
	function init() {
		cacheDom();
		bindEvents();
	}

	return {
		init: init
	};

}());

/* Fix DropDown */

var FixDropDown = (function () {

	var DOM = {};

	function cacheDom() {
		DOM.menuItems = document.querySelectorAll('.nav__list__anchor');
	}
	
	function bindEvents() {
		if (DOM.menuItems) {
			for (var i = 0; i < DOM.menuItems.length; i++) {
				DOM.menuItems[i].addEventListener('mouseover', function (e) {
					if (this.nextElementSibling) {
						fixDropDown(this.nextElementSibling);
					}
				});
			}
		}
	}
	
	function fixDropDown(dropDown) {
		
		var windowWidth = window.innerWidth;
		
		var dropDownOffset = dropDown.getBoundingClientRect().left;
		var dropDownWidth = dropDown.getBoundingClientRect().width;
		var dropDownWhole = dropDownOffset + dropDownWidth;
		
		if (dropDownWhole > windowWidth) {
			dropDown.classList.add('right');
		}
		
	}
	
	function init() {
		cacheDom();
		bindEvents();
	}

	return {
		init: init
	};

}());

/* Starter */

(function () {
	
	var mobileResolution = window.matchMedia('(max-width: 1279px)');
	var desktopResolution = window.matchMedia('(min-width: 1280px)');

	ToggleComponent.init();
	ShowMoreProducts.init();
	
	if (mobileResolution.matches) {
		ToggleSubMenu.init();
	}
	
	if (desktopResolution.matches) {
		FixDropDown.init();
	}

})();
