build:
	java -jar compiler.jar --js "common/lib/external/jquery-2.1.4.min.js" --js "common/addons/marks_gathering.js" --js "common/addons/marks.js" --js "common/addons/marks_weighting.js" --js "common/addons/new_marks.js" --js "common/addons/average_fix.js" --js_output_file common/addons/marks_addon.js
	#cat "common/lib/external/jquery-2.1.4.min.js" "common/lib/dependence_postponing.js" "common/addons/marks_gathering.js" "common/addons/marks.js" "common/addons/marks_weighting.js" "common/addons/new_marks.js" "common/addons/average_fix.js" > arg.js
	cp -r common/. chrome/
	cp -r common/. firefox/data/
	cp -r common/. safari/safari.safariextension/

	# For this to work, you need to install
	# https://addons.mozilla.org/firefox/addon/autoinstaller/ for firefox
	cd firefox; jpm watchpost --post-url http://localhost:8888 

