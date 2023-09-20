# NESTJS ECO

## Requirements
- Node.js version 16.20.2
- MongoDB
- Redis
- Queue
## Installation
Node.js version 16.20.2:
####Copy the sample configuration file and configure it:
```.env.example --> .env```

## Authentication and Authorization
### Login (Guards)
Your project includes JWT-based authentication with the following functionality:
Register
Login
Logout
Refresh Token
User Permissions
### Queue
After logging in, the project retrieves all users and stores them in the Redis cache
#### User permissions are as follows:
```ADMIN: Can retrieve all users```
```USER: Can only view their own profile using their access token (cannot retrieve all users)```


You can also import postman: [here](https://api.postman.com/collections/28185982-5f79afa7-aa9a-45cc-b11b-8a6c360bfedd?access_key=PMAT-01HARJKKZB37438FT0P0JYP8NF)