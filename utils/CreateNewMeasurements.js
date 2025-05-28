/**
 * Create measurements valid values
 * @param {JSON messurement} measurement 
 * @returns 
 */
export const createMeasurement = async (measurement) => {
  try {
    const response = await fetch(`${process.env.BASE_URL}measurements/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: measurement,
    });

    console.log('createMeasurement Status:', response.status);
    return  await response.json();
    
  } catch (error) {
    console.error('createMeasurement error:', error);
    throw error;
  }
};