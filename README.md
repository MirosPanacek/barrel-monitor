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