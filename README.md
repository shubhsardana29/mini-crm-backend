# Mini CRM Application

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
  - [Data Ingestion](#data-ingestion)
  - [Audience Creation](#audience-creation)
  - [Campaign Management](#campaign-management)


## Introduction
This Mini CRM application is designed to manage customer relationships by providing functionalities for data ingestion, audience creation, and campaign management. The project was developed as part of an assignment for the SDE Internship at Xeno.

## Features
- **Data Ingestion:** APIs to ingest customer and order data.
- **Audience Creation:** Create audience segments based on specific rules with AND/OR conditions.
- **Campaign Management:** Simulate sending personalized messages and update delivery statuses.
- **Database Integration:** Efficient data storage and retrieval using MongoDB.

## Tech Stack
- **Frontend:** React.js or Next.js ( yet to make )
- **Backend:** Node.js
- **Database:** MongoDB

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/shubhsardana29/mini-crm.git
    cd mini-crm
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
    - Create a `.env` file in the root directory.
    - Add the following variables:
        ```
        MONGODB_URI=<your_mongodb_connection_string>
        ```

4. Start the server:
    ```bash
    npm start
    ```

## Usage

### Data Ingestion
Use Postman to test the data ingestion APIs. Examples:
- **Add Customer:**
    - Endpoint: `POST /api/customers`
    - Body:
      ```json
        {
      "customer_id": "cust010",
      "name": "Shubh",
      "email": "shubh@ipu.ac.in",
      "total_spends": 120000,
      "last_visit_date": "2023-06-12",
      "visit_count": 7
      }

      ```

- **Add Order:**
    - Endpoint: `POST /api/orders`
    - Body:
      ```json
      {
          "order_id": "order001",
          "customer_id": "cust001",
          "order_amount": 200,
          "order_date": "2023-01-10"
      }

      ```

### Audience Creation
1. Define audience rules (e.g., customers who have spent more than INR 10,000 and not visited in the last 3 months).
2. Combine rules using AND/OR logic.
- **Create an Audience:**
    - Endpoint: `POST /api/audience`
    - Body:
      ```json
      {
      "rules": [
          { "field": "total_spends", "operator": ">", "value": 1000 },
          { "field": "visit_count", "operator": ">=", "value": 4 }
      ],
      "logic": "AND"
      }


      ```
4. View the audience size before saving.

### Campaign Management
1. Create a campaign with the defined audience.
   - **Create a Campaign:**
    - Endpoint: `POST /api/campaign`
    - Body:
      ```json
      {
      "audience_id": "6663a2d1e42db195d2b07154",  // Replace with the actual audience ID from the response
      "message": "This is a campaign message."
      }
      ```
   - **Get Campaigns list:**
    - Endpoint: `GET /api/campaign`
    - Body:
      ```json
        {
      "audience_id": "6663a2d1e42db195d2b07154",  // Replace with the actual audience ID from the response
      "message": "This is a campaign message."
      }

      ```
3. Simulate sending personalized messages using the dummy vendor API.
   - **Send Campaign:**
    - Endpoint: `POST /api/sendCampaign`
    - Body:
      ```json
      {
        "campaign_id": "6663a475e42db195d2b07162"  // Replace with the actual campaign ID from the response
      }

      ```
5. Update Communication delivery statuses (SENT/FAILED).
   - **Update Communication Status:**
    - Endpoint: `POST /api/sendCampaign/deliveryReceipt`
    - Body:
      ```json
        {
      "communication_log_id": "6663a475e42db195d2b07162",  // Replace with the actual campaign ID from the response
      "status": "SENT"
        }

      ```
