"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.__esModule = true;
exports.connectToDatabase = exports.collections = void 0;
var mongodb = require("mongodb");
exports.collections = {};
function connectToDatabase(uri) {
    return __awaiter(this, void 0, void 0, function () {
        var client, db, dow30Collection;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    client = new mongodb.MongoClient(uri);
                    return [4 /*yield*/, client.connect()];
                case 1:
                    _a.sent();
                    db = client.db("test");
                    return [4 /*yield*/, applySchemaValidation(db)];
                case 2:
                    _a.sent();
                    dow30Collection = db.collection("dow30");
                    exports.collections.dow30 = dow30Collection;
                    return [2 /*return*/];
            }
        });
    });
}
exports.connectToDatabase = connectToDatabase;
function applySchemaValidation(db) {
    return __awaiter(this, void 0, void 0, function () {
        var jsonSchema;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jsonSchema = {
                        $jsonSchema: {
                            bsonType: "object",
                            required: [
                                "name",
                                "symbol",
                                "last",
                                "pe",
                                "peg",
                                "beta",
                                "shares",
                                "ebitda",
                                "mktcap",
                            ],
                            additionalProperties: false,
                            properties: {
                                _id: {},
                                name: {
                                    bsonType: "string",
                                    description: "'name' is required and is a string"
                                },
                                symbol: {
                                    bsonType: "string",
                                    description: "'symbol' is required and is a string"
                                },
                                last: {
                                    bsonType: "number",
                                    description: "'last' is required and is a number"
                                },
                                pe: {
                                    bsonType: "number",
                                    description: "'pe' is required and is a number"
                                },
                                peg: {
                                    bsonType: "number",
                                    description: "'peg' is required and is a number"
                                },
                                beta: {
                                    bsonType: "number",
                                    description: "'beta' is required and is a number"
                                },
                                shares: {
                                    bsonType: "number",
                                    description: "'shares' is required and is a number"
                                },
                                ebitda: {
                                    bsonType: "number",
                                    description: "'ebitda' is required and is a number"
                                },
                                mktcap: {
                                    bsonType: "number",
                                    description: "'mktcap' is required and is a number"
                                }
                            }
                        }
                    };
                    return [4 /*yield*/, db
                            .command({
                            collMod: "states",
                            validator: jsonSchema
                        })["catch"](function (error) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!(error.codeName === "NamespaceNotFound")) return [3 /*break*/, 2];
                                        return [4 /*yield*/, db.createCollection("states", { validator: jsonSchema })];
                                    case 1:
                                        _a.sent();
                                        _a.label = 2;
                                    case 2: return [2 /*return*/];
                                }
                            });
                        }); })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
