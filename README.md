# Cloud Computing project

[![My Skills](https://skillicons.dev/icons?i=docker,express,redis,vite,kafka,emotion,nodejs,react,js,html,css)](https://skillicons.dev)
<img height=48 src="https://user-images.githubusercontent.com/25181517/183569191-f32cdf03-673f-4ae3-809b-3a8b376bb8a2.png" />
<img height=48 src="https://github.com/marwin1991/profile-technology-icons/assets/136815194/ab742751-b55b-43d7-8f49-9a67e293f67c" />

architecture overview: 
![1](https://github.com/dolev146/BigData-Cloud-Computing-project/assets/62290677/1a8f8866-09f1-4f73-9b0b-a6f0ccebbbc9)



Description:

For this project, we developed an application to show information from 3 different sources, NASA API, a Simulator with Elastic Search and Kafka, and data from 2 websites using a web scraper. Our application features knowledge in using new technologies which collect and stores data in an Elastic Search database. This information is transferred using Kafka which can handle large amounts of data, enabling communication between our data source and database. In addition, our system includes a real-time alert component, using Socket.io to notify users of crucial Events. The front end was created as a Single Page Application (SPA) using ReactJS.
The backend is written in NodeJS, in a Mirco-Services Approach and Lambda architecture.

## Authors

- [@dolev146](https://www.github.com/dolev146)
- [@yakov103](https://www.github.com/yakov103)
- [@EitanKats](https://www.github.com/EitanKats)

![2](https://github.com/dolev146/BigData-Cloud-Computing-project/assets/62290677/d361c9f2-e6a1-4f63-b58f-997c78e99e1f)

## Run Locally

## The docker-compose file is creating the following services:
- API Service with NodeJS
- Redis
- Elastic Search
- [Cloud Karafaka](https://www.cloudkarafka.com/)  


Clone the project

important!
you need to have the .env files in order to run the project.

```bash
  git clone https://github.com/dolev146/BigData-Cloud-Computing-project.git
```

Go to the project directory

```bash
  cd BigData-Cloud-Computing-project
```

Set Up Docker

note you need apple m1 
if not then there are modification in the dockerfile that need to be modiefied to x86 instead of arm64

make sure you have the docker engine open in your computer
then run the following commands

```bash
  docker-compose build
```

```bash
  docker-compose up
```

Set Up Scraper

navigate to the scraper folder
```bash
cd scraper
```

install dependencies
```bash
npm i
```

start the scraper
```bash
npm start
```

Navigate to the frontend folder
```bash
cd frontend
```
install dependencies
```bash
npm i
```
run the front end
```bash
npm run dev
```
and press "o" to open the front end


# Screenshots

| Image 1 | Image 2 | Image 3 |
| :---: | :---: | :---: |
| ![3](https://github.com/dolev146/BigData-Cloud-Computing-project/assets/62290677/fbf720f6-a4bf-4052-a3f6-9301199467af) | ![4](https://github.com/dolev146/BigData-Cloud-Computing-project/assets/62290677/66345933-5fde-4cdb-8462-5521af64c52e) | ![5](https://github.com/dolev146/BigData-Cloud-Computing-project/assets/62290677/9aad4a2d-eb54-4149-85bd-273501630d69) |

## Materials:

| Image 1 | Image 2 | Image 3 | Image 4 |
|:-------:|:-------:|:-------:|:-------:|
| ![6](https://github.com/dolev146/BigData-Cloud-Computing-project/assets/62290677/bd00e492-9207-4910-9d5f-36a4a0de0e6a) | ![7](https://github.com/dolev146/BigData-Cloud-Computing-project/assets/62290677/6db11b1d-2fe8-4996-8408-25c9f56ba293) | ![8](https://github.com/dolev146/BigData-Cloud-Computing-project/assets/62290677/19de6688-0cf0-431e-a39d-80c5290e14b4) | ![9](https://github.com/dolev146/BigData-Cloud-Computing-project/assets/62290677/40a3d900-2a07-4937-bf27-061fbd892496) |

# Development Process

## Agile TeamWork

![11](https://github.com/dolev146/BigData-Cloud-Computing-project/assets/62290677/bc780920-1e3f-4154-a006-08ca706aaa4c)
![12](https://github.com/dolev146/BigData-Cloud-Computing-project/assets/62290677/626ecd56-5b43-49d0-a8e2-8ef08564e183)


**watch the YouTube video explaining everything**
[![IMAGE ALT TEXT HERE](https://github.com/dolev146/BigData-Cloud-Computing-project/assets/62290677/5a01403d-6a79-44d2-a9b3-6e8590a5bec3)](https://www.youtube.com/watch?v=UYEudRh2xv8&ab_channel=HanotzTv)


# Scraper

![14](https://github.com/dolev146/BigData-Cloud-Computing-project/assets/62290677/c4626521-9c5f-430d-a42a-c3bfe8b2d545)
![15](https://github.com/dolev146/BigData-Cloud-Computing-project/assets/62290677/d037fb35-2e96-4fdc-9fc1-0b6db8567e4d)
![16](https://github.com/dolev146/BigData-Cloud-Computing-project/assets/62290677/ceef2473-04ed-4615-b829-1b7fb6e52885)

# Nasa Api

# Simulator

































