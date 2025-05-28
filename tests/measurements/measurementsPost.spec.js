//create measurements valid values
//create measurements invalid values, missing parametrs, special char, max min values
//create measurements valid values conflict measurements id

/**
 * Test Case: TC010 Validate Successful Creation of Measurement via POST /measurements
 * ID: TC008
 * Title: Validate Successful Creation of Measurement via POST /measurements
 * Preconditions:
 *   - API endpoint /measurements is available
 *   - Required fields and valid value formats are known
 * Test Data:
 *   - Valid measurement payload:
 *     {
 *         "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
 *         "barrelId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
 *         "dirtLevel": 0,
 *          "weight": 0
 *     }
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