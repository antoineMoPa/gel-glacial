build:
	# cp -r common/. chrome/; #not in developpement for now
	cp -r common/. firefox/data/;

	#install https://addons.mozilla.org/de/firefox/addon/autoinstaller/ for firefox
	cd firefox; jpm watchpost --post-url http://localhost:8888 

