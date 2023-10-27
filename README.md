# AutoAuthority - Road Transport Management System

AutoAuthority is a Road Transport Management System designed to streamline and automate various processes related to vehicle ownership, fine management, and document verification. This project utilizes technologies like Node.js, Express, Handlebars, MySQL, and AWS RDS to provide a comprehensive solution for both vehicle owners and RTO (Regional Transport Office) officers.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [Contributing](#contributing)

## Features

- **User Registration**: Vehicle owners can sign up and create their profiles with various details, including personal information and contact information.

- **User Login**: Registered users can log in to access their dashboard and manage their vehicles and fines.

- **License Validation**: The system validates the user's driving license and provides notifications for license expiration.

- **Fines Management**: Users can view and pay their fines. RTO officers can impose fines on vehicles.

- **Ownership Transfer**: Vehicle owners can initiate ownership transfer requests, and RTO officers can approve or deny these requests.

- **Document Verification**: Document verification for users, including Aadhar card, PAN card, and voter ID, is implemented.

- **Image Upload**: Users can upload images of documents, which are then verified by RTO officers.

- **FastTag Management**: The system includes features for creating FastTag accounts and checking balances.

## Technologies

- Node.js
- Express
- Handlebars
- MySQL
- AWS RDS (Amazon Relational Database Service)

## Installation

1. Clone the repository: `git clone https://github.com/yourusername/autoauthority.git`
2. Navigate to the project directory: `cd autoauthority`
3. Install the project dependencies: `npm install`
4. Set up the MySQL database and configure the connection in `app.js`.
5. Create the required tables in your MySQL database.
6. Launch the application: `npm start`

## Usage

1. Register as a user or log in if you already have an account.
2. Access your dashboard, view fines, manage vehicle ownership, and verify documents.
3. RTO officers can log in, approve or deny ownership transfers, and verify user documents.
4. Enjoy the streamlined road transport management experience.

## Project Structure

- `app.js`: The main application file, responsible for server setup.
- `public/`: Contains static assets like CSS and client-side scripts.
- `views/`: Handlebars templates for rendering HTML views.
- `routes/`: Express routes for handling different parts of the application.
- `uploads/`: Storage directory for user-uploaded images.

## Screenshots

- Include some screenshots of your application to give users a visual understanding of the project.

## Contributing

Contributions are welcome! Feel free to open issues, submit pull requests, or provide feedback on the project.
