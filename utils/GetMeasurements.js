/**Return existing valid barrel id */
export const getFirstMeasurementId = async () => {
    const measurements = await fetchMeasurement();
    if (measurements && measurements.length > 0) {
        console.log("getFirstMeasurementlId: " + measurements[0].id);
        return measurements[0].id;
    }
    throw "No results GET measurements/"
};

/**
 * Fetch barrels 
 * @returns  array of barrels as JOSN
 */
const fetchMeasurement = async () => {
    console.log("URL:" + process.env.BASE_URL);
    const response = await fetch(process.env.BASE_URL + "measurements/", {
        method: 'GET',
    });
    return await response.json();
}

/**
 * Verifies whether the measurements ID exists in the system.
 * @param {String barel id} measurementsId 
 * @returns true if measurements id is in system or false if not 
 */
export const measurementsIsInArray = async (barrelId) => {
    const barrels = await fetchMeasurement();
    return barrels.some( barrel => barrel.id === barrelId);
}