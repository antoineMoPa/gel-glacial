build:
	cp -r common/. chrome/
	cp -r common/. firefox/data/

	# For this to work, you need to install
	# https://addons.mozilla.org/firefox/addon/autoinstaller/ for firefox
	cd firefox; jpm watchpost --post-url http://localhost:8888 

