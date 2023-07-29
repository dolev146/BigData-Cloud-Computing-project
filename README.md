# Cloud Computing project

[![My Skills](https://skillicons.dev/icons?i=docker,express,redis,vite,kafka,emotion,nodejs,react,js,html,css)](https://skillicons.dev)
<img height=48 src="https://user-images.githubusercontent.com/25181517/183569191-f32cdf03-673f-4ae3-809b-3a8b376bb8a2.png" />
<img height=48 src="https://github.com/marwin1991/profile-technology-icons/assets/136815194/ab742751-b55b-43d7-8f49-9a67e293f67c" />

architecture overview: 
![image](https://github.com/dolev146/BigData-Cloud-Computing-project/assets/62290677/cd25b6aa-6c47-4a61-ad89-cb683579f34a)




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
