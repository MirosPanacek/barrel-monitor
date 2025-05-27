/**Return existing valid barrel id */
export const getFirstBarrelId = async () => {
    const barrels = await fetchBarrels();
    if (barrels) {
        console.log("getFirstBarrelId: " + barrels[0].id);
        return barrels[0].id;
    }
    throw "No results GET barrels/"
};
/**
 * Fetch barrels 
 * @returns  array of barrels
 */
const fetchBarrels = async () => {
    console.log("URL:" + process.env.BASE_URL);
    const response = await fetch(process.env.BASE_URL + "barrels/", {
        method: 'GET',
    });
    return await response.json();
}