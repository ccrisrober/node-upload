# node-upload
Simple file uploader for NodeJS applications

## Example
```javascript
	var NodeUpload = require("node-upload");
	// First parameter: Optional callback for rename (only replace if defined)
	// Second parameter: Optional uploading route (Default: "./uploads/") 
	//		NOTE: Create route if not exist
	var upload = new NodeUpload(function() {
		return "FOO" + Math.random();
	}, "./myroute/");
	// Simple file
		// No extensions (default: [.png, .jpg, .jpeg])
		upload.upload_file(req, res, "photo", null, {});
		// Simple extension
		upload.upload_file(req, res, "photo", "png", {});								(Dot is deleted when you check the type. Case sensitive extensions)
		// Array extension
		upload.upload_file(req, res, "photo", ["png"], {});								(Dot is deleted when you check the type. Case sensitive extensions)
	// Array of files
		// No extensions (default: [.png, .jpg, .jpeg])
		upload.upload_array_files(req, res, "photo", null, { files: 2 });
		// Simple extension
		upload.upload_array_files(req, res, "photo", ".png", { files: 2 });				(Dot is deleted when you check the type. Case sensitive extensions)
		// Array extension
		upload.upload_array_files(req, res, "photo", [".png", "jpg"], { files: 2 });	(Dot is deleted when you check the type. Case sensitive extensions)
```