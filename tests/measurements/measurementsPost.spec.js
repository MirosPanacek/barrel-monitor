import { test, expect, request } from '@playwright/test';
import { SchemaValidator } from '../../utils/SchemaValidator';
import { measurements } from '../../testingData/MeasurementsPost';

//IDs of newly created barrels (for cleanup)
let barrelslId = [];
let existingMeasurementId;

// Get an existing Measurement ID from API before tests
/*test.beforeAll(async () => {
    existingMeasurementId = await measurementWithSameId();
});
*/
// Remove all created Measurements after tests
test.afterAll(async () => {
    for (const id of barrelslId) {
        await removeMeasurement(id);
    }
});

/**
 * Test Case: TC009 Validate Successful Creation of Measurement via POST /measurements
 * ID: TC009
 * Title: Validate Successful Creation of Measurement via POST /measurements
 * Preconditions:
 *   - API endpoint /measurements is available
 *   - Required fields and valid value formats are known
 * Test Data:
 *   - Valid measurement payload: ../../testingData/MeasurementsPost.js
 * Steps:
 *   - Send POST request to /measurements with valid JSON payload
 *   - Parse response JSON
 *   - Validate response against Measurement.schema.json schema
 *   - Verify response status is 201 (Created)
 * Expected Result:
 *   - Response status is 201
 *   - Response body contains created measurement with correct data
 *   - Measurement is stored and retrievable via GET /measurements/{id}
 */
for (const measurement of measurements) { // data driven test
    test(`TC009 Validate Successful Creation of Measurement via POST /measurements ${measurement.description}`, async ({ request }) => {
        const response = await request.post('measurements/', { data: measurement.payload });
        const json = await response.json();
        console.log(json);
        expect.soft(json.id).toContain(measurement.payload.id);
        barrelslId.push(json.barrelId);//add barel id  for cleanup
        expect.soft(json.barrelId).toContain(measurement.payload.barrelId);
        expect.soft(json.dirtLevel).toContain(measurement.payload.dirtLevel);
        expect.soft(json.weight).toContain(measurement.payload.weight);
        expect.soft(response.status()).toBe(201);
        const validator = new SchemaValidator();
        validator.validateSchema(json, 'Measurement.schema.json');
        // TODO verify data from GET if exist
    });
}


/**
 * Test Case: TC010 Validate Failure Scenarios When Creating Measurement via POST /measurements
 * ID: TC010
 * Title: Validate Failure Scenarios When Creating Measurement via POST /measurements
 * Preconditions:
 *   - API endpoint /measurements is available
 * Test Data:
 *   - Invalid measurement payloads:
 *     1. Missing required fields (e.g., no "id")
 *     2. Fields with invalid types (e.g., "dirtLevel": "hot")
 *     3. Fields with special characters (e.g., "barrelId": "@#!")
 *     4. Values out of acceptable range (e.g., "weight": -1)
 *     5. Null or empty strings in required fields
 *     payload: ../../testingData/InvalidMeasurementsPost.js
 * Steps:
 *   - For each invalid payload:
 *     - Send POST request to /measurements
 *     - Parse the response JSON
 *     - Validate error message and status code
 *     - Ensure no measurement is created
 * Expected Result:
 *   - Response status is 400 (Bad Request) or appropriate error code
 *   - Response contains validation error message(s)
 *   - No new measurement is persisted
 */
for (const measurement of measurements) { // data driven test
    test(`TC010 Validate Failure Scenarios When Creating Measurement via POST /measurements ${measurement.description}`, async ({ request }) => {
        const response = await request.post('measurements/', { data: measurement.payload });
        const json = await response.json();
        console.log(json);
        if(json.id) {
            barrelslId.push(json.id);
        }
        expect.soft(response.status()).toBe(400);
    });
}

/**
 * Test Case: TC011 Validate Conflict on Creating Measurement with Existing ID via POST /measurements
 * ID: TC011
 * Title: Validate Conflict on Creating Measurement with Existing ID via POST /measurements
 * Preconditions:
 *   - API endpoint /measurements is available
 *   - A measurement with the same ID already exists
 * Test Data:
 *   - Valid measurement payload with duplicate ID
 * Steps:
 *   - Send POST request to /measurements with a payload using an existing measurement ID
 *   - Parse the response
 *   - Validate status code and error message
 * Expected Result:
 *   - Response status is 409 (Conflict)
 *   - Response body contains an appropriate error message (e.g., "Measurement ID already exists")
 *   - No duplicate measurement is created
 */
test(`TC011 Validate Conflict on Creating Measurement with Existing ID via POST /measurements`, async ({ request }) => {
    console.log(`Running test with measurement id: ${sameId.payload.id}`);
    const response = await request.post('measurements/', { data: sameId.payload });
    const headers = response.headers();
    console.log(headers)
    expect(response.status()).toBe(409);//response satus code validation 
});
