var _filename = function(name, extension) {
	return name + Date.now() + extension;
}
var _limits = {
	fieldNameSize: 100
};
var _defTypes = [".jpeg", ".jpg", ".png"];
var _defDirectory = "./uploads/";

// ==========================================
// ==========================================
// 			Please, don´t edit this
// ==========================================
// ==========================================
var multer = require("multer");
var path = require("path");

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, _defDirectory);
	},
	filename: function (req, file, cb) {
		var name = file.originalname.substr(0, file.originalname.lastIndexOf('.'));
		var extension = path.extname(file.originalname);
		cb(null, _filename(name, extension));
	}
});
function fileFilter (req, file, cb){
	//console.log(path.extname(file.originalname));
	if(req.extensions.indexOf(path.extname(file.originalname)) > -1) {
		return cb(null, true);
	}
	req.fileValidationError = 'goes wrong on the extension';
	return cb(null, false, new Error(req.fileValidationError));
}
var upload = multer({
	storage: storage, 
	dest: "uploads/", 
	fileFilter: fileFilter,
	limits: _limits
});
function extend(target) {
	var sources = [].slice.call(arguments, 1);
	sources.forEach(function (source) {
		for (var prop in source) {
			target[prop] = source[prop];
		}
	});
	return target;
}
exports.upload_file = function(req, res, field_name, types, config) {
	req.extensions = (types && typeof types !== "undefined") ? (types instanceof Array) ? types : [types] : _defTypes;
	upload.limits = extend({}, _limits, config || {});
	upload.single(field_name)(req, res, function(err) {
		//console.log(err);
		if(err || req.fileValidationError) {
			return res.send(err || req.fileValidationError);
		}
		res.json(req.file);
		//res.json({"filename": req.file.filename, "type": req.file.mimetype});
	});
};
exports.upload_array_files = function(req, res, field_name, types, config) {
	req.extensions = (types && typeof types !== "undefined") ? (types instanceof Array) ? types : [types] : _defTypes;
	upload.limits = extend({
		files: 2
	}, _limits, config || {});
	upload.array(field_name)(req, res, function(err) {
		//console.log(err);
		if(err || req.fileValidationError) {
			return res.send(err || req.fileValidationError);
		}
		res.json(req.files);
	});
};