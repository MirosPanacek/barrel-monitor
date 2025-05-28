import { test, expect, request } from '@playwright/test';
import { createBarrel } from '../../utils/CreateNewBarrel'
import { barrelIdIsInArray } from '../../utils/GetBarrelId'
import { createMeasurement } from '../../utils/CreateNewMeasurements';
import { barrels } from '../../testingData/BarrelsPost';
import { measurements } from '../../testingData/MeasurementsPost';
import { measurementsIsInArray } from '../../utils/GetMeasurements'

let barrel;
let newMeasurements;
/**
 * Create data for TC007.
 * Create barrel with measurements
 */
test.beforeAll(async () => {
    barrel = await createBarrel(JSON.stringify(barrels[0].payload));
    measurements[0].payload.barrelId = barrel.id;
    const meas = measurements[0].payload;
    newMeasurements = await createMeasurement(meas);
});

/**
 * Test Case: TC007 Validate Successful Deletion of Barrel via DELETE /barrels/{id}
 * ID: TC006
 * Title: Validate Successful Deletion of Barrel via DELETE /barrels/{id}
 * Preconditions:
 *   - A barrel with the specified ID exists
 *   - API endpoint /barrels/ is available
 * Test Data:
 *   - Existing barrel ID from previous test or setup
 * Steps:
 *   - Send DELETE request to /barrels/{id}
 *   - Verify response status is 204 (No Content)
 *   - Optionally, send GET request to /barrels/{id} to confirm deletion
 *   - Verify GET response status is 404 (Not Found)
 * Expected Result:
 *   - DELETE response status is 204
 *   - Subsequent GET response status is 404, confirming barrel was deleted
 */
//TODO data driven
test('TC007 Validate Successful Deletion of Barrel via DELETE /barrels/{id}', async ({ request }) => {
    console.log(`Barel id: ${barrel.id}`);
    const response = await request.delete(`barrels/${barrel.id}`);
    expect(response.status()).toBe(204);
    //check if barrel is deleted and no measurements are there
    expect(await barrelIdIsInArray(barrel.id)).toBeFalsy();
    expect(await measurementsIsInArray(newMeasurements.id)).toBeFalsy();
});

/**
 * Test Case: TC008 Validate Deletion Attempt with Incorrect Barrel ID via DELETE /barrels/{id}
 * ID: TC007
 * Title: Validate Deletion Attempt with Incorrect Barrel ID via DELETE /barrels/{id}
 * Preconditions:
 *   - API endpoint /barrels/ is available
 * Test Data:
 *   - Without paramet, Non-existent or malformed barrel ID
 * Steps:
 *   - Send DELETE request to /barrels/{incorrect_id}
 *   - Verify response status is 404 (Not Found) or appropriate error code
 *   - Validate error message in response body (if applicable)
 * Expected Result:
 *   - Response status is 404 or relevant error code
 *   - Response body contains error message indicating barrel not found
 */
//TODO data driven
test('TC008 Validate Deletion Attempt with Incorrect Barrel ID via DELETE /barrels/{id}', async ({ request }) => {
    const response = await request.delete(`barrels/985aa092-1c83-41ff-b1d4-14ee41aa3007`);
    expect(response.status()).toBe(404);
});