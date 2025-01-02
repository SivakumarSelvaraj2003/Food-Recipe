# Recipe Explorer

## Project Overview
Recipe Explorer is a full-stack web application that enables users to explore and interact with recipes. The platform allows users to register, log in, and access exclusive recipe content. Users can browse, search, and view detailed recipes, leave comments, and rate dishes. The app features a clean and interactive UI powered by React and integrates a secure authentication system for personalized experiences.

The project uses **React** for the frontend, **Node.js/Express** for the backend, and **MongoDB** for storing user and recipe data.

---

## Features 

### User Authentication 
- **Login and Registration**: Allows users to create accounts, log in, and access exclusive content.
- **Secure Password Storage**: Passwords are hashed using **bcrypt**.
- **JWT-based Authentication**: Uses JSON Web Tokens (JWT) for session management.

### Recipe Exploration 
- **Recipe Search**: Users can search for recipes by keywords.
- **Recipe of the Day**: Highlights a featured recipe each day.
- **Popular Recipes**: Displays a list of popular recipes with details such as title, description, and ratings.
- **Detailed Recipe View**: Each recipe includes ingredients, instructions, and comments.

### User Interaction 
- **Comments and Ratings**: Users can submit feedback, rate recipes, and view all comments.
- **Speech Synthesis**: Recipe instructions can be read out loud using the Speech Synthesis API.
- **Dynamic Animations**: Engaging animations powered by **AOS** (Animate On Scroll).

---


## Technologies Used 

### Frontend
- **React**: For building a dynamic, component-based UI.
- **AOS**: For smooth scrolling animations.
- **CSS**: Custom styling for a responsive design.

### Backend
- **Node.js**: JavaScript runtime for server-side scripting.
- **Express.js**: Framework for building the RESTful API.
- **bcrypt.js**: For password hashing.
- **jsonwebtoken**: For secure token generation.
- **MongoDB**: Database for storing user and recipe data.
- **Mongoose**: Object Data Modeling (ODM) for MongoDB.

### Other Tools
- **React Router**: For navigation between components.
- **FontAwesome**: For intuitive icons.
- **Axios**: For handling HTTP requests.
- **dotenv**: For managing environment variables.
- **Body-parser** & **Cors**: For handling requests and cross-origin issues.

---


## Installation and Setup 

### Prerequisites
- **Node.js** (v14 or above)
- **MongoDB** (running instance)

### Steps
1. **Clone the Repository**:

   ```bash
   git clone https://github.com/SivakumarSelvaraj2003/Food-Recipe.git
   cd foodrecipe
  

### Install Dependencies:
### Frontend:

bash
   cd login-system
   npm install

###  Backend:   

bash
   cd backend
   npm install


### Set Up Environment Variables

### Create a .env file in the backend folder with the following:
 
 **.env**:   
  PORT=5000
  MONGO_URI=mongodb://127.0.0.1:27017/recipe-explorer  


###   Run the Application:

### Start MongoDB server if it's not already running.

 **Backend:**:   

      bash
      cd backend
      npm start

  **Frontend:**:        
      
      bash
      cd login-app
      npm start
      Open your browser and go to http://localhost:5000 to access the app.


---

### Folder Structure      

recipe-explorer/
├── backend/
│   ├── models/           # MongoDB schemas (User, Recipe)
│   ├── routes/           # API routes (auth, recipes)
│   ├── .env              # Environment variables
│   ├── server.js         # Main server file
│   └── package.json      # Backend dependencies
│
├── frontend/
│   ├── src/              
│   │   ├── components/ assets   # Reusable components (LoginForm, Recipe, RecipeDetails)
│   │   ├── App.js        # Main React app
│   │   ├── index.js      # React DOM rendering
│   │   └── styles/       
│   │       └── App.css   # Custom styling
│   ├── public/           
│   │   ├── images/       # Static assets
│   │   └── index.html    # HTML template
│   └── package.json      # Frontend dependencies
│
└── README.md     



---


### API Endpoints

## User Authentication

- **POST /api/auth/register** : Register a new user.
- **POST /api/auth/login** : Log in an existing user.


## Recipes

- **GET /api/recipes/search?q=<query>**: Search for recipes by keyword.
- **GET /api/recipes**: Fetch all recipes.
- **POST /api/recipes**: Add a new recipe.

## Comments

- **POST /api/commentsPOST /api/comments**: Submit a comment for a recipe.
- **GET /api/comments**: Retrieve all comments for a recipe.

---

### Usage

- **Register a New Account**: Enter email, password, and confirm password to sign up.
- **Log In**: Use your registered credentials to log in and access exclusive content.
- **Explore Recipes**: Browse, search, and view detailed recipes.
- **Submit Comments**: Rate recipes and submit feedback.

---


  ### Contact 
## For questions or suggestions, feel free to contact:

- **Email**: siva4kumar2003@gmail.com
- **GitHub**: SivakumarSelvaraj2003


### Happy cooking and coding! 
