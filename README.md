# Cloud Computing project

[![My Skills](https://skillicons.dev/icons?i=docker,express,redis,vite,kafka,emotion,nodejs,react,js,html,css)](https://skillicons.dev)
<img height=48 src="https://user-images.githubusercontent.com/25181517/183569191-f32cdf03-673f-4ae3-809b-3a8b376bb8a2.png" />
<img height=48 src="https://github.com/marwin1991/profile-technology-icons/assets/136815194/ab742751-b55b-43d7-8f49-9a67e293f67c" />

architecture overview: 
![image](https://github.com/dolev146/BigData-Cloud-Computing-project/assets/62290677/cd25b6aa-6c47-4a61-ad89-cb683579f34a)




Description:

For this project, we developed an application to show information from 3 different sources, NASA API, a Simulator with Elastic Search and Kafka, and data from 2 websites using a web scraper. Our application features knowledge in using new technologies which collect and stores data in an Elastic Search database. This information is transferred using Kafka which can handle large amounts of data, enabling communication between our data source and database. In addition, our system includes a real-time alert component, using Socket.io to notify users of crucial Events. The front end was created as a Single Page Application (SPA) using ReactJS.
The backend is written in NodeJS, in a Mirco-Services Approach and Lambda architecture.

## Authors

- [@dolev146](https://www.github.com/dolev146)
- [@yakov103](https://www.github.com/yakov103)
- [@EitanKats](https://www.github.com/EitanKats)

![ezgif com-video-to-gif (1)](https://github.com/dolev146/BigData-Cloud-Computing-project/assets/62290677/ded31157-a114-4cd6-a6d4-93811aa24405)

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
| ![image1](https://github.com/dolev146/BigData-Cloud-Computing-project/assets/62290677/2b1bc519-4332-4a7e-b90e-dc6cae9dd374) | ![image2](https://github.com/dolev146/BigData-Cloud-Computing-project/assets/62290677/a2c44652-def5-42ce-a632-b7e8e99b4e81) | ![image3](https://github.com/dolev146/BigData-Cloud-Computing-project/assets/62290677/146a8db8-bd5e-4ff7-9070-429cc5764d23) |

## Materials:

| Image 1 | Image 2 | Image 3 | Image 4 |
|:-------:|:-------:|:-------:|:-------:|
| ![image](https://github.com/dolev146/BigData-Cloud-Computing-project/assets/62290677/be28092c-3af9-4eeb-b0ef-eee5adf21c50) | ![image](https://github.com/dolev146/BigData-Cloud-Computing-project/assets/62290677/955509e3-8d11-45ef-98ca-5d29e636c465) | ![image](https://github.com/dolev146/BigData-Cloud-Computing-project/assets/62290677/130de69f-82dd-44b8-b5c5-d927fc7fce1b) | ![image](https://github.com/dolev146/BigData-Cloud-Computing-project/assets/62290677/e3a440e5-ec1c-4b30-9c1e-99c7331c6969) |
# Development Process

## Agile TeamWork

![image](https://github.com/dolev146/BigData-Cloud-Computing-project/assets/62290677/a4d6c76e-693b-4ad6-91be-0659574d6aaa)
![image](https://github.com/dolev146/BigData-Cloud-Computing-project/assets/62290677/2e7aaa44-1f48-48fe-a627-87c42e482d14)

**watch the YouTube video explaining everything**
[![IMAGE ALT TEXT HERE](https://github.com/dolev146/BigData-Cloud-Computing-project/assets/62290677/583354d0-f1f0-4714-8f2a-6e606499d689)](https://www.youtube.com/watch?v=UYEudRh2xv8&ab_channel=HanotzTv)

 

# Scraper
![image](https://github.com/dolev146/BigData-Cloud-Computing-project/assets/62290677/3e1d461c-69bd-4bd1-a265-c456b7ce110e)
![image](https://github.com/dolev146/BigData-Cloud-Computing-project/assets/62290677/80f65c98-4886-4b22-91e9-beb974435dba)
![image](https://github.com/dolev146/BigData-Cloud-Computing-project/assets/62290677/1e298207-e109-41a2-878e-189fa3723efe)

# Nasa Api

![image](https://github.com/dolev146/BigData-Cloud-Computing-project/assets/62290677/832f8638-8787-4371-bb44-b6c79f43bde9)
![image](https://github.com/dolev146/BigData-Cloud-Computing-project/assets/62290677/49bf1760-382f-4f33-be3e-e86c25b87e9f)
![image](https://github.com/dolev146/BigData-Cloud-Computing-project/assets/62290677/b152db3f-e338-44dc-bd05-47573e1d652b)

# Simulator

![image](https://github.com/dolev146/BigData-Cloud-Computing-project/assets/62290677/f9a1f472-c7da-49d6-9ece-9df612899df0)

































