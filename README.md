## 🧭 Approach

The project is divided into **three main parts**:

1. **Workers**
2. **Backend Server**
3. **Frontend Client**

---

### ⚙️ Workers

The **worker layer** is responsible for handling data fetching and processing.  
It is further divided into **two separate workers**:

1. **Fetcher Worker**
   - Fetches data from external APIs.  
   - Parses the XML responses.  
   - Pushes the cleaned data into a **Redis queue** for processing.  

2. **Inserter Worker**
   - Pulls data from the Redis queue.  
   - Inserts the processed records into **MongoDB**.  

Both workers are built using **BullMQ** and **Redis** for reliable job queue management.

---

### 🧩 Backend Server

The backend is developed using **Express.js**.  
It provides a set of **RESTful APIs** to interact with the MongoDB database and serve data to the frontend client.

---

### 💻 Frontend Client

The frontend is built with **Next.js**, which consumes the APIs exposed by the backend.  
It provides an intuitive user interface for displaying and managing the data.
