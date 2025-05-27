import { v4 as uuidv4 } from 'uuid';
export const invalidBarrels = [
    {
        description: "Empty stings",
        payload: {
            qr: " ",
            rfid: " ",
            nfc: " "
        }
    },
     {
        description: "Malformed uuid",
        payload: {
            id: "3fa85f64-5717-4562-b3fc",
            qr: "abc",
            rfid: "abc",
            nfc: "abc"
        }
    },
    {
        description: "NULL values",
        payload: {
            qr: null,
            rfid: null,
            nfc: null
        }
    },
    {
        description: 'Integer values instead of string',
        payload: {
            qr: 1,
            rfid: 2,
            nfc: 3
        }
    },
    {
        description: "Missing mandatory field: qr",
        payload: {
            rfid: "cod",
            nfc: "cod2"
        }
    },
    {
        description: "Missing  mandatory field: rfid",
        payload: {
            qr: "string1s",
            nfc: "string8s"
        }
    },
    {
        description: "Missing mandatory field: nfc",
        payload: {
            qr: "string78",
            rfid: "string98",
        }
    }
];