import { v4 as uuidv4 } from 'uuid';

export const invalidMeasurements = 
[
    {
        description: "Missing barrel id",
        payload: {
            id: uuidv4(),
            dirtLevel: 1.0,
            weight: 12.0
        }
    }
];