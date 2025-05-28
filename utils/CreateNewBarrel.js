/**
 * create new barel
 * @param {accept JSON } barrel 
 * @returns barrel JSON
 */
export const createBarrel = async (barrel) => {
  try {
    const response = await fetch(`${process.env.BASE_URL}barrels/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: barrel,
    });

    console.log('createBarrel Status:', response.status);
    return  await response.json();
  } catch (error) {
    console.error('createBarrel error:', error);
    throw error;
  }
};