# Repository name : OC_Project_06_Repository

Project 06: Develop a user interface for a Python web application

A. Description of the web application
    
    The web application allows subscribers of the juststreamit association to 
    view a ranking of interesting films in real time.

B. Code structure

    The code structure contains the file named REDAME.md and two folders backend and frontend.
        - The backend folder contains the package Python for running the server of the OCMovies API
        - The frontend contains :
            * the file named index.html
            * the CSS files
            * the JS files

C. The steps to follow to open the web page index.html :

    I. Preparation of the project environment
        1. Download and install Python version 3.10
            1.1.  Download Python 3.10 using the URL https://www.python.org/downloads/ and
                  choosing your Windows, macOS or Linux/Unix system
            1.2.  Click the download link
            1.3.  Install this version of Python that has the venv module. However, version < 3.3 does not have venv.
        2. Download and install the latest version of Git (Package Version Manager)
            2.1.  Download the latest version of Git using the URL https://git-scm.com/downloads/
                  and choosing your Windows, macOS or Linux/Unix system
            2.2.  Click the download link
            2.3.  Install this version of Git that has a Git Bash terminal
        3. Download and install the latest version of PyCharm
            3.1.  Download the latest version of PyCharm using the URL https://www.jetbrains.com/en-us/pycharm/
            3.2.  Click the Download button
            3.3.  Choose your Windows, macOS or Linux/Unix system
            3.4.  Click the Download button of the Community free version for pure Python development
            3.5.  Install this version of PyCharm which has Git: package version manager.
                  PyCharm also has a PS (PowerShell) terminal similar to the "Windows PowerShell" terminal

    II. Creating a virtual environment (e.g. env) using "Git Bash" or "PyCharm" terminal

        1.  Run "Pycharm" or "Git Bash" to access its terminal
        2.  Navigate to your project folder (P06, for example) that has already been created by running the command:
                cd P06
        3.  Type and run the command below to create a new virtual environment named env:
                python -m venv env

    III. Activation and Deactivation virtual environment using "Git Bash" or "PyCharm" terminal

        1.  Activation under MacOS or Linux/Unix of the virtual environment using the "Git Bash" terminal by running:
                source env/bin/activate
        2.  Activate the virtual environment on Windows using the "Git Bash" terminal by running the command:
                source ./env/Scripts/activate
        3.  Activation under Windows of the virtual environment using the "PyCharm" terminal by running the command:
                env/Scripts/activate

            In case the virtual environment has not been activated, you can run, before activation, the command:
                Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope LocalMachine
            So, you can use these two links to help you solve this problem:
                https://www.windows8facile.fr/powershell-execution-de-scripts-est-deactivee-activer/
                https://www.pctricks.com/practice/tricks/3908.htm

        4.  Deactivate the virtual environment using the "Git Bash" or "PyCharm" terminal by running the command:
                deactivate

    IV. Cloning of the GitHub repository from the link https://github.com/RochdiGZ/OC_Project_06_Repository
        1.  Go to "Git Bash" or "Pycharm" terminal to clone the project locally on your computer
        2.  Type and run the command below using the link above
                git clone https://github.com/RochdiGZ/OC_Project_06_Repository.git
        3.  Launch PyCharm and open the added project locally, in the working folder, named OC_Project_06_Repository
            and having been hosted on GitHub and containing the file named REDAME.md and the two folders named
            backend and frontend :


    V. Installation
        1.  Create a virtual environment for the project with `$ py -m venv env` on windows or
        `$ python3 -m venv env` on macos or linux. (See Paragraph II.)

        2.  Activate the virtual environment with `$ env\Scripts\activate` on windows or
        `$ source env/bin/activate` on macos or linux. (See Paragraph III.)

        3.  Move to the backend root folder with `$ cd backend`

        4.  Install project dependencies with `$ pip install -r requirements.txt`

        5.  Create and populate the project database with `$ python manage.py create_db`

        6.  Run the server with `$ python manage.py runserver`
            
        When the server is running after step 6 of the procedure, the OCMovies API can be requested from 
        endpoints starting with the following base URL: http://localhost:8000/api/v1/titles/.
            
        Steps 1 and 3-5 are only required for initial installation. For subsequent launches of the API,
        you only have to execute step 2 from the root folder of the project and step 6 from the folder named backend.

        7.  Run the file index.html from the folder named frontend for running the web application

---

For any information on the needs of running the web application, please contact me by email:
Rochdi.GUEZGUEZ@Gmail.Com

---
