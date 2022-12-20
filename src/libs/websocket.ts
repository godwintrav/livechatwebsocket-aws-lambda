import {
    ApiGatewayManagementApi,
    PostToConnectionCommand,
    PostToConnectionCommandInput
} from '@aws-sdk/client-apigatewaymanagementapi';

export const websocket = {
    send: ({
        data,
        connectionId,
        domainName,
        stage
    }: {
        data: {
            message?: string;
            type?: string;
            from?: string;

        };
        connectionId: string;
        domainName: string;
        stage: string;
    }) => {

        const client = new ApiGatewayManagementApi({
            endpoint: `https://${domainName}/${stage}`
        });

        const params: PostToConnectionCommandInput = {
            ConnectionId: connectionId,
            Data: JSON.stringify(data) as any,
        }

        const command = new PostToConnectionCommand(params);

        return client.send(command);
    }
}