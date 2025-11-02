# 🍳 CookBook MVC Project

A dynamic **Node.js + Express** application built using the **MVC architecture** with **EJS templates** and **SQLite**.  
The app integrates with the **Spoonacular API** to fetch live recipes and visualize insights through **Chart.js**.  

---

## 🚀 Features
- Full CRUD operations for recipes and ingredients  
- Integration with the **Spoonacular API** for recipe search  
- Dynamic charts showing cuisine and difficulty distributions  
- Clean EJS-based layouts with reusable partials  
- SQLite database with auto schema creation and seeding  
- Ready for deployment on **Azure App Service**

---

## 🧩 Folder Structure
CookBook_Dynamic/
├─ public/ # Static assets (CSS, JS, images)
│ └─ images/erd.png # ERD diagram image
├─ src/
│ ├─ app.js # Express bootstrap + routing setup
│ ├─ db.js # SQLite connection + schema init
│ ├─ controllers/ # Business logic
│ ├─ models/ # Database models
│ └─ routes/ # Route definitions
├─ views/ # EJS templates (home, about, charts, recipes)
├─ .env.example # Environment variable template
├─ .gitignore
├─ package.json
└─ README.md


---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/RishikaKatna46/CookBook_Dynamic.git
cd CookBook_Dynamic


2️⃣ Install Dependencies
npm install

3️⃣ Seed the Database
npm run seed

4️⃣ Start the Development Server
npm run dev


5️⃣ Open in Browser
Visit → http://localhost:3000
🧠 Environment Variables
Your local .env file should contain:
SPOONACULAR_API_KEY=YOUR_REAL_KEY
PORT=3000
DB_FILE=/home/site/data/cookbook.sqlite
📝 Note:
A sample .env.example is included in the repository for reference.

🌐 Deployment (Azure App Service)
Steps to Deploy:
Create an Azure App Service (Runtime: Node 18+).
Go to Deployment Center → connect your GitHub repository.
In Configuration → Application Settings, add:
SPOONACULAR_API_KEY=<your-key>
PORT=3000
DB_FILE=/home/site/data/cookbook.sqlite
(Optional) Set a startup command:
npm start
Click Save → Redeploy.
Visit your live app at:
https://<your-app-name>.azurewebsites.net
👥 Team Roles
Member	Role	Responsibilities
Member 1	Frontend Lead	Layouts, partials, CSS styling, UI consistency
Member 2	CRUD Engineer	Models, controllers, and recipe routes
Member 3	Data & Charts	DB seed, /api/stats endpoint, Chart.js integration
Member 4 	Platform & Docs	App bootstrap, .env setup, ERD, About page, README, Azure deployment

🗺️ Entity Relationship Diagram (ERD)

The database uses one-to-many relationships between recipes and ingredients.

💡 Technologies Used
Node.js + Express
EJS templating engine
SQLite database
Chart.js for charts
Axios for API calls
dotenv for environment variables
method-override for form PUT/DELETE support

🏁 Run Locally
npm run seed
npm run dev
Then open → http://localhost:3000
🏆 Acknowledgments
Special thanks to the CookBook MVC team and our faculty mentors at the University of South Florida for their support and guidance throughout this project.