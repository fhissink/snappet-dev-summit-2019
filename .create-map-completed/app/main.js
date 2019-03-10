var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define(["require", "exports", "esri/Map", "esri/views/MapView", "esri/layers/FeatureLayer", "esri/widgets/Legend", "esri/core/promiseUtils", "./utils/province-colors", "./utils/popup-template"], function (require, exports, Map, MapView, FeatureLayer, Legend, promiseUtils, province_colors_1, popup_template_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var App = /** @class */ (function () {
        function App() {
            this.placeholder = 'viewDiv';
            this.url = 'https://services.arcgis.com/nSZVuSZjHpEZZbRo/arcgis/rest/services/Provincies/FeatureServer/0';
        }
        Object.defineProperty(App.prototype, "renderer", {
            get: function () {
                return {
                    type: 'unique-value',
                    field: 'OMSCHRIJVI',
                    uniqueValueInfos: province_colors_1.provinceColors.map(function (_a) {
                        var name = _a.name, color = _a.color;
                        return ({
                            value: name,
                            label: name,
                            symbol: {
                                type: 'simple-fill',
                                color: color,
                                style: 'solid',
                                outline: {
                                    color: province_colors_1.defaultColor,
                                    width: 2
                                }
                            }
                        });
                    })
                };
            },
            enumerable: true,
            configurable: true
        });
        App.prototype.start = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.createMap()];
                        case 1:
                            _a.sent();
                            this.addLayerToMap();
                            this.registerClickHandler();
                            this.addLegend();
                            this.addPopup();
                            return [2 /*return*/];
                    }
                });
            });
        };
        App.prototype.createMap = function () {
            var _this = this;
            return promiseUtils.create((function (resolve) {
                _this.map = new Map({
                    basemap: 'dark-gray-vector'
                });
                _this.view = new MapView({
                    map: _this.map,
                    container: _this.placeholder,
                    center: [5.12, 52.09],
                    zoom: 6
                });
                _this.view.when(function () {
                    resolve();
                });
            }));
        };
        App.prototype.addLayerToMap = function () {
            this.layer = new FeatureLayer({
                url: this.url,
                title: 'Provincies',
                renderer: this.renderer
            });
            this.map.add(this.layer);
        };
        App.prototype.registerClickHandler = function () {
            var _this = this;
            var highlight;
            this.view.on('click', function (event) { return __awaiter(_this, void 0, void 0, function () {
                var response, layerResults, graphics, layerView;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (highlight) {
                                highlight.remove();
                            }
                            return [4 /*yield*/, this.view.hitTest(event)];
                        case 1:
                            response = _a.sent();
                            layerResults = response.results.filter(function (result) { return result.graphic.layer === _this.layer; });
                            graphics = layerResults.map(function (result) { return result.graphic; });
                            if (graphics.length === 0) {
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.view.whenLayerView(this.layer)];
                        case 2:
                            layerView = _a.sent();
                            highlight = layerView.highlight(graphics);
                            return [2 /*return*/];
                    }
                });
            }); });
        };
        App.prototype.addLegend = function () {
            var legend = new Legend({
                view: this.view,
                layerInfos: [{
                        layer: this.layer
                    }]
            });
            this.view.ui.add(legend, 'bottom-left');
        };
        App.prototype.addPopup = function () {
            this.layer.popupTemplate = popup_template_1.template;
            this.view.popup = {
                dockEnabled: true,
                dockOptions: {
                    buttonEnabled: false,
                    breakpoint: false,
                    position: 'top-right'
                }
            };
        };
        return App;
    }());
    exports.App = App;
});
//# sourceMappingURL=main.js.map