[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/X7Vf0Ahx)

# Customer International Payments Portal (PalPay)
##### ST10033851 – Jereshan Sinan 
##### ST10079389 - Kaushil Dajee 
##### ST10030291 - Avish Judnarain 
##### ST10091324- Eben Mwema 
## Introduction
Welcome to the Customer International Payments Portal project! This portal is designed to provide a secure and efficient interface for customers to manage their international payments. The application includes a robust API to handle various payment functionalities while ensuring the utmost security and compliance with best practices. The system implements password security, input validation, and SSL to protect against common web vulnerabilities.

#### Features
Secure user authentication with hashed and salted passwords.
Input whitelisting using RegEx patterns for data validation.
Encrypted traffic served over SSL for enhanced security.
Protection against common attacks such as SQL Injection, Cross-Site Scripting (XSS), and Cross-Site Request Forgery (CSRF).
#### Video Demonstration
A video demonstrating the functionality of the portal is provided.

## Backend
The backend of the Customer International Payments Portal is developed using Node.js and Express.js, with MongoDB as the database.

#### Key Technologies
Node.js: JavaScript runtime for server-side development.
Express.js: Web application framework for building APIs.
MongoDB: NoSQL database for storing user and transaction data.
Mongoose: ODM library for MongoDB to simplify data modeling.
Bcrypt: Library for hashing and salting passwords.
Express-brute: Middleware to handle brute-force attacks.

#### Security Implementations
Password Security:
User passwords are hashed and salted using Bcrypt before being stored in the database.
Input Validation:
All user inputs are validated against predefined RegEx patterns to ensure they conform to expected formats, preventing invalid data entry and enhancing security.
SSL:
The application is configured to serve all traffic over SSL, ensuring data transmitted between clients and the server is encrypted.
Protection Against Attacks:
Comprehensive measures are in place to protect against SQL Injection, XSS, CSRF, and other common web attacks.

## Frontend

Thank You for using our app :) 
