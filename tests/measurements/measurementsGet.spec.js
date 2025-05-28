import { test, expect, request } from '@playwright/test';
import { SchemaValidator } from '../../utils/SchemaValidator';
import { getFirstMeasurementId } from '../../utils/GetMeasurements'
import { invalidId } from "../../testingData/InvalidIdGet";

let skipTests = false;
/**
 * This value is for TC013
 */
let measurementId;

/**
 * set measurements id for TC013 and TC014
 */
test.beforeAll(async () => {
    try {
        measurementId = await getFirstMeasurementId();
    } catch (error) {
        console.error("GET /measurements no data for tests TC013 and TC014");
        skipTests = true;
    }
});

/**
 * Test Case: TC012 Validate Successful Retrieval of Array of Measurements via GET /measurements 
 * ID: TC012
 * Title:  Validate Successful Retrieval of Array of Measurements via GET /measurements 
 * Preconditions:
 *  - API endpoint /barrels/ is available
 * Steps:
 *  - Send GET request to /measurements
 *  - Parse response JSON
 *  - Validate response against MeasurementsArray.schema.json schema
 *  - Check response status is 200
 * Expected Result:
 *  - Response status is 200
 *  - Response body matches MeasurementsArray.schema.json schema
 */
test(`TC012 Validate Successful Retrieval of Array of Measurements via GET /measurements`, async ({ request }) => {
    const response = await request.get('measurements/');
    expect(response.status()).toBe(200);//response satus code validation 
    const json = await response.json();
    console.log(json)
    const validator = new SchemaValidator();
    validator.validateSchema(json, 'MeasurementsArray.schema.json', ['Measurement.schema.json']);
});

/**
* Test Case: TC013 Validate Successful Retrieval of Measurements via GET /measurements/{id}
* ID: TC013
* Title: Validate Successful Retrieval of Measurement via GET /measurements/{id}
* Preconditions:
*  - API endpoint /measurements/ is available
* Test Data:
*   from api
* Steps:
 *  - Send GET request to /measurements/{id}
 *  - Parse response JSON
 *  - Validate response against Measurement.schema.json schema
 *  - Check response status is 200
 * Expected Result:
 *  - Response status is 200
 *  - Response body matches Measurement.schema.json schema
*/
test(`TC013 Validate Successful Retrieval of Measurements via GET /measurements/{id}`, async ({ request }) => {
    test.skip(skipTests, "No Measurements on api");
    console.log(`Running test with measurement id: ${measurementId}`);
    const response = await request.get(`measurements/${measurementId}`);
    expect(response.status()).toBe(200);//response satus code validation 
    const json = await response.json();
    console.log(json)
    const validator = new SchemaValidator();
    validator.validateSchema(json, 'Measurement.schema.json');
});

/**
* Test Case: TC014 Validate Error for Malformed Measurements id GET /measurements/{id}
* ID: TC014
* Title: Validate Error for Malformed Measurements id GET /measurements/{id}
* Preconditions:
*  - API endpoint /measurements is available
* Test Data:
*    example: 72193603-1a49-41e9-af88 
* Steps:
*  - Send GET request to /measurements/{id}
*  - Check response status is 400
* Expected Result:
*  - Response status is 400
*/
test.describe('TC014 Validate Error for Malformed Measurements ID Tests', () => {
    for (const invalidMeasId of invalidId) {
        test(`TC014 Validate Error for Malformed Measurements id GET /measurements/${invalidMeasId.description}`, async ({ request }) => {
            test.skip(skipTests, "No Measurements on api");
            console.log(`Running test with measurement id: ${invalidMeasId.payload.id}`);
            const response = await request.get(`measurements/${invalidMeasId.payload.id}`);
            expect(response.status()).toBe(400);//response satus code validation 
        });
    }
});
