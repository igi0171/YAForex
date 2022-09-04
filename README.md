# YAForex

A simple web application that displays the latest and historical exchange rates using an API.

## Description

On initial load, display the latest exchange rates. The application also provides a way to check the historical exchange rates through a date picker. When a date is selected, the rates for the selected date is displayed.

## APIs Used

### Latest Exchange Rates

GET http://api.currencylayer.com/live?access_key=[API_KEY]

### Historical Exchange Rates

GET http://api.currencylayer.com/historical?date=YYYY-MM-DD&access_key=[API_KEY]

## Technical Used

- React

## How to install and run the application

1. Clone or fork the application
2. On your terminal, navigate to the YAForex directory
3. cd yet-another-forex
4. In the root folder (yet-another-forex), create .env file with REACT_APP_API_KEY=YOUR_API_KEY
5. npm start
