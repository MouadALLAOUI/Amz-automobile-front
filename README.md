# 🚗 AMZ AUTOMOBILE Front

## 🧭 Introduction

**AMZ AUTOMOBILE** is a desktop web application built to help manage mechanical tasks efficiently.
It allows users to track tasks such as **oil changes**, record **who performed them**, **when**, and for **which vehicle (plate number)**.

This system simplifies workshop management and ensures maintenance history is transparent and organized.

---

## 📜 Prologue

After my brother — who works as a mechanic — asked for a better way to organize his work,
I started developing **AMZ AUTOMOBILE** to assist him and other mechanics in managing daily tasks more effectively.

---

## 🏗️ Project Structure

```bash
Amz-automobile-front/
├── public/
│    ├── favicon.ico
│    ├── index.html
│    ├── manifest.json
│    └── robots.txt
├── src/
│    ├── component/         # All reusable components
│    ├── env/
│    │    ├── strings/      # Multilingual support (FR/EN)
│    │    ├── environnement.jsx
│    │    └── routers.jsx
│    ├── media/             # Images and icons
│    ├── store/
│    │    ├── store.js
│    │    └── userSlice.js
│    ├── styling/           # SCSS, fonts, and style assets
│    ├── views/
│    │    ├── content/      # Main client UI
│    │    ├── Login/        # Login screen
│    │    ├── notfound.jsx
│    │    └── Templates.js
│    └── index.js
├── .editorconfig
├── .eslintrc.json
├── .gitbranch
├── .gitignore
├── main.js
├── package-lock.json
├── package.json
├── preload.js
├── README.md
└── yarn.lock
```

---

## ⚙️ Installation & Usage

### 📦 Requirements

* `React` v18.3.1+
* `Node.js`
* `npm` (or `yarn`)

---

### 🚀 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/MouadALLAOUI/Amz-automobile-front
   ```

2. Navigate into the project directory:

   ```bash
   cd Amz-automobile-front
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

> ✅ Ensure there are no installation errors and that a `node_modules` folder is created in the root directory.

---

### ▶️ Run the Application

Run the following commands in **two separate terminals**:

```bash
npm start
```

```bash
npm run electron
```

This will start the React frontend and the Electron desktop shell.

---

## ✨ Features

* ✅ CRUD operations for tasks
* 👥 User management
* 📊 Graph visualization
* 📋 Dynamic table generation
* 🧾 Export tasks to PDF

---

## 🧩 Future Plans

* [ ] Fix bugs and optimize performance
* [ ] Add user roles and permissions
* [ ] Create admin dashboard
* [ ] Deploy online
* [ ] Enable offline functionality
* [ ] Add more features based on client needs

---

## 🤝 Contributing

Contributions are always welcome!

1. **Fork** the repository
2. **Create** your feature branch

   ```bash
   git checkout -b AmazingFeature
   ```

3. **Commit** your changes

   ```bash
   git commit -m "Add some AmazingFeature"
   ```

4. **Push** your branch

   ```bash
   git push origin AmazingFeature
   ```

5. **Open** a Pull Request 🎉

---

## 💡 Acknowledgments

Special thanks to:

* [Stack Overflow](https://stackoverflow.com) — for debugging and problem-solving
* [ChatGPT](https://chat.openai.com) — for guidance and development support
