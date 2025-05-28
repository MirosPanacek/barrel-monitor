/**Return existing valid barrel id */
export const getFirstBarrelId = async () => {
    const barrels = await fetchBarrels();
    if (barrels && barrels.length > 0) {
        console.log("getFirstBarrelId: " + barrels[0].id);
        return barrels[0].id;
    }
    throw "No results GET barrels/"
};

/**
 * Fetch barrels 
 * @returns  array of barrels as JOSN
 */
const fetchBarrels = async () => {
    console.log("URL:" + process.env.BASE_URL);
    const response = await fetch(process.env.BASE_URL + "barrels/", {
        method: 'GET',
    });
    return await response.json();
}

/**
 * Verifies whether the barrelId exists in the system.
 * @param {String barel id} barrelId 
 * @returns true if barrel id is in system or false if not 
 */
export const barrelIdIsInArray = async (barrelId) => {
    const barrels = await fetchBarrels();
    return barrels.some(barrel => barrel.id === barrelId);
}

/**
 * Get barel from api
 * @param {String barel id} barrelId 
 * @returns barrel if not exist return null
 */
export const getBarrel = async (barrelId) => {
    let barel = null;
    const barrels = await fetchBarrels();
    for (const barrel of barrels) {
        if (barrel.id === barrelId) {
            return barrel;
        }
    }
    return barel;
}