build:
	cp common/main.js chrome/
	cp common/main.js firefox/data/
	cp common/style.css chrome/
	cp common/style.css firefox/data/

	cd firefox; jpm post --post-url http://localhost:8888

