(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["src-app-upload-upload-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/upload/main-upload/upload.component.html":
/*!************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/upload/main-upload/upload.component.html ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fuild\">\r\n\r\n    <div class=\"container\" fxLayout=\"column\" fxLayoutAlign=\"space-evenly stretch\">\r\n        <h1 mat-dialog-title class=\"my-2 text-center\">Upload Files</h1>\r\n        <div class=\"outside\">\r\n            <div class=\"inside position-relative\">\r\n                <div id=\"drop_zone\">Drop files here</div>\r\n                <input type=\"file\" #file class=\"hide position-absolute w-100\"\r\n                    (change)=\"onChange($event)\" multiple [disabled]=\"acceptUpload\"/>\r\n            </div>\r\n        </div>\r\n        <button class=\"my-1\"\r\n            mat-raised-button color=\"primary\"\r\n            [disabled]=\"!uploading\" (click)=\"upload()\">\r\n            {{ primaryButtonText }}\r\n        </button>\r\n        <button class=\"my-1\"\r\n            mat-raised-button [disabled]=\"!showResetButton\"\r\n            color=\"success\" (click)=\"onReset()\">\r\n            Reset\r\n        </button>\r\n    </div>\r\n    <br>\r\n    <div class=\"wrapper\">\r\n        <mat-list>\r\n            <h3 mat-subheader>Upload Files \r\n                <span class=\"w-100 text-right\">Total: {{ (files.size) ? files.size : 0 }} files</span>\r\n            </h3>\r\n            <div class=\"content_zone\">\r\n                <ng-container *ngFor=\"let file of files; trackBy: trackByFn\">\r\n                    <mat-list-item>\r\n                        <mat-icon mat-list-icon>note</mat-icon>\r\n                        <h4 mat-line>{{file.name}}</h4>\r\n                        <p *ngIf=\"progress && !uploading\" mat-line class=\"percent\"> {{ (progress[file.name]?.progress | async) | percentcustom }}</p>\r\n                        <div mat-line>\r\n                            <mat-progress-bar\r\n                                *ngIf=\"progress && !uploading\"\r\n                                mode=\"determinate\"\r\n                                [value]=\"progress[file.name]?.progress | async\">\r\n                            </mat-progress-bar>\r\n                        </div>\r\n                    </mat-list-item>\r\n                    <mat-divider></mat-divider>\r\n                </ng-container>\r\n            </div>\r\n            <mat-divider></mat-divider>\r\n            <h3 mat-subheader>Folders\r\n                <span class=\"w-100 text-right\">Total: {{ (sysFiles.size) ? sysFiles.size : 0 }} folders</span>\r\n            </h3>\r\n            <div class=\"content_zone\">\r\n                <ng-container *ngFor=\"let file of sysFiles; trackBy: trackByFn\">\r\n                    <mat-list-item>\r\n                        <mat-icon mat-list-icon>folder</mat-icon>\r\n                        <h4 mat-line>{{ file }}</h4>\r\n                        <p mat-line> {{ today | date }} </p>\r\n                        <ng-container [ngTemplateOutlet]=\"menuFile\"\r\n                            [ngTemplateOutletContext]=\"{ file: file }\">\r\n                        </ng-container>\r\n                    </mat-list-item>\r\n                </ng-container>\r\n            </div>\r\n        </mat-list>\r\n    </div>\r\n    <br>\r\n</div>\r\n\r\n\r\n<ng-template #menuFile let-file=\"file\">\r\n    <div class=\"w-100 text-right\">\r\n        <button mat-icon-button [matMenuTriggerFor]=\"menu\" aria-label=\"menu\">\r\n            <mat-icon>more_vert</mat-icon>\r\n        </button>\r\n        <mat-menu xPosition=\"before\" #menu=\"matMenu\">\r\n            <a class=\"text-decoration-none text-dark\" \r\n                [href]=\"fileUrl + file\" target=\"_blank\" \r\n                mat-menu-item \r\n                download=\"{{ file }}\">\r\n                <mat-icon>save_alt</mat-icon>\r\n                <span>DOWNLOAD</span>\r\n            </a>\r\n            <a  class=\"text-decoration-none text-dark\" \r\n                mat-menu-item routerLink=\"/storages\">\r\n                <mat-icon>visibility</mat-icon>\r\n                <span>PREVIEW</span>\r\n            </a>\r\n            <button mat-menu-item (click)=\"onDelete(file)\">\r\n                <mat-icon>delete_sweep</mat-icon>\r\n                <span>DELETE</span>\r\n            </button>\r\n        </mat-menu>\r\n    </div>\r\n</ng-template>"

/***/ }),

/***/ "./src/app/pipe/percent.pipe.ts":
/*!**************************************!*\
  !*** ./src/app/pipe/percent.pipe.ts ***!
  \**************************************/
/*! exports provided: PercentPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PercentPipe", function() { return PercentPipe; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var PercentPipe = /** @class */ (function () {
    function PercentPipe() {
    }
    PercentPipe.prototype.transform = function (value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (value) {
            return (value === 100) ? value + "% (Finish !!!)" : value + "%";
        }
        else {
            return 0 + "%";
        }
    };
    PercentPipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
            name: 'percentcustom'
        })
    ], PercentPipe);
    return PercentPipe;
}());



/***/ }),

/***/ "./src/app/upload/main-upload/upload.component.css":
/*!*********************************************************!*\
  !*** ./src/app/upload/main-upload/upload.component.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".outside {\r\n    overflow: hidden;\r\n    padding: 10px;\r\n    border: 1px solid #ccc;\r\n}\r\n\r\n.inside, input[type='file'] {\r\n    border: 2px dashed #bbb;\r\n    -moz-border-radius: 5px;\r\n    -webkit-border-radius: 5px;\r\n    padding: 5em 0;\r\n    border-radius: 5px;\r\n    text-align: center;\r\n    font: 20pt bold 'Vollkorn';\r\n    color: #bbb;\r\n}\r\n\r\n.drop_zone {\r\n    z-index: 1;\r\n}\r\n\r\n.drop_zone {\r\n    padding: 5em 0;\r\n}\r\n\r\ninput[type='file'] {\r\n    top: 0;\r\n    left: 0;\r\n    right: 0;\r\n    bottom: 0;\r\n    opacity: 0;\r\n}\r\n\r\n.content_zone {\r\n    max-height: 35vh;\r\n    overflow-y: auto;\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdXBsb2FkL21haW4tdXBsb2FkL3VwbG9hZC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksZ0JBQWdCO0lBQ2hCLGFBQWE7SUFDYixzQkFBc0I7QUFDMUI7O0FBRUE7SUFDSSx1QkFBdUI7SUFDdkIsdUJBQXVCO0lBQ3ZCLDBCQUEwQjtJQUMxQixjQUFjO0lBQ2Qsa0JBQWtCO0lBQ2xCLGtCQUFrQjtJQUNsQiwwQkFBMEI7SUFDMUIsV0FBVztBQUNmOztBQUVBO0lBQ0ksVUFBVTtBQUNkOztBQUVBO0lBQ0ksY0FBYztBQUNsQjs7QUFFQTtJQUNJLE1BQU07SUFDTixPQUFPO0lBQ1AsUUFBUTtJQUNSLFNBQVM7SUFDVCxVQUFVO0FBQ2Q7O0FBRUE7SUFDSSxnQkFBZ0I7SUFDaEIsZ0JBQWdCO0FBQ3BCIiwiZmlsZSI6InNyYy9hcHAvdXBsb2FkL21haW4tdXBsb2FkL3VwbG9hZC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm91dHNpZGUge1xyXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgIHBhZGRpbmc6IDEwcHg7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xyXG59XHJcblxyXG4uaW5zaWRlLCBpbnB1dFt0eXBlPSdmaWxlJ10ge1xyXG4gICAgYm9yZGVyOiAycHggZGFzaGVkICNiYmI7XHJcbiAgICAtbW96LWJvcmRlci1yYWRpdXM6IDVweDtcclxuICAgIC13ZWJraXQtYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gICAgcGFkZGluZzogNWVtIDA7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBmb250OiAyMHB0IGJvbGQgJ1ZvbGxrb3JuJztcclxuICAgIGNvbG9yOiAjYmJiO1xyXG59XHJcblxyXG4uZHJvcF96b25lIHtcclxuICAgIHotaW5kZXg6IDE7XHJcbn1cclxuXHJcbi5kcm9wX3pvbmUge1xyXG4gICAgcGFkZGluZzogNWVtIDA7XHJcbn1cclxuXHJcbmlucHV0W3R5cGU9J2ZpbGUnXSB7XHJcbiAgICB0b3A6IDA7XHJcbiAgICBsZWZ0OiAwO1xyXG4gICAgcmlnaHQ6IDA7XHJcbiAgICBib3R0b206IDA7XHJcbiAgICBvcGFjaXR5OiAwO1xyXG59XHJcblxyXG4uY29udGVudF96b25lIHtcclxuICAgIG1heC1oZWlnaHQ6IDM1dmg7XHJcbiAgICBvdmVyZmxvdy15OiBhdXRvO1xyXG59Il19 */"

/***/ }),

/***/ "./src/app/upload/main-upload/upload.component.ts":
/*!********************************************************!*\
  !*** ./src/app/upload/main-upload/upload.component.ts ***!
  \********************************************************/
/*! exports provided: UploadComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UploadComponent", function() { return UploadComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var src_app_upload_main_upload_upload_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/upload/main-upload/upload.service */ "./src/app/upload/main-upload/upload.service.ts");
/* harmony import */ var src_app_alert_alert_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/alert/alert.component */ "./src/app/alert/alert.component.ts");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/snack-bar */ "./node_modules/@angular/material/esm5/snack-bar.es5.js");
/* harmony import */ var src_app_storage_main_storage_storage_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/storage/main-storage/storage.service */ "./src/app/storage/main-storage/storage.service.ts");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");









var UploadComponent = /** @class */ (function () {
    function UploadComponent(_uploadService, _storageService, _snackBar) {
        this._uploadService = _uploadService;
        this._storageService = _storageService;
        this._snackBar = _snackBar;
        this.fileUrl = src_environments_environment__WEBPACK_IMPORTED_MODULE_8__["environment"].api + "/storages/download?filename=";
        this.files = new Set();
        this.sysFiles = new Set();
        this.primaryButtonText = 'Upload';
        this.showResetButton = false;
        this.uploading = false;
        this.acceptUpload = false;
        this.today = Date.now();
    }
    UploadComponent.prototype.ngOnInit = function () {
        this.onGetFiles();
    };
    UploadComponent.prototype.onFn = function (message) {
        this._snackBar.openFromComponent(src_app_alert_alert_component__WEBPACK_IMPORTED_MODULE_5__["AlertComponent"], {
            duration: 3 * 1000,
            data: { message: message, action: 'Upload' }
        });
    };
    UploadComponent.prototype.onReset = function () {
        this.uploading = false;
        this.acceptUpload = false;
        this.showResetButton = false;
        this.primaryButtonText = 'Upload';
        this.file.nativeElement.value = '';
        this.files.clear();
    };
    UploadComponent.prototype.onGetFiles = function () {
        var _this = this;
        this.file.nativeElement.value = '';
        this._storageService.getStorages()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["debounceTime"])(1000), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["distinctUntilChanged"])())
            .subscribe(function (res) {
            var e_1, _a;
            try {
                for (var res_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__values"](res), res_1_1 = res_1.next(); !res_1_1.done; res_1_1 = res_1.next()) {
                    var name_1 = res_1_1.value;
                    _this.sysFiles.add(name_1);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (res_1_1 && !res_1_1.done && (_a = res_1.return)) _a.call(res_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        });
    };
    UploadComponent.prototype.onChange = function (e) {
        this.uploading = true;
        this.showResetButton = true;
        var files = this.file.nativeElement.files;
        for (var key in files) {
            if (!isNaN(parseInt(key))) {
                this.files.add(files[key]);
            }
        }
    };
    UploadComponent.prototype.upload = function () {
        var _this = this;
        this.uploading = false;
        this.acceptUpload = true;
        this.showResetButton = false;
        // start the upload and save the progress map
        this.progress = this._uploadService.upload(this.files);
        // convert the progress map into an array
        var allProgressObservables = [];
        for (var key in this.progress) {
            allProgressObservables.push(this.progress[key].progress);
        }
        // When all progress-observables are completed...
        Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["forkJoin"])(allProgressObservables)
            .subscribe(function (end) {
            _this.onFn('Finish !!!');
            _this.onGetFiles();
            // The OK-button should have the text "Finish" now
            _this.primaryButtonText = 'Finish';
            // ... the dialog can be closed again...
            _this.showResetButton = true;
        });
    };
    UploadComponent.prototype.onDelete = function (name) {
        var _this = this;
        this._storageService.deleteFile(name)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["debounceTime"])(1000), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["distinctUntilChanged"])())
            .subscribe(function (res) {
            _this.sysFiles.delete(name);
            _this.onFn(res.message);
        }, function (error) { return _this.onFn(error); });
    };
    UploadComponent.prototype.trackByFn = function (index, item) {
        return item; // or item.id
    };
    UploadComponent.ctorParameters = function () { return [
        { type: src_app_upload_main_upload_upload_service__WEBPACK_IMPORTED_MODULE_4__["UploadService"] },
        { type: src_app_storage_main_storage_storage_service__WEBPACK_IMPORTED_MODULE_7__["StorageService"] },
        { type: _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_6__["MatSnackBar"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('file', { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], UploadComponent.prototype, "file", void 0);
    UploadComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-upload',
            template: __webpack_require__(/*! raw-loader!./upload.component.html */ "./node_modules/raw-loader/index.js!./src/app/upload/main-upload/upload.component.html"),
            styles: [__webpack_require__(/*! ./upload.component.css */ "./src/app/upload/main-upload/upload.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_upload_main_upload_upload_service__WEBPACK_IMPORTED_MODULE_4__["UploadService"],
            src_app_storage_main_storage_storage_service__WEBPACK_IMPORTED_MODULE_7__["StorageService"],
            _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_6__["MatSnackBar"]])
    ], UploadComponent);
    return UploadComponent;
}());



/***/ }),

/***/ "./src/app/upload/upload-routing.module.ts":
/*!*************************************************!*\
  !*** ./src/app/upload/upload-routing.module.ts ***!
  \*************************************************/
/*! exports provided: UploadRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UploadRoutingModule", function() { return UploadRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _main_upload_upload_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./main-upload/upload.component */ "./src/app/upload/main-upload/upload.component.ts");




var routes = [
    {
        path: '',
        component: _main_upload_upload_component__WEBPACK_IMPORTED_MODULE_3__["UploadComponent"],
        data: { title: 'Upload' }
    }
];
var UploadRoutingModule = /** @class */ (function () {
    function UploadRoutingModule() {
    }
    UploadRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], UploadRoutingModule);
    return UploadRoutingModule;
}());



/***/ }),

/***/ "./src/app/upload/upload.module.ts":
/*!*****************************************!*\
  !*** ./src/app/upload/upload.module.ts ***!
  \*****************************************/
/*! exports provided: UploadModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UploadModule", function() { return UploadModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _main_upload_upload_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./main-upload/upload.component */ "./src/app/upload/main-upload/upload.component.ts");
/* harmony import */ var _upload_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./upload-routing.module */ "./src/app/upload/upload-routing.module.ts");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var src_app_pipe_percent_pipe__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/pipe/percent.pipe */ "./src/app/pipe/percent.pipe.ts");
/* harmony import */ var src_app_shared_material_material_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/shared/material/material-module */ "./src/app/shared/material/material-module.ts");








var UploadModule = /** @class */ (function () {
    function UploadModule() {
    }
    UploadModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_main_upload_upload_component__WEBPACK_IMPORTED_MODULE_3__["UploadComponent"], src_app_pipe_percent_pipe__WEBPACK_IMPORTED_MODULE_6__["PercentPipe"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _upload_routing_module__WEBPACK_IMPORTED_MODULE_4__["UploadRoutingModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_5__["FlexLayoutModule"],
                src_app_shared_material_material_module__WEBPACK_IMPORTED_MODULE_7__["MaterialModule"]
            ],
            schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["CUSTOM_ELEMENTS_SCHEMA"]]
        })
    ], UploadModule);
    return UploadModule;
}());



/***/ })

}]);
//# sourceMappingURL=src-app-upload-upload-module-es5.js.map