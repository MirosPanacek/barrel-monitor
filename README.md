# Barrel-monitor 
API documentation: [link](https://to-barrel-monitor.azurewebsites.net/swagger/index.html)  
## Requirements: ##
- node.js v19.9.0
- npm v9.6.3 \
  *or*
- docker
- docker compose

## Run: ##
```bash
npx playwright test --ui
```
*OR*
``` bash
npx playwright test
```

#### Docker Compose ####
```bash
docker compose up
```
Test results is in: **./playwright-report/index.html**
#### Run CI  in Github action ###
The setting for github action is in /.github/workflows/main.yml  
It's run if:
 - push on branches main
 - pull_request on branches main
 - at 11:00 everyday

## Known Issue ##
If the command `npx playwright show-report` opens an empty browser window, check whether the port used for the report is already occupied by another service.  

## ID001 ##
### POST /barrels ###
 **Severity:** Moderate
**Desctription:**
If a user attempts to modify an existing record using the POST method and provides an barrel ID, the server returns a 500 Internal Server Error.
The POST method should be used to create a new record without specifying an existing ID. If a client includes an existing barrel ID in a POST request, the server should respond with a 400 Bad Request or 409 Conflict, rather than a 500 Internal Server Error. Modifying existing records should be done using the PUT method.

**Steps to reproduce:**
```
curl -X 'POST' \
  'https://to-barrel-monitor.azurewebsites.net/barrels' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "id": "ff3a69a0-2ea7-4d6e-50dd-08dd4447ff51",
  "qr": "124test",
  "rfid": "458test",
  "nfc": "test"
}' -i
```

**Expected result:**
Modifying existing records should be done using the PUT method. **OR** response HTTP code: 204 No Content
**Actual result:**
Response HTTP code: 500 Internal Server Error

**Log:** 
Response headers:
 content-length: 0 
 date: Tue,27 May 2025 10:43:25 GMT 
 server: Kestrel 
 
---  
## ID002 ##
### GET /barrels/{id} ###  
 **Severity:** Blocker
**Description:**
If the user makes a request to the endpoint with a valid barrel UUID, the server returns a 500 error  

**Steps to reproduce:**
 ````
curl -X 'GET'   'https://to-barrel-monitor.azurewebsites.net/barrels/95e50f55-6b64-4468-50fe-08dd4447ff51' -i
`````

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
## ID003 ##
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
 ## ID004 ##
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
````
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
````

---
 ## ID005 ##
 ### Documentation for POST /barrels ###
 **Severity:** none
 **Description:**
There should by update api documentation for POST /barrels - http code from 200 to 201 and
add documentation for http code 400 and 409 Conflict.

---