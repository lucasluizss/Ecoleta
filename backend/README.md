<h1 align="center">
    <img alt="NextLevelWeek" title="#NextLevelWeek" src="../.github/logo.svg" width="250px" />
</h1>

<h4 align="center">
	:construction: #NextLevelWeek Back-end 1.0 🚀 In progress.. :construction:
</h4>
<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/lucasluizss/Ecoleta?color=%2304D361">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/lucasluizss/Ecoleta">

  <a href="https://www.linkedin.com/in/lucasluizss/">
    <img alt="Made by lucasluizss" src="https://img.shields.io/badge/made%20by-lucasluizss-%2304D361">
  </a>

  <a href="https://github.com/lucasluizss/Ecoleta/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/lucasluizss/Ecoleta">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen">
   <a href="https://github.com/lucasluizss/Ecoleta/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/lucasluizss/Ecoleta?style=social">
  </a>
</p>

<p align="center">
  <a href="#nlw">Next Level Week</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#Global-Requisites">Global Requisites</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#App-Structure">App Structure</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#Install-Configure-Run">Install Configure and Run</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#List-of-Routes">List of Routes</a>
</p>

# Contents

* [Global Requisites](#Global-Requisites)
* [App Structure](#App-Structure)
* [Install, Configure & Run](#Install-Configure-Run)
* [List of Routes](#List-of-Routes)

# Global Requisites

* node (>= 10.5.0)
* tsc (>= 3.0.1)
* typescript (>= 3.0.1)
* sqlite

# App Structure

> _Note: I am mentioning only files/folders_

```bash
├── src
│   ├── controllers
│   │   ├── ItemsController
│   │   ├── PointsController
│   ├── database
│   │   ├── migrations
│   │   │   ├── 00_create_points.ts
│   │   │   ├── 01_create_items.ts
│   │   │   └── 02_create_point_items.ts
│   │   └── seeds
│   │   │   └── create_items.ts
│   │   ├── connections.ts
│   │   └── database.sqlite
│   ├── factories
│   │   ├── item.factory.ts
│   │   └── result.factory.ts
│   ├── routes.ts
│   └── server.ts
├── uploads
│   ├── baterias.svg
│   ├── eletronicos.svg
│   ├── lampadas.svg
│   ├── oleo.svg
│   ├── organicos.svg
│   └── papeis-papelao.svg
├── .env
├── .gitignore
├── knexfile.ts
├── package.json
├── README.md
├── tsconfig.json
└── yarn.lock
```

# Install, Configure & Run

Below mentioned are the steps to install, configure & run in your platform/distributions.

> Note: It is preassumed here that you have mongoose running in background & you have created the database.

```bash
# Clone the repo.
git clone https://github.com/lucasluizss/Ecoleta.git;

# Goto the cloned project folder.
cd Ecoleta;

# Install NPM dependencies.
npm install;

# Edit your DotEnv file using any editor of your choice.
# Please Note: You should add all the configurations details
# or else default values will be used!
vim .env;

# Run the app
yarn dev;
```

# List of Routes

```sh

# API Routes:

+--------+-------------------------+
  Method | URI
+--------+-------------------------+
  GET    | /items
  GET    | /points/
  GET    | /points/:id
  POST   | /points
+--------+-------------------------+
```
