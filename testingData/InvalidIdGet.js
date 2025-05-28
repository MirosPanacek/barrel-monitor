export const invalidId = [
    {
        description: "SQL injection",
        payload: {
            id: "'or 1=1;-- "
        }
    },
    {
        description: "Random uuid",
        payload: {
            id: "985aa092-1c83-41ff-b1d4-14ee41aa3007",
        }
    },
    {
        description: "Malformed uuid",
        payload: {
            id: "72193603-1a49-41e9-af88",
        }
    }
]