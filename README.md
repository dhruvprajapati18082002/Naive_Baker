# Naive Baker

[![DeepScan grade](https://deepscan.io/api/teams/21039/projects/24450/branches/754106/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=21039&pid=24450&bid=754106)

An online recipe sharing platform for cooking lovers...

## Team Members

- Vihar Shah (G.R.)
- Nikhil Jethanandani
- Gaurav Shah
- Dhruv Prajapati
- Aditya Raj
- Priyank Pitliya
- Shobhit Verma
- Deep Rakhasiya
- Boricha Vinal

## Repository Structure

- The repository contains the documentations related to the project in `documentations` folder.
- The Frontend, implemented in React.JS is inside `frontend` folder, and backend, implemented using Express - Node.JS us in `backend` folder.

## Environment Files

- Both frontend and backend have their own respective environment files which are required to run the project.
- The files must be manually defined as they are not included in the repository to protect the secrets.
- One must create a *.env* file in the root of frontend and backend to run the project.

### Frontend Environment File

the frontend environment file backend url in following format

```bash
REACT_APP_BACKEND=<backend-url-here>
```

### Backend Environment File

the frontend environment file backend url in following format

```bash

MONGODB_URI=<uri-here> # URI to connect to mongodb Database

FRONTEND_URL=<frontend-url-here>  # to allow only frontend to access backend
PORT=<backend-port-here>  # port on which backend will run
JWT_SECRET=<jwt_secret_here>  # used to hash passwords before storing

# email and password to send otp mails from
SMTP_EMAIL=<email-here>
SMTP_PASSWORD=<password-here>
```

## Running Project

### *Pre-requirements*

Must have following tools installed on your system

- MongoDB
- Node.JS

Once cloned, make sure to execute following command(s) in frontend and backend folders before running them

```bash
npm install
```

### *Starting Frontend*

- go to frontend folder, and install the packages through `npm install`.
- setup the environment file as `.env` and execute the following command

```bash
npm run start
```

### *Starting Backend*

- go to backend folder, and install the packages through `npm install`.
- setup the environment file as `.env` and execute the following command

```bash
nodemon index.js
```

In some case the above command mauy not run. In that case, try

```bash
npx nodemon index.js
```

Now Enjoy Running NaiveBaker on your local server!!