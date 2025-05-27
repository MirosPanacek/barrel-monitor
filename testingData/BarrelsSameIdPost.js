import { getFirstBarrelId } from '../utils/GetBarrelId';

export const barrelWithSameId = async () => {
    const sameId = await getFirstBarrelId();
    return {
        description: "Barrel with existing id.",
        payload: {
            id: sameId,
            qr: "test4",
            rfid: "test2",
            nfc: "test3"
        }
    };
};
