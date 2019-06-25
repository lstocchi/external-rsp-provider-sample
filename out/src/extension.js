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
function activate(context) {
    return __awaiter(this, void 0, void 0, function* () {
        const api = new extensionApi_1.ExtensionAPI();
        const rsp = {
            state: 0,
            type: {
                id: 'redhat.rspprovider-sample',
                visibilename: 'RSP Server (Wildfly, Eap, Minishift)'
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