# Expense Tracker

A responsive expense tracking application built with React and Supabase. Users can create an account, log in, and securely manage their personal income and expenses.

## Features

* User registration and login
* Email confirmation
* Secure logout
* Add income and expense transactions
* Edit existing transactions
* Delete transactions with confirmation
* Filter transactions by category
* Income, expenses, and balance summary
* Spending breakdown by category
* User-specific transactions
* Row Level Security (RLS) with Supabase
* Form validation
* Loading and database error states
* Responsive design for desktop and mobile

## Technologies Used

* React
* JavaScript
* CSS
* Supabase
* PostgreSQL
* Vite

## How It Works

Each user has their own account and transactions.

Transactions are stored in a Supabase PostgreSQL database and associated with the authenticated user's ID. Supabase Row Level Security (RLS) ensures that users can only access their own transactions.


## Security

This application uses Supabase Authentication and Row Level Security (RLS) to protect user data.

Each transaction is associated with a specific authenticated user, and database policies prevent users from accessing transactions belonging to other users.

## Future Improvements

Possible future improvements include:

* Monthly spending reports
* Date-based filtering
* Transaction search
* Budget limits
* Export transactions
* More detailed financial statistics
* Improved data visualizations

## Author

**Esli Kalemi**
