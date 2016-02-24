build:
	cat "common/lib/external/jquery-2.1.4.min.js" "common/addons/marks_gathering.js" "common/addons/marks.js" "common/addons/marks_weighting.js" "common/addons/new_marks.js" "common/addons/average_fix.js" > common/addons/marks_addon.js
	cp -r common/. chrome/
	cp -r common/. firefox/data/
	cp -r common/. safari/safari.safariextension/

	# For this to work, you need to install
	# https://addons.mozilla.org/firefox/addon/autoinstaller/ for firefox
	cd firefox; jpm watchpost --post-url http://localhost:8888 

