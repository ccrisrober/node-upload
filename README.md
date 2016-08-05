# node-upload
Simple file uploader for NodeJS applications

## Example
```javascript
	var upload = require("node-upload");
	// Simple file
		// No extensions (default: [.png, .jpg, .jpeg])
		upload.upload_file(req, res, "photo", null, {});
		// Simple extension
		upload.upload_file(req, res, "photo", ".png", {});
		// Array extension
		upload.upload_file(req, res, "photo", ".png", {});
	// Array of files
		// No extensions (default: [.png, .jpg, .jpeg])
		upload.upload_array_files(req, res, "photo", null, { files: 2 });
		// Simple extension
		upload.upload_array_files(req, res, "photo", ".png", { files: 2 });
		// Array extension
		upload.upload_array_files(req, res, "photo", ".png", { files: 2 });
```