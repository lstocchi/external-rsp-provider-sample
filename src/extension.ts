import * as vscode from 'vscode';
import * as serverConnectorAPI from 'vscode-server-connector-api';
import { ExtensionAPI } from './extensionApi';
import { RSPServer } from 'vscode-server-connector-api/out/util/types';
import { ServerAPI } from 'vscode-server-connector-api/out/server/serverAPI';

export async function activate(context: vscode.ExtensionContext) : Promise<ServerAPI>{

	const api: ExtensionAPI = new ExtensionAPI();

	const rsp: RSPServer = {
		state: 0,
		type: {
			id: 'redhat.rspprovider-sample',
			visibilename: 'RSP Server (Wildfly, Eap)'
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
