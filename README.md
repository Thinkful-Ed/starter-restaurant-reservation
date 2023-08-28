# Restaurant Reservation System

The following makes references a hypothetical scenario:
You have been hired as a full stack developer at _Periodic Tables_, a startup that is creating a reservation system for fine dining restaurants.
The software is used only by restaurant personnel when a customer calls to request a reservation.
At this point, the customers will not access the system online.


**Live Project**: [Explore the deployed project here](https://restaurant-reservation-frontend-x28n.onrender.com/dashboard)

Welcome to my **Restaurant Reservation System** project! This repository holds all the source code for the reservation system I've developed as part of my role at _Periodic Tables_, a startup that's dedicated to revolutionizing the reservation experience for fine dining restaurants. As a *full stack developer*, I've built a comprehensive solution that empowers restaurant personnel like me to efficiently manage reservation requests from customers.

## Project Overview

In this project, I've worked on both the frontend and backend components of the reservation system. My main goal was to create a seamless interaction between myself and my fellow restaurant staff, enabling us to handle reservation requests effectively when customers call us. While the software isn't accessible to customers online at this stage, it sets the foundation for exciting future enhancements and features.

## Implemented Features

I'm excited to share the features I've implemented in the Restaurant Reservation System:

### Creating New Reservations

As a restaurant manager, I've implemented the ability to create new reservations when a customer calls. This feature allows us to keep track of how many customers will arrive at the restaurant on a given day.

### Day Validations

To ensure accuracy, I've added validations that only allow reservations to be created on days when we are open. This prevents users from accidentally creating reservations for days when the restaurant is closed.

### Time Constraints

Respecting our business hours, I've implemented constraints that only permit reservations to be created during operating hours, up to 60 minutes before closing. This prevents users from accidentally booking reservations for times we cannot accommodate.

### Seating Management

For a smooth dining experience, I've enabled the ability to seat (assign) reservations to specific tables when customers with existing reservations arrive at the restaurant. This helps us keep track of occupied and available tables.

### Table Turnover

To efficiently manage our restaurant's capacity, I've implemented a feature that frees up occupied tables once guests leave. This ensures that we can promptly seat new guests at previously occupied tables.

### Reservation Status

I've introduced reservation statuses—booked, seated, and finished—enabling us to distinguish between reservation parties that are seated and those that have finished dining. Finished reservations are hidden from the dashboard, streamlining our operations.

### Reservation Search

To enhance customer service, I've implemented a reservation search feature by phone number. This allows me to quickly access a customer's reservation when they call for information about their reservation.

### Reservation Modification

Understanding the need for flexibility, I've provided the capability to modify reservations when customers call to change or cancel their reservation. This ensures that our reservation records are accurate and up to date.

## Development Guidelines

Throughout development, I've adhered to established *best practices* and *patterns* to ensure the system's robustness and maintainability. The README file remains a living document to showcase the features I've implemented and the value they bring to our restaurant operations.

## Thank You

Thank you for joining me on this exciting journey to create an advanced Restaurant Reservation System. Together, my contributions and dedication have shaped the future of fine dining reservation experiences!
