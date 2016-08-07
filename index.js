function extend(target) {
	var sources = [].slice.call(arguments, 1);
	sources.forEach(function (source) {
		for (var prop in source) {
			target[prop] = source[prop];
		}
	});
	return target;
}
var path = require("path");
var multer = require("multer");

var _isFunction = function(obj) {
	return !!(obj && obj.constructor && obj.call && obj.apply);
};

var NodeUpload = (function () {
	function NodeUpload(filenameFN, routeStr, defConfig) {
		if (_isFunction(filenameFN)) {
			NodeUpload.prototype._filename = filenameFN;
		}
		var fs = require('fs');
		this.route = routeStr || NodeUpload._defDirectory;

		if (!fs.existsSync(this.route)){
			fs.mkdirSync(this.route);
		}

		// Default configuration
		this.defConfig = extend({}, NodeUpload._limits, defConfig || {});

		var self = this;
		this.storage = multer.diskStorage({
			destination: function (req, file, cb) {
				cb(null, self.route);	//NodeUpload._defDirectory);
			},
			filename: function (req, file, cb) {
				var name = file.originalname.substr(0, file.originalname.lastIndexOf('.'));
				var ext = path.extname(file.originalname).toLowerCase();
				cb(null, self._filename(file) + ext);
			}
		});
		this.upload = multer({
			storage: this.storage,
			dest: this.route,	//NodeUpload._defDirectory,
			fileFilter: NodeUpload.fileFilter,
			limits: this.defConfig
		});
	}
	NodeUpload.removeDotsExtension = function(exts) {
		var ext;
		for(var i = 0; i < exts.length; i++) {
			ext = exts[i];
			if (ext.substring(0, 1) == '.') { 
				ext = ext.substring(1);
			}
			exts[i] = ext;
		}
		return exts;
	}
	NodeUpload.prototype.upload_file = function (req, res, fieldName, types, config) {
		req.extensions = (types && typeof types !== "undefined") ? (types instanceof Array) ? 
			NodeUpload.removeDotsExtension(types) : NodeUpload.removeDotsExtension([types]) : NodeFilter._defTypes;

		this.upload.limits = extend({}, this.defConfig, config || {});

		this.upload.single(fieldName)(req, res, function (err) {
			if (err || req.fileValidationError) {
				return res.json({ "err": err || req.fileValidationError });
			}
			else if (!req.file) {
				return res.json({ "err": "File dont founded" });
			}
			res.json(req.file);
		});
	};
	NodeUpload.prototype.upload_array_files = function (req, res, fieldName, types, config) {
		req.extensions = (types && typeof types !== "undefined") ? (types instanceof Array) ? 
			NodeUpload.removeDotsExtension(types) : NodeUpload.removeDotsExtension([types]) : NodeFilter._defTypes;

		this.upload.limits = extend({
			files: 2
		}, this.defConfig, config || {});
		this.upload.array(fieldName)(req, res, function(err) {
			if(err || req.fileValidationError) {
				return res.json({ "err": err || req.fileValidationError });
			} else if(!req.files) {
				return res.json({ "err": "Files dont founded" });
			}
			res.json(req.files);
		});
	};
	NodeUpload.prototype.upload_fields_files = function (req, res, fieldNames, types, config) {
		req.extensions = (types && typeof types !== "undefined") ? (types instanceof Array) ? 
			NodeUpload.removeDotsExtension(types) : NodeUpload.removeDotsExtension([types]) : NodeFilter._defTypes;

		this.upload.limits = extend({
			files: 2
		}, this.defConfig, config || {});
		this.upload.fields(fieldName)(req, res, function(err) {
			if(err || req.fileValidationError) {
				return res.json({ "err": err || req.fileValidationError });
			} else if(!req.files) {
				return res.json({ "err": "Files dont founded" });
			}
			res.json(req.files);
		});
	};
	NodeUpload.prototype._filename = function (file) {
		return file.originalname.substr(0, file.originalname.lastIndexOf('.')) + Date.now();
	};
	NodeUpload.fileFilter = function (req, file, cb) {
		var ext = path.extname(file.originalname).toLowerCase();
		if (ext.substring(0, 1) == '.') { 
			ext = ext.substring(1);
		}
		if (req.extensions.indexOf(ext) > -1) {
			return cb(null, true);
		}
		req.fileValidationError = 'goes wrong on the extension';
		return cb(null, false, new Error(req.fileValidationError));
	};
	NodeUpload._limits = {
		fieldNameSize: 100
	};
	NodeUpload._defTypes = ["jpeg", "jpg", "png"];
	NodeUpload._defDirectory = "./uploads/";
	return NodeUpload;
}());

exports = module.exports = NodeUpload;