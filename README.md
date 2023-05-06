# Cloud Computing project

architecture overview: 
[Link](https://lucid.app/lucidchart/9babe1c1-fdf7-44d4-8dfe-c53e2d8af609/edit?invitationId=inv_ac137b00-2a8f-41ce-93e8-a50903c222d7)


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