# Simple CRUD API

REST API built with Node.js for managing user data with basic CRUD operations.

The project demonstrates working with HTTP servers, routing, request handling, and in-memory data storage without external frameworks.

## Features

- Create user
- Read user data
- Update user
- Delete user
- RESTful API architecture
- UUID-based user identification
- JSON request/response handling
- Error handling

## Tech Stack

- Node.js
- JavaScript
- HTTP Module
- UUID

## Installation

```bash
npm install
```

## Run Project

Development mode:

```bash
npm run start:dev
```

Production mode:

```bash
npm run start:prod
```

## API Endpoints

### Get all users

```http
GET /api/users
```

### Get user by ID

```http
GET /api/users/:id
```

### Create user

```http
POST /api/users
```

### Update user

```http
PUT /api/users/:id
```

### Delete user

```http
DELETE /api/users/:id
```

## User Object Example

```json
{
  "username": "John",
  "age": 25,
  "hobbies": ["music", "sport"]
}
```
