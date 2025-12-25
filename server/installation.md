
###**Step 1: Create the Project Root**=

```bash
mkdir civic-hero
cd civic-hero

```

---

###**Step 2: Setup the Backend (Server)**We will build the server first. This will handle the database and API.

1. **Create the folder:**
```bash
mkdir server
cd server

```


2. **Initialize the project:**
```bash
npm init -y

```


*(This creates a `package.json` file).*
3. **Install the necessary libraries:**
```bash
npm install express mongoose cors dotenv

```


* `express`: The framework to build the API.
* `mongoose`: To connect to MongoDB.
* `cors`: Allows your Frontend to talk to your Backend.
* `dotenv`: To hide your passwords.


4. **Install "Nodemon" (for development):**
This tool automatically restarts your server when you save a file.
```bash
npm install --save-dev nodemon

```


5. **Add "type": "module" to package.json:**
To use modern imports (`import express from 'express'`) instead of the old (`require('express')`), open `server/package.json` and add this line:
```json
"type": "module",
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
},

```



---

###**Step 3: Setup the Frontend (Client) with Vite**We are **not** going to use `create-react-app`. We will use **Vite**. It is the modern standard—10x faster and supports `.jsx` by default.

1. **Go back to the root folder:**
```bash
cd ..

```


2. **Create the React App:**
```bash
npm create vite@latest client -- --template react

```


3. **Install Dependencies:**
```bash
cd client
npm install
npm install axios @mui/material @emotion/react @emotion/styled @mui/icons-material react-router-dom

```


* `axios`: To make API calls to your backend.
* `@mui/material`: The UI library (modern version of what the old repo used).
* `react-router-dom`: For multiple pages.



---

###**Step 4: Verify the Structure**Your folder structure should now look like this:

```text
/civic-hero
  /server
    - package.json
    - node_modules
  /client
    - index.html
    - package.json
    - vite.config.js
    - /src
      - App.jsx
      - main.jsx

```

---

###**Step 5: Create the Basic Server File**Let's make sure the backend actually works.

Create a file named `server/index.js` and paste this:

```javascript
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

// Basic Route to test functionality
app.get('/', (req, res) => {
    res.send('Civic Hero API is running');
});

// We will connect to MongoDB later. For now, just start the server.
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});

```

---

###**Step 6: Run Your New Project**You will need **two** terminals open.

**Terminal 1 (Backend):**

```bash
cd civic-hero/server
npm run dev

```

*Expected Output:* `Server running on port: 5000`

**Terminal 2 (Frontend):**

```bash
cd civic-hero/client
npm run dev

```

*Expected Output:* `Vite v4.0.0  Local: http://localhost:5173/`

**Action:**
Do this now. Once you have both running, tell me, and we will build the **Database Connection** properly so you can start saving "City Issues."