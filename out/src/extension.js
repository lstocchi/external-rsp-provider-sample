"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const serverConnectorAPI = require("vscode-server-connector-api");
const extensionApi_1 = require("./extensionApi");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    return __awaiter(this, void 0, void 0, function* () {
        // Use the console to output diagnostic information (console.log) and errors (console.error)
        // This line of code will only be executed once when your extension is activated
        console.log('Congratulations, your extension "helloworld-sample" is now active!');
        const api = new extensionApi_1.ExtensionAPI();
        const rsp = {
            state: 0,
            serverStates: [],
            type: {
                id: 'id',
                visibilename: 'rsp 1'
            }
        };
        const serverConnector = yield serverConnectorAPI.extension.RSPProvider.api;
        if (serverConnector.available) {
            serverConnector.api.registerRSPProvider(rsp).catch((x) => console.log('error' + x));
        }
        return api;
    });
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map