# Barrel-monitor 
API Documentation:: [link](https://to-barrel-monitor.azurewebsites.net/swagger/index.html)  
## Requirements: ##
- node.js v19.9.0
- npm v9.6.3 \
  *or alternatively*
- docker
- docker compose
## Install ##
```  
npm install
```

## Run: ##
```bash
npx playwright test --ui
```
*or*
``` bash
npx playwright test
```

#### Docker Compose ####
```bash
docker compose up
```
Test results are located in: **./playwright-report/index.html**
#### Run CI in GitHub Actions ###
The configuration for GitHub Actions is located at:
/.github/workflows/main.yml  
It runs if:
- There is a push on the main branch
- There is a pull request targeting the main branch
- Every day at 12:00 UTC

## Known Issue ##
- If the command `npx playwright show-report` opens an empty browser window, check whether the port used for the report is already in use by another service.  

- Tests TC011 and TC013 are skipped because it is currently not possible to create the required data for them.  

## TODO ##
 The test clean-up logic needs improvement to handle scenarios where tests or the server terminate unexpectedly. To enable safe removal of test data on the next run, consider using a consistent prefix in data identifiers.

---
## 🧪 Test cases ##

<details>
  <summary>Test Case: TC001 - Create Barrel via POST /barrels</summary>

```
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
```
</details>

<details>
  <summary>Test Case: TC002 - Verify error handeling  POST /barrels</summary>

```  
 *Test Case: TC002 - Verify error handeling  POST /barrels  
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
```
</details> 
<details> 
<summary>Test Case: TC003 - ID conflict  POST /barrels</summary>  

``` 
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
```
</details>  

<details> 
<summary>Test Case: TC004 Validate Successful Retrieval of Array of Barrels via GET /barrels </summary>  

``` 
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
```
</details>  
<details> 
<summary>Test Case: TC005 Validate Successful Retrieval of Barrel via GET /barrels/{id}</summary>  

``` 
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
```
</details>  
<details>
<summary>Test Case:  TC006 Validate Error for Malformed Barrel id GET /barrels/{id}</summary>  

``` 
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
```
</details>
<details>  
<summary>Test Case: TC007 Validate Successful Deletion of Barrel via DELETE /barrels/{id}</summary>  

``` 
 *Test Case: TC007 Validate Successful Deletion of Barrel via DELETE /barrels/{id}
 * ID: TC007
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
```
</details>  
<details>
<summary>Test Case: TC008 Validate Deletion Attempt with Incorrect Barrel ID via DELETE /barrels/{id}</summary>  

``` 
 * Test Case: TC008 Validate Deletion Attempt with Incorrect Barrel ID via DELETE /barrels/{id}
 * ID: TC008
 * Title: Validate Deletion Attempt with Incorrect Barrel ID via DELETE /barrels/{id}
 * Preconditions:
 *   - API endpoint /barrels/ is available
 * Test Data:
 *   - Without paramet, Non-existent or malformed barrel ID, SQL injection
 * Steps:
 *   - Send DELETE request to /barrels/{incorrect_id}
 *   - Verify response status is 404 (Not Found) or appropriate error code
 *   - Validate error message in response body (if applicable)
 * Expected Result:
 *   - Response status is 404 or relevant error code
 *   - Response body contains error message indicating barrel not found
```
</details>  
<details>
<summary>Test Case: TC009 Validate Successful Creation of Measurement via POST /measurements</summary>  

``` 
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
```
</details>  
<details>
<summary>Test Case: TC010 Validate Failure Scenarios When Creating Measurement via POST /measurements</summary>  

``` 
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
```
</details>  
<details>
<summary>Test Case: TC011 Validate Conflict on Creating Measurement with Existing ID via POST /measurements</summary>  

``` 
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
```
</details>  
<details>
<summary>Test Case: TC012 Validate Successful Retrieval of Array of Measurements via GET /measurements</summary>  

``` 
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
```
</details> 
<details> 
<summary>Test Case: TC013 Validate Successful Retrieval of Measurements via GET /measurements/{id}</summary>  

``` 
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
```
</details>  
<details> 
<summary>Test Case: TC014 Validate Error for Malformed Measurements id GET /measurements/{id}</summary>  

``` 
 * Test Case: TC014 Validate Error for Malformed Measurements id GET /measurements/{id}
 * ID: TC014
 * Title: Validate Error for Malformed Measurements id GET /measurements/{id}
 * Preconditions:
 *  - API endpoint /measurements is available
 * Test Data:
 *    data from api
 *    example: 72193603-1a49-41e9-af88 
 *    TODO possible data driven
 * Steps:
 *  - Send GET request to /measurements/{id}
 *  - Check response status is 400
 * Expected Result:
 *  - Response status is 400
```
</details>  

---
# BUG REPORT #

## ID001 ##
### GET /barrels/{id} ###  
 **Severity:** Blocker
**Description:**
If the user makes a request to the endpoint with a valid barrel UUID, the server returns a 500 error  

**Steps to reproduce:**
 ```
curl -X 'GET'   'https://to-barrel-monitor.azurewebsites.net/barrels/95e50f55-6b64-4468-50fe-08dd4447ff51' -i
```

**Expected result:**  
Response HTTP code: 200 OK  
**Actual result:**  
Response HTTP code: 500 Internal Server Error

**Log:**  
```
Response headers:
 content-length: 0 
 date: Tue,27 May 2025 10:32:50 GMT 
 server: Kestrel 
 ```

---
## ID002 ##
### DELETE /barrels/{id}  ###
 **Severity:** Blocker
**Description:**
If a user sends existing barrel id, 500 Error: Internal Server Error occures.  

**Steps to reproduce:**
```
curl -X 'DELETE' \
  'https://to-barrel-monitor.azurewebsites.net/barrels/fa16a00b-ed5f-488b-50e0-08dd4447ff51' -i
```

**Espected result:**  
Response HTTP code: 200 ok  
**Actual result:**  
Response Http code: 500 Internal Server Error

**Log:**
```
Response headers:
 content-length: 0 
 date: Tue,27 May 2025 07:52:33 GMT 
 server: Kestrel  
```
 ---
 ## ID003 ##
 ### POST /measurements ###
 **Severity:** Blocker
 **Description:**
There appears to be a mismatch between the server-side schema and the API documentation, as the backend requires a Barrel field that is not documented. Valid barrel UUID used,

**Steps to reproduce:**
```
curl -X 'POST' \
  'https://to-barrel-monitor.azurewebsites.net/measurements' \
  -H 'accept: text/plain' \
  -H 'Content-Type: application/json' \
  -d '{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "barrelId": "6d09c984-7244-4708-50f4-08dd4447ff51",
  "dirtLevel": 0,
  "weight": 0
}' -i
```

**Espected result:**  
Response HTTP code: 200 ok  
**Actual result:**    
Response Http code: 400 Error: Bad Request

**Log:**
```
Response body
Download
{
  "type": "https://tools.ietf.org/html/rfc9110#section-15.5.1",
  "title": "One or more validation errors occurred.",
  "status": 400,
  "errors": {
    "Barrel": [
      "The Barrel field is required."
    ]
  },
  "traceId": "00-ae70b474c3cbd79aad1d87a53afc8169-5c296c0ef75c8820-00"
}

Response headers
 content-type: application/problem+json; charset=utf-8 
 date: Tue,27 May 2025 10:46:46 GMT 
 server: Kestrel 
 transfer-encoding: chunked
```

---
 ## ID004 ##
 ### Documentation for POST /barrels ###
 **Severity:** none
 **Description:**
The API documentation for POST /barrels should be updated:

- Change the expected HTTP status code from 200 to 201

- Add documentation for HTTP status codes 400 (Bad Request) and 409 (Conflict)

---
 ## ID005 ##
 ### Documentation for POST /measurements ###
 **Severity:** none
 **Description:**
The API documentation for POST /measurements should be updated:

- Change the expected HTTP status code from 200 to 201

- Add documentation for HTTP status codes 400 (Bad Request) and 409 (Conflict)  

--- 
## ID006 ##
 ### API Schema – String Field Constraints ###
 **Severity:** medium  
 **Description:**  
The API schemas should be updated to include maximum length constraints for string fields.
Not defining maximum string lengths can pose a potential security risk, such as buffer overflows or denial of service due to excessively large payloads.

## ID007 ##
 ### Conflict Handling Missing for Existing IDs in POST barrels/ ###
 **Severity:** medium  
 **Description:**  
 When a client sends a POST request with a barrel ID that already exists, the server should respond with a 409 Conflict, indicating that the resource already exists.

Currently, the API responds with a 500 Internal Server Error, which is misleading and incorrect.
This behavior should be updated to follow standard REST conventions.

**Steps to reproduce**  
```
curl -X 'POST' \
  'https://to-barrel-monitor.azurewebsites.net/barrels' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "id": "54b32f14-a89e-46eb-50d6-08dd4447ff51",
  "qr": "124test",
  "rfid": "458test",
  "nfc": "test"
}' -i
```  
**Actual results:**  
Error 500  
**Expected result:**  
Error 409

**Log:**  
```  
HTTP/1.1 500 Internal Server Error
Content-Length: 0
Date: Wed, 28 May 2025 19:54:02 GMT
Server: Kestrel  
```