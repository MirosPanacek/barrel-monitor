import { v4 as uuidv4 } from 'uuid';

export const barrels = [
    {
        description: "Valid data with id",
        payload: {
            id: uuidv4(),
            qr: "test4",
            rfid: "test2",
            nfc: "test3"
        }
    },
    {
        description: "Valid data missing id",
        payload: {
            qr: "test1",
            rfid: "test2",
            nfc: "test3"
        }
    },
    {
        description: "Minimum length of values",
        payload: {
            qr: "string",
            rfid: "string",
            nfc: "string"
        }
    },
    {
        description: "Special characters: '",
        payload: {
            qr: "string's",
            rfid: "string's",
            nfc: "string's"
        }
    },
    {
        description: "Special characters: \"",
        payload: {
            qr: "string's",
            rfid: "string's",
            nfc: "string's"
        }
    },
    {
        description: "Special characters: %",
        payload: {
            qr: "string%s",
            rfid: "string%s",
            nfc: "string%s"
        }
    },
    {
        description: "Special characters: @",
        payload: {
            qr: "string@s",
            rfid: "string@s",
            nfc: "string@s"
        }
    },
    {
        description: "Special characters: : / \\",
        payload: {
            qr: "string: / \\s",
            rfid: "string: / \\s",
            nfc: "string: / \\s"
        }
    },
    {
        description: "Valid data with extra int field",
        payload: {
            id: uuidv4(),
            qr: "test4",
            rfid: "test2",
            nfc: "test3",
            row: 124
        }
    },
    {
        description: "Valid data with extra string field",
        payload: {
            id: uuidv4(),
            qr: "test4",
            rfid: "test2",
            nfc: "test3",
            row: "text"
        }
    }
];