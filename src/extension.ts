import * as vscode from 'vscode';
import * as serverConnectorAPI from 'vscode-server-connector-api';
import { RSPState } from 'vscode-server-connector-api/js/util/types';
import { ExtensionAPI } from './extensionApi';
import { ServerAPI } from 'vscode-server-connector-api/js/server/serverAPI';

export async function activate(context: vscode.ExtensionContext) : Promise<ServerAPI>{

	const api: ExtensionAPI = new ExtensionAPI();

	const rsp: RSPState = {
		state: 0,
		serverStates: [],
		type: {
			id: 'redhat.rspprovider-sample',
			visibilename: 'RSP Server (Wildfly, Eap, Minishift)'
		}
	};
	const serverConnector = await serverConnectorAPI.extension.RSPProvider.api;

	if (serverConnector.available) {
		
		serverConnector.api.registerRSPProvider(rsp).catch((x: string) =>
			console.log('error' + x));
	}

	return api;
}

// this method is called when your extension is deactivated
export function deactivate() {}
