import { test, expect, request } from '@playwright/test';
import { barrels } from '../../testingData/BarrelsPost';
import { SchemaValidator } from '../../utils/SchemaValidator';
import { removeBarrel } from '../../utils/RemoveBarrel';
import { invalidBarrels } from '../../testingData/InvalidBarrelsPost';
import { barrelWithSameId } from '../../testingData/BarrelsSameIdPost'

//**ID of new created barrels
// It is for clean-up */
let barrelslId = [];
let sameId;
//get existing id barrel from api
test.beforeAll(async () => {
    sameId = await barrelWithSameId();
});

/** Remove all cerated barels */
test.afterAll(async () => {
    for (const id of barrelslId) {
        await removeBarrel(id);
    }
});

/**
 * Test Case: TC001 - Create Barrel via POST /barrels
 * ID: TC001
 * Title: Verify successful barrel creation with valid data POST /barrels
 * Preconditions:
 *  - API endpoint /barrels/ is available
 * Test Data:
 * ../../testingData/barrelsPost.js
 * Steps:
 *  - Send POST request to /barrels/ with payload
 *  - Parse response JSON
 *  - Validate response against Barrel.json schema
 *  - Check response status is 201
 * Expected Result:
 *  - Response status is 201
 *  - Response body matches Barrel.json schema
 *  - Response JSON values matches request values
 */
for (const barrel of barrels) {//data driven test
    test(`TC001 - Create Barrel via POST /barrels ${barrel.description}`, async ({ request }) => {
        const response = await request.post('barrels/', { data: barrel.payload });
        const json = await response.json();
        console.log(json)
        barrelslId.push(json.id);
        expect.soft(json.qr).toContain(barrel.payload.qr);
        expect.soft(json.rfid).toContain(barrel.payload.rfid);
        expect.soft(json.nfc).toContain(barrel.payload.nfc);
        expect.soft(response.status()).toBe(201);//response satus code validation
        const validator = new SchemaValidator();
        validator.validateSchema(json, 'Barrel.schema.json');
        // TODO verifi data from get if exist
    });
}


/**
 * Test Case: TC002 - Verify error handeling  POST /barrels
 * ID: TC002
 * Title: Verify error handeling with invalid data POST /barrels
 * Preconditions:
 *  - API endpoint /barrels/ is available
 * Test Data:
 * ../../testingData/InvalidBarrelsPost.js
 * Steps:
 *  - Send POST request to /barrels/ with payload
 *  - Check response status is 400
 * Expected Result:
 *  - Response status is 400
 */
for (const barrel of invalidBarrels) {//data driven test
    test(`TC002 - Verify error handeling  POST /barrels ${barrel.description}`, async ({ request }) => {
        const response = await request.post('barrels/', { data: barrel.payload });
        const json = await response.json();
        console.log(json)
        if (json.id) {
            barrelslId.push(json.id);
        }
        expect(response.status()).toBe(400);//response satus code validationjson
    });
}

/**
 * Test Case: TC003 - ID conflict  POST /barrels
 * ID: TC003
 * Title: Verify error handeling when ID alredy exist POST /barrels
 * Preconditions:
 *  - API endpoint /barrels/ is available
 * Test Data:
 * '../../testingData/BarrelsSameIdPost.js
 * Steps:
 *  - Send POST request to /barrels/ with payload
 *  - Check response status is 409
 * Expected Result:
 *  - Response status is 409
 */
test(`TC003 - ID conflict  POST /barrels : `, async ({ request }) => {
    console.log(`Running test with barrel id: ${sameId.payload.id}`);
    const response = await request.post('barrels/', { data: sameId.payload });
    const headers = await response.headers();
    console.log(headers)
    expect(response.status()).toBe(409);//response satus code validation 
});
