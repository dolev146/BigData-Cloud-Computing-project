# Cloud Computing project

The repository is divided into services:

- scraper - python service that will be used to scrape the web
- api-service - Nodejs express application to serve the data using REST API

## The docker-compose file is creating the following services:
- api-service
- redis
- elastic-search
- kafka + zoopker - currently muted

To run the full project:
`docker-compose up`

To kill everything:
`ctrl + c`

or:

`docker-compose down`