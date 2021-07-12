<p align="center">
  <a href="" rel="noopener">
 <img width=330px height=200px src="https://pointblancmedia.com/wp-content/uploads/2020/04/url-shortener-theplungedaily.jpg" alt="Project logo"></a>
</p>

<h3 align="center">Url Shroter API</h3>

<div align="center" >

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

[![Shorty](https://circleci.com/gh/circleci/circleci-docs.svg?style=svg)](https://app.circleci.com/pipelines/github/sameh-rm/url-shorter-using-bitly-api/180/workflows/0655ed1d-4304-4cc1-b592-11a21d269cf8)
</div>

---

<p align="center"> URL Shorter Demo API for Udacity Devops Capestone.
    <br> 
</p>

## 📝 Table of Contents

- [Getting Started](#getting_started)
- [Usage](/backend)
- [Built Using](#built_using)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need **[Python 3.7](https://www.python.org/downloads/release/python-377/)** installed.

- Clone the repo

  ```
  git clone https://github.com/sameh-rm/url-shorter-using-bitly-api.git
  ```

- your dotenv file must contain

  ```bash
    # Environment variables
    SECRET_KEY=YOUR_SECRET_KEY
    # mlab MONGO URI
    MONGO_URI=YOUR_MONGO_URI
    MONGO_TEST_URI=YOUR_MONGO_TEST_URI
    # DOMAIN variable is used as a prefix to the local api shortened link id
    DOMAIN=YOUR_DOMAIN
    # Bitly access token
    ACCESS_TOKEN=YOUR_ACCESS_TOKEN
  ```

### Installing

##### &nbsp;&nbsp;Backend

- create virtual env:
  To create a virtual environment, decide upon a directory where you want to place it, and run the venv module as a script with the directory path:

  ```
  python -m venv env
  ```

* Once you’ve created a virtual environment, you may activate it
  - On Windows, run:
    ```cmd
    env\Scripts\activate.bat
    ```
  - On Unix or MacOS, run:
    ```bash
    source env/bin/activate
    ```
* installing packages:
  ```bash
  pip install -r requirements.txt
  ```

- testing the project

  ```bash
  python manage.py test
  ```

- starting the project

  ```bash
  python manage.py run
  ```

##### &nbsp;&nbsp;Frontend

- cd into the frontend folder
  - npm, run:
    ```bash
    npm install
    ```
  - yarn, run:
    ```bash
    yarn install
    ```

* start frontend:
  ```bash
  yarn start #or
  npm start
  ```

## ⛏️ Built Using <a name = "built_using"></a>

- [MongoDB](https://www.mongodb.com/) - Database
- [FLASK RESTPLUS](https://flask-restplus.readthedocs.io/en/stable/index.html) - Flask Rest Plus framework
- [FLASK](https://flask.palletsprojects.com/en/2.0.x/) - Python Web Framework
- [Python](https://www.python.org/) - Python 3.7

## ✍️ Authors <a name = "authors"></a>

- [@samerh-rm](https://github.com/sameh-rm) - Initial work

## 🎉 Acknowledgements <a name = "acknowledgement"></a>

- Hat tip to anyone whose code was used
- Inspiration
- References
