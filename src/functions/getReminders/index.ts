import { APIGatewayProxyEvent } from "aws-lambda";
import { formatJSONResponse } from "@libs/apiGateway";
import { dynamo } from "@libs/dynamo";
import { v4 as uuid } from 'uuid';

export const handler = async (event: APIGatewayProxyEvent) => {
    try {

        const tableName = process.env.roomConnectionTable;

        const { userId } = event.pathParameters || {};

        if (!userId) {
            return formatJSONResponse({
                statusCode: 400,
                data: { message: "missing userId in path" },
            });
        }

        const data = await dynamo.query({ tableName, index: "index1", pkValue: userId });

        return formatJSONResponse({
            data,
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

const validateInputs = ({ email, phoneNumber, reminder, reminderDate }: { email?: string; phoneNumber?: string; reminder: string; reminderDate: number; }) => {

    if (!email && !phoneNumber) {
        return formatJSONResponse({
            statusCode: 400,
            data: {
                message: 'email or phone number is required to create a reminder'
            }
        });
    }

    if (!reminder) {
        return formatJSONResponse({
            statusCode: 400,
            data: {
                message: 'Reminder text is required to create a reminder'
            }
        });
    }

    if (!reminderDate) {
        return formatJSONResponse({
            statusCode: 400,
            data: {
                message: 'reminderDate is required to create a reminder'
            }
        });
    }

    return;
};