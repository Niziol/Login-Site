# Login Site
<table>
<tr>
<td>
	The main goal of the project, is to consolidate and show in practice React hooks and create a Custom Context Povider for authorization. Visually, the project shows a very basic login page.
</td>
</tr>
</table>

## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Screenshots](#screenshots)
* [Setup](#setup)
* [Acknowledgements](#acknowledgements)


## General Information
The main focus of the project is the code, not the appearance of the page. Using the user login and authorization page as an example, the practical use of the `useEffect` hook and its "side effects" was demonstrated. Then the difference in the use of the `useState` and `useReducer` hooks is shown, developing them to create a dynamic context API for login authorization using the `useContext` hook.


## Technologies Used
- React


## Features
- Login form with validation
- Separate view for logged in and logged out user
- Storage of successful user authorization


## Screenshots
### Loing Form
![LogginForm](https://github.com/Niziol/Login-Site/assets/56153736/047dd073-abd4-4363-b5fb-a962e99991d0)

### Logged in user
![LoggedIn](https://github.com/Niziol/Login-Site/assets/56153736/c9d7f994-8922-4eaf-aed1-adbdd59bf9bb)

### Authorization context provider
![AuthContextProvider](https://github.com/Niziol/Login-Site/assets/56153736/23844d33-29d8-47ce-a6ff-1c30d9bedd5e)



## Setup
To clone and run this web application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/Niziol/Login-Site.git

# Go into the repository
$ cd Login-Site

# Install dependencies
$ npm install

# Run the app
$ npm start
```


## Acknowledgements
- This project was based on [React - The Complete Guide 2024 (incl. React Router & Redux)](https://www.udemy.com/course/react-the-complete-guide-incl-redux/).
