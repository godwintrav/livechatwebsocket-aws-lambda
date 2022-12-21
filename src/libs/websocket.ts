import {
    ApiGatewayManagementApi,
    PostToConnectionCommand,
    PostToConnectionCommandInput
} from '@aws-sdk/client-apigatewaymanagementapi';

export const websocket = {

    createClient: ({
        domainName,
        stage
    }: {
        domainName: string;
        stage: string;
    }) => {
        const client = new ApiGatewayManagementApi({
            endpoint: `https://${domainName}/${stage}`
        });
        return client;
    },

    send: ({
        data,
        connectionId,
        domainName,
        stage,
        client,
    }: {
        data: {
            message?: string;
            type?: string;
            from?: string;
            endpoint?: string;

        };
        connectionId: string;
        domainName?: string;
        stage?: string;
        client?: ApiGatewayManagementApi;
    }) => {

        if (!client) {
            if (!domainName || !stage) {
                throw Error('domainName and stage is required when no client is provided');
            }
            client = websocket.createClient({ domainName, stage });
        }

        const params: PostToConnectionCommandInput = {
            ConnectionId: connectionId,
            Data: JSON.stringify(data) as any,
        }

        const command = new PostToConnectionCommand(params);

        return client.send(command);
    }
}