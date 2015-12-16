build:
	cp -r common/. chrome/
	cp -r common/. firefox/data/
	cp -r common/. safari/safari.safariextension/

	# For this to work, you need to install
	# https://addons.mozilla.org/de/firefox/addon/autoinstaller/ for firefox
	cd firefox; jpm watchpost --post-url http://localhost:8888 

