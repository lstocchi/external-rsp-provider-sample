import * as server from './server';
import { ServerAPI } from 'vscode-server-connector-api/js/server/serverAPI';
import { ServerInfo } from 'vscode-server-connector-api/js/util/types';

export class ExtensionAPI implements ServerAPI {

    private host: string;
    private port: number;

    public constructor() {
        this.host = '';
        this.port = 0;
    }

    public async startRSP(stdoutCallback: (data: string) => void, stderrCallback: (data: string) => void ): Promise<ServerInfo>  {
        return await server.start(stdoutCallback, stderrCallback).then(serverInfo => {
            this.host = serverInfo.host;
            this.port = serverInfo.port;
            return serverInfo;
        });
    }

    public async stopRSP() {

    }

    public getHost(): string {
        return this.host;
    }

    public getPort(): number {
        return this.port;
    }
}