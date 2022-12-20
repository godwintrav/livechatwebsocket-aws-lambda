import { APIGatewayProxyEvent } from "aws-lambda";
import { formatJSONResponse } from "@libs/apiGateway";
import { dynamo } from "@libs/dynamo";
import { v4 as uuid } from 'uuid';
import { UserConnectionRecord } from "src/types/dynamo";

export const handler = async (event: APIGatewayProxyEvent) => {
    try {

        const body = JSON.parse(event.body);
        const tableName = process.env.roomConnectionTable;

        const { connectionId, domainName, stage } = event.requestContext;

        if (!body.name) {
            await websocket.send({
                data: {
                    message: 'You need a "name" on createRoom',
                    type: 'err'
                }
            });
            return formatJSONResponse({

            });
        }

        const roomCode = uuid().slice(0, 8);

        const data: UserConnectionRecord = {
            id: connectionId,
            pk: roomCode,
            sk: connectionId,

            roomCode,
            name: body.name,
            domainName,
            stage
        }


        await dynamo.write(data, tableName);

        await websocket.send({
            data: {
                message: `You are now connected to room ${roomCode}`,
                type: 'info'
            }
        });

        return formatJSONResponse({
            statusCode: 201
        });


    } catch (error) {
        console.log(error);
        return formatJSONResponse({
            statusCode: 502,
            data: {
                message: error.message,
            }
        });
    }
}

