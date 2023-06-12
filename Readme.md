# Marquee Equity Assignment

## Installation

```shell
$ https://github.com/HarshKumarraghav/MarqueeEquity-Assessment.git
$ cd MarqueeEquity-Assessment
$ npm install
$ npm run dev
```

This project implements a simplified version of JWT (JSON Web Token) authentication for an application. The authentication process involves storing user credentials in the local storage and comparing them during login to grant access to the next page. The project also includes robust input validation and a responsive Todo page with subtask functionality.

![Project Image](./public/assets/MELogo.svg)

## Features

### User Object Creation and Storage

When the application is opened, a user object is created with the following details:

```json
{
  "name": "John Doe",
  "email": "johndoe@gmail.com",
  "password": "Qwerty@123"
}
```

This user object is then stored in the local storage for later use.

## Login Process

The login process involves comparing the entered user credentials (email and password) with the stored user object. If the entered credentials match the stored user's credentials, the application proceeds to the next page. Otherwise, access to the next page is denied.

## Input Validation

To ensure the security and integrity of user data, a utility function for input validation has been implemented. The function checks whether the entered email and password meet industry standards. Here's an example of the validation code:

```javascript
import { loginInfoType } from "../types/AuthType";

export const validateInput = (
  loginInfo: loginInfoType,
  setValidationErrors: React.Dispatch<React.SetStateAction<loginInfoType>>
) => {
  const errors: loginInfoType = {
    email: "",
    password: "",
  };

  if (!loginInfo.email) {
    errors.email = "Please enter an email address";
  } else if (!/\S+@\S+\.\S+/.test(loginInfo.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!loginInfo.password) {
    errors.password = "Please enter a password";
  } else if (loginInfo.password.length < 8) {
    errors.password = "Password must be at least 8 characters long";
  } else if (!/\d/.test(loginInfo.password)) {
    errors.password = "Password must contain at least one number";
  } else if (!/[a-z]/.test(loginInfo.password)) {
    errors.password = "Password must contain at least one lowercase letter";
  } else if (!/[A-Z]/.test(loginInfo.password)) {
    errors.password = "Password must contain at least one uppercase letter";
  } else if (!/\W/.test(loginInfo.password)) {
    errors.password = "Password must contain at least one special character";
  }

  setValidationErrors(errors);

  return Object.keys(errors).length === 0;
};
```

The Todo page is now fully responsive, and I can add subtasks to the task. Additionally, I can delete and edit the subtask, and there is also a state to show and hide the subtask. Furthermore, to prevent injection attacks, I have written a utility function that doesn't allow any HTML injection.

```javascript
export const sanitizeInput = (input: string): string => {
  // Remove special characters using regular expressions
  const sanitizedText = input.replace(/[^\w\s]/gi, "");
  // Escape HTML entities
  const escapeHtml = (text: string): string => {
    const map: { [key: string]: string } = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
  };

  return escapeHtml(sanitizedText);
};
```
