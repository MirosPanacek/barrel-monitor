export const removeBarrel = async (barrelId) => {
    console.log(barrelId); 
    const response = await fetch(process.env.BASE_URL + "barrels/"+ barrelId, {
            method: 'DELETE',
        });
        console.log('removeBarrel Status:', response.status);
};