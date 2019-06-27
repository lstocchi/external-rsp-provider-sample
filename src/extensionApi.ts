import * as server from './server';
import { ServerAPI } from 'vscode-server-connector-api/out/server/serverAPI';
import { ServerInfo } from 'vscode-server-connector-api/out/util/types';
import { EventEmitter } from 'events';

export class ExtensionAPI implements ServerAPI {

    private host: string;
    private port: number;
    private emitter: EventEmitter;

    public constructor() {
        this.host = '';
        this.port = 0;
        this.emitter = new EventEmitter();
    }

    public async startRSP(stdoutCallback: (data: string) => void, stderrCallback: (data: string) => void ): Promise<ServerInfo>  {
        this.updateRSPStateChanged(1);
        return await server.start(stdoutCallback, stderrCallback).then(serverInfo => {
            this.host = serverInfo.host;
            this.port = serverInfo.port;
            return serverInfo;
        });
    }

    public async stopRSP() {

    }

    private async updateRSPStateChanged(state: number): Promise<void> {
        this.emitter.emit('rspServerStateChanged', state);
    }

    public onRSPServerStateChanged(listener: (state: number) => void): void {
        this.emitter.on('rspServerStateChanged', listener);
    }

    public getHost(): string {
        return this.host;
    }

    public getPort(): number {
        return this.port;
    }
}