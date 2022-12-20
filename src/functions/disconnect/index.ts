import { APIGatewayProxyEvent } from "aws-lambda";
import { formatJSONResponse } from "@libs/apiGateway";
import { dynamo } from "@libs/dynamo";

export const handler = async (event: APIGatewayProxyEvent) => {
    try {
        const tableName = process.env.roomConnectionTable;

        const { connectionId } = event.requestContext;

        await dynamo.delete(connectionId, tableName);

        return formatJSONResponse({
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

