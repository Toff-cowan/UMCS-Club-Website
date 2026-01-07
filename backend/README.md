# .env setup and Mongo DB set up 

ensure that you have a gitignore file on you machine so that you do not end up commit the .env to the branch this is dangerous and makes you machine vulnerable

## Setting up the .env 

1. in teh backend folder, create a file named ".env", this is where your environmental variables are and how your backend accesse syour local database. 
2. after setting up the you will see a .env.example, this how your .env file should look like, if you installed mongodb and created a database, copy the url/ connection string and paste that in your MONGO_URI line. 
3. after which, please ensure you install the correct packages so in each folder do "npm install" for frontend and "npm install dotenv cors mongoose express" for backend. 
4. this should have the dependencies installed. all you need to do now is in the backend terminal "UMCS-Club-Website\backend" you will do "npm run seed" this will load the mockdata and then you will have the necessary backend set up so that you can see the data when you are building your fronten