import { v4 as uuidv4 } from 'uuid';

export const measurements = 
[
    {
        description: "Valid data with id",
        payload: {
            id: uuidv4(),
            barrelId: "",
            dirtLevel: 1.0,
            weight: 12.0
        }
    }
];