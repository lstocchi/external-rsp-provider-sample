/*-----------------------------------------------------------------------------------------------
 *  Copyright (c) Red Hat, Inc. All rights reserved.
 *  Licensed under the EPL v2.0 License. See LICENSE file in the project root for license information.
 *-----------------------------------------------------------------------------------------------*/
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const cp = require("child_process");
const path = require("path");
const portfinder = require("portfinder");
const requirements = require("./requirements");
const vscode = require("vscode");
const waitOn = require("wait-on");
let javaHome;
let port;
function start(stdoutCallback, stderrCallback) {
    return requirements.resolveRequirements()
        .catch(error => {
        // show error
        vscode.window.showErrorMessage(error.message, error.label)
            .then(selection => {
            if (error.label && error.label === selection && error.openUrl) {
                vscode.commands.executeCommand('vscode.open', error.openUrl);
            }
        });
        // rethrow to disrupt the chain.
        throw error;
    })
        .then(requirements => {
        javaHome = requirements.java_home;
        return portfinder.getPortPromise();
    })
        .then(serverPort => {
        port = serverPort;
        const serverLocation = getServerLocation(process);
        startServer(serverLocation, serverPort, javaHome, stdoutCallback, stderrCallback);
        // return  new Promise(resolve=>{
        //  setTimeout(resolve, 5000)
        // });
        return waitOn({ resources: [`tcp:localhost:${serverPort}`] });
    })
        .then(() => {
        if (!port) {
            return Promise.reject('Could not allocate a port for the rsp server to listen on.');
        }
        else {
            return Promise.resolve({
                port: port,
                host: 'localhost'
            });
        }
    })
        .catch(error => {
        console.log(error);
        return Promise.reject(error);
    });
}
exports.start = start;
function getServerLocation(process) {
    return process.env.RSP_SERVER_LOCATION ?
        process.env.RSP_SERVER_LOCATION : path.resolve(__dirname, '..', '..', 'server');
}
function startServer(location, port, javaHome, stdoutCallback, stderrCallback) {
    const felix = path.join(location, 'bin', 'felix.jar');
    const java = path.join(javaHome, 'bin', 'java');
    // Debuggable version
    // const process = cp.spawn(java, [`-Xdebug`, `-Xrunjdwp:transport=dt_socket,server=y,address=8001,suspend=y`, `-Drsp.server.port=${port}`, '-jar', felix], { cwd: location });
    // Production version
    const process = cp.spawn(java, [`-Drsp.server.port=${port}`, '-jar', felix], { cwd: location });
    process.stdout.on('data', stdoutCallback);
    process.stderr.on('data', stderrCallback);
}
//# sourceMappingURL=server.js.map