# TORO WAREHOUSE SERVICE
[![Build Status](https://travis-ci.org/ConnerAiken/toro-warehouse-service.svg?branch=master)](https://travis-ci.org/ConnerAiken/toro-warehouse-service)

## Dependencies 

- Python 2 (node-gyp)
- NodeJS (9+ preferred)
- Docker (CE is fine, 17+ preferred)


## Stats

4/11/2019

### Companies

Around ~10k records, current workflow takes has horrible time complexity. This upsert will be improved /w copy command and promise handling but right 
now it is low priority since it only needs to import once.

### Company Info

1:1 calls /w symbols obviously. This as well has poor time complexity until I have time to rework it.

## Installation

1) `$ git clone <this_url> && cd <repo_name>`

2) `$ npm install`

3) Copy `.env.default` in the root of the project, edit and rename the copy: `.env`. 

4) Open `docker-compose.yml` and replace the text 'boilerplate' with the app name you put in the env file

5) Running the application
   - Development Mode (Client only): `$ npm run dev` then open `http://localhost:8080` in a browser
   - Production Bundle (Client only): `$ npm run build` then import the client code somewhere
   - Standalone (Client+Server): `$ npm start` then open `http://localhost:8080` in a browser
   - Dockerized /w MongoDB: `$ npm run start:docker` - more to come
  
## Resources/Sources

### Lifecycle scripts

- `$ npm start`
	- `$ npm run start:symbols` => Only upserts symbols, to be used first
	- `$ npm run start:companyInfo` => Reads all symbols from db then updates /w company info such as employee count, ceo name, industry, etc.
- `$ npm run dev`
- `$ npm run upgradeDeps`
- `$ npm run build`
- `$ npm test`
 