import type { AWS } from '@serverless/typescript';

const functions: AWS["functions"] = {
    createRoom: {
        handler: 'src/functions/createRoom/index.handler',
        events: [
            {
                websocket: {
                    route: "createRoom",
                }
            },
        ],
    }
};

export default functions;