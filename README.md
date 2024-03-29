# **SE-Capstone-Project**

## Objective
* Develop an improved version of UWC 1.0
* Develop an advanced employee management system to bring together all relevant employee information
* Develop an user friendly platform for each stakeholders to contact

## Technology

### Frontend
You need to go to the folder se-react then running the following commands
```{bash}
npm install --force --save
```
```
npm start
```
### Backend
```
activate <env_name>
```
```
cd se_project
```
```
python manage.py runserver
```
## Run locally
You need to clone the repository then install all require packages in an environment. We recommend you use anaconda distribution
### Install Anaconda

Download here: https://www.anaconda.com/products/distribution

### Install requirements
```{bash}
conda create -n <env_name> python=3.9
```
```
conda activate <created_env_name>
```

```
pip install -r requirements.txt
```
### Create database
You need to go to the folder containing the **manage.py** file then running the following commands

```
python manage.py makemigrations usr base backofficer api
```

```
python manage.py migrate
```
Running the application on your local.
```
python manage.py runserver
```

## **IMPORTANT** 
Whenever you install packages in order to implement the functions, you need to state that information of packages installed in the **requirements.txt** file by running the following command 

```
pip freeze > requirements.txt
```