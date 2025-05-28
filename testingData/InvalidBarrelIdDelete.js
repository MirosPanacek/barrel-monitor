import { v4 as uuidv4 } from 'uuid';
export const invalidBarrelsId = [
    {
        description: "Empty stings",
        payload: {
            id: " "
        }
    },
    {
        description: "SQL injection",
        payload: {
            id: "'or 1=1;-- "
        }
    },
    {
        description: "Random uuid",
        payload: {
            id: uuidv4(),
        }
    }
]