import { test, expect, request } from '@playwright/test';
import { SchemaValidator } from '../../utils/SchemaValidator';
import { getFirstBarrelId } from '../../utils/GetBarrelId';
/**
 * This value is for TC005
 */
let barel;
/**
 * This value is for TC006
 */
let malformedBarelId;
/**
 * set barrels id for TC005 and TC006
 */
test.beforeAll(async () => {
    barel = await getFirstBarrelId();
    malformedBarelId = barel.substring(0, barel.length - 6);
});

/**
 * Test Case: TC004 Validate Successful Retrieval of Array of Barrels via GET /barrels 
 * ID: TC004
 * Title:  Validate Successful Retrieval of Array of Barrels via GET /barrels 
 * Preconditions:
 *  - API endpoint /barrels/ is available
 * Steps:
 *  - Send GET request to /barrels/ 
 *  - Parse response JSON
 *  - Validate response against BarrelsArray.schema.json schema
 *  - Check response status is 200
 * Expected Result:
 *  - Response status is 200
 *  - Response body matches BarrelsArray.schema.json schema
 */
test(`TC004 Validate Successful Retrieval of Array of Barrels via GET /barrels `, async ({ request }) => {
    const response = await request.get('barrels/');
    expect(response.status()).toBe(200);//response satus code validation 
    const json = await response.json();
    console.log(json)
    const validator = new SchemaValidator();
    validator.validateSchema(json, 'BarrelsArray.schema.json', ['Barrel.schema.json']);
});

/**
* Test Case: TC005 Validate Successful Retrieval of Barrel via GET /barrels/{id}
* ID: TC005
* Title: Validate Successful Retrieval of Barrel via GET /barrels/{id}
* Preconditions:
*  - API endpoint /barrels/ is available
* Test Data:
*   from api 
* Steps:
 *  - Send GET request to /barrels/{id}
 *  - Parse response JSON
 *  - Validate response against Barrel.schema.json schema
 *  - Check response status is 200
 * Expected Result:
 *  - Response status is 200
 *  - Response body matches BarrelsArray.schema.json schema
*/
test(`TC005 Validate Successful Retrieval of Barrel via GET /barrels/{id}`, async ({ request }) => {
    console.log(`Running test with barrel id: ${barel.id}`);
    const response = await request.get(`barrels/${barel.id}`);
    expect(response.status()).toBe(200);//response satus code validation 
    const json = await response.json();
    console.log(json)
    const validator = new SchemaValidator();
    validator.validateSchema(json, 'Barrel.schema.json');
});

/**
* Test Case: TC006 Validate Error for Malformed Barrel id GET /barrels/{id}
* ID: TC006
* Title: Validate Error for Malformed Barrel id GET /barrels/{id}
* Preconditions:
*  - API endpoint /barrels/ is available
* Test Data:
*    72193603-1a49-41e9-af88 
*    TODO possible data driven
* Steps:
 *  - Send GET request to /barrels/{id}
 *  - Check response status is 400
 * Expected Result:
 *  - Response status is 400
*/
test(`TC006 Validate Error for Malformed Barrel id GET /barrels/{id}`, async ({ request }) => {
    console.log(`Running test with barrel id: ${malformedBarelId}`);
    const response = await request.get(`barrels/${malformedBarelId}`);
    expect(response.status()).toBe(400);//response satus code validation 
});