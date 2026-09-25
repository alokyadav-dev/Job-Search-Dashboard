# Job Search Dashboard

A simple and responsive **Job Search Dashboard** built with HTML, CSS, and JavaScript to manage and track job applications in one place.

## 🚀 Features

* Add new job applications
* Edit existing jobs
* Delete jobs
* Add notes for each job
* Track job status

  * Saved
  * Applied
  * Interview
  * Rejected
  * Selected
* Apply directly through the saved job link
* Data persistence using **LocalStorage**
* Unique ID generation using `crypto.randomUUID()`
* Dark / Light mode
* Responsive design for different screen sizes

## 🛠️ Technologies Used

* HTML5
* CSS3
* JavaScript (ES6+)
* DOM Manipulation
* FormData API
* LocalStorage
* JSON
* Browser APIs

## 📂 Project Structure

```text
Job-Search-Dashboard/
│
├── index.html
├── style.css
├── main.js
└── README.md
```

## ⚙️ How It Works

Job information is collected through an HTML form and stored as JavaScript objects.

The jobs are then saved in the browser's **LocalStorage**, allowing the data to remain available after refreshing the page.

JavaScript dynamically creates job cards and provides functionality for:

* Adding jobs
* Editing jobs
* Deleting jobs
* Displaying saved jobs
* Managing notes
* Switching between light and dark themes

## 💾 Data Storage

This project uses **LocalStorage** instead of a backend database.

Therefore:

* Data is stored only in the current browser.
* Data is not shared between different devices or browsers.
* Clearing browser LocalStorage will remove the saved jobs.

## 🎯 Purpose

This project was built as a practical JavaScript project to apply concepts such as:

* DOM manipulation
* Events
* Forms and FormData
* Arrays and objects
* `map()` and `filter()`
* JSON
* LocalStorage
* CRUD operations
* Dynamic UI rendering
* Browser APIs

## 🔮 Future Improvements

Possible future improvements include:

* Search and filtering
* Dynamic dashboard statistics
* Backend database integration
* User authentication
* REST API integration
* React frontend
* Java Spring Boot backend

## 📸 Project Preview

<img width="1539" height="846" alt="Screenshot 2026-09-25 222957" src="https://github.com/user-attachments/assets/5338857f-d2dd-47b7-b60d-4867a66117e8" />


## 👨‍💻 Author

**Alok Yadav**

Built as part of my frontend and JavaScript development learning journey.
