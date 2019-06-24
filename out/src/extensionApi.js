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
const server = require("./server");
class ExtensionAPI {
    constructor() {
        this.host = '';
        this.port = 0;
    }
    startRSP(stdoutCallback, stderrCallback) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield server.start(stdoutCallback, stderrCallback).then(serverInfo => {
                this.host = serverInfo.host;
                this.port = serverInfo.port;
                return serverInfo;
            });
        });
    }
    stopRSP() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    getHost() {
        return this.host;
    }
    getPort() {
        return this.port;
    }
}
exports.ExtensionAPI = ExtensionAPI;
//# sourceMappingURL=extensionApi.js.map