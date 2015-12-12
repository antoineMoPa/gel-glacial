build:
	cp -r common/. chrome/;
	cp -r common/. firefox/data/;

	#install https://addons.mozilla.org/de/firefox/addon/autoinstaller/ for firefox
	cd firefox; jpm watchpost --post-url http://localhost:8888 

