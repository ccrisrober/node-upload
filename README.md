# node-upload
Simple file uploader for NodeJS applications

## Example
```javascript
	var NodeUpload = require("node-upload");
	// First parameter: Optional callback for rename (only replace if defined)
	// Second parameter: Optional uploading route (Default: "./uploads/") 
	//		NOTE: Create route if not exist
	// Third parameter: Optional configuration
	var upload = new NodeUpload(function(file) {
		return file.fieldname + '-' + Math.random();
	}, "./myroute/", {
		fieldSize: 15
	});

	// Simple file (Dot is deleted when you check the type. Case sensitive extensions)
	// No extensions (default: [.png, .jpg, .jpeg])
	upload.upload_file(req, res, "photo", null, {});
	// Simple extension (Dot is deleted when you check the type. Case sensitive extensions)
	upload.upload_file(req, res, "photo", "png", {});
	// Array extension (Dot is deleted when you check the type. Case sensitive extensions)
	upload.upload_file(req, res, "photo", ["png"], {});

	// Array of files
	// No extensions (default: [.png, .jpg, .jpeg])
	upload.upload_array_files(req, res, "photo", null, { files: 2 });
	// Simple extensions (Dot is deleted when you check the type. Case sensitive extensions)
	upload.upload_array_files(req, res, "photo", ".png", { files: 2 });
	// Array extension (Dot is deleted when you check the type. Case sensitive extensions)
	upload.upload_array_files(req, res, "photo", [".png", "jpg"], { files: 2 });

	// Array of fields
	// No extensions (default: [.png, .jpg, .jpeg])
	upload.upload_array_files(req, res, 
		[ { name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 } ], null, { files: 2 });
	// Simple extension (Dot is deleted when you check the type. Case sensitive extensions)
	upload.upload_array_files(req, res, 
		[ { name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 } ], ".png", { files: 2 });
	// Array extension (Dot is deleted when you check the type. Case sensitive extensions)
	upload.upload_array_files(req, res, 
		[ { name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 } ] , [".png", "jpg"], { files: 2 });
```