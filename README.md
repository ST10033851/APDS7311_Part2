[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/X7Vf0Ahx)

# Customer International Payments Portal (PalPay)

#### ST10033851 – Jereshan Sinan  
#### ST10079389 - Kaushil Dajee  
#### ST10030291 - Avish Judnarain  
#### ST10091324- Eben Mwema  

YouTube Video:
https://youtu.be/OcQmGu4KCHc?feature=shared 

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Video Demonstration](#video-demonstration)
4. [Backend](#backend)
    - [Key Technologies](#key-technologies)
    - [Security Implementations](#security-implementations)
5. [Frontend](#frontend)

## Introduction

Welcome to the Customer International Payments Portal project! This portal is designed to provide a secure and efficient interface for customers to manage their international payments. The application includes a robust API to handle various payment functionalities while ensuring the utmost security and compliance with best practices. The system implements password security, input validation, and SSL to protect against common web vulnerabilities.

## Features
- **Secure user authentication** with hashed and salted passwords.
- **Input whitelisting** using RegEx patterns for data validation.
- **Encrypted traffic** served over SSL for enhanced security.
- Protection against common attacks such as **SQL Injection**, **Cross-Site Scripting (XSS)**, and **Cross-Site Request Forgery (CSRF)**.

## Video Demonstration
A video demonstrating the functionality of the portal is provided.

## Backend

The backend of the Customer International Payments Portal is developed using Node.js and Express.js, with MongoDB as the database.

### Key Technologies
- **Node.js**: JavaScript runtime for server-side development.
- **Express.js**: Web application framework for building APIs.
- **MongoDB**: NoSQL database for storing user and transaction data.
- **Mongoose**: ODM library for MongoDB to simplify data modeling.
- **Bcrypt**: Library for hashing and salting passwords.
- **Express-brute**: Middleware to handle brute-force attacks.

### Security Implementations

1. **Password Security**:
   - User passwords are hashed and salted using Bcrypt before being stored in the database.

2. **Input Validation**:
   - All user inputs are validated against predefined RegEx patterns to ensure they conform to expected formats, preventing invalid data entry and enhancing security.

3. **SSL**:
   - The application is configured to serve all traffic over SSL, ensuring data transmitted between clients and the server is encrypted.

4. **Protection Against Attacks**:
   - Comprehensive measures are in place to protect against SQL Injection, XSS, CSRF, and other common web attacks.

## Frontend

The frontend of the Customer International Payments Portal provides an intuitive and secure user interface. The key pages and features include:

- **Home Page**: A welcoming page for users to access general information about the portal.
- **Login and Register Pages**: Users can register or log in securely. Until logged in, users are unable to access any transaction pages.
- **View Transactions Page**: Allows users to view all their previous transactions after logging in. The navigation link to this page is hidden until the user has successfully logged in.
- **Create Transactions Page**: Users can create new international transactions. This page is also hidden from the navigation bar until the user is logged in.
- **Update and Delete Options**: Each transaction has an option to update or delete the transaction. These options are only available to authenticated users.

### Security Features in Frontend
- **Authentication Redirect**: If a user attempts to manually change the URL to access the transaction pages without being logged in, they are automatically redirected to the login page.
- **Hidden Navigation Links**: The "View Transactions" and "Create Transactions" navigation links are only visible after the user successfully logs in.

Steps to run Web App
Backend:
1. Clone the repository
2. Open a terminal and say cd PalPayPaymentsPlatform
3. Followed by cd backend
4. Then npm install
5. Wait for all the packages to be downloaded then run npm run start and it will connect to the database

Frontend:
1. Open a terminal and say cd PalPayPaymentsPlatform
2. Followed by cd frontend
3. Then npm install
4. Wait for all the packages to be downloaded then run npm run start and it will begin to compile and run

Thank you for using our app! 😊
