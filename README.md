# TORO WAREHOUSE SERVICE

## Dependencies 

- Python 2 (node-gyp)
- NodeJS (9+ preferred)
- Docker (CE is fine, 17+ preferred)

## Installation

1) `git clone <this_url> && cd <repo_name>`

2) `npm install`

3) Copy `.env.default` in the root of the project, edit and rename the copy: `.env`. 

4) Open `docker-compose.yml` and replace the text 'boilerplate' with the app name you put in the env file

5) Running the application
   - Development Mode (Client only): `npm run dev` then open `http://localhost:8080` in a browser
   - Production Bundle (Client only): `npm run build` then import the client code somewhere
   - Standalone (Client+Server): `npm start` then open `http://localhost:8080` in a browser
   - Dockerized /w MongoDB: `npm run start:docker` - more to come
  
## Resources/Sources

### Lifecycle scripts

- npm start
- npm run dev
- npm run upgradeDeps
- npm run build
- npm test
 