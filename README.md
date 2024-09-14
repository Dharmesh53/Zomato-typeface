# Project Assignment: Zomato Restaurant Listing & Searching

## Key Use Cases

### Data Loading

Create an independent script to load the Zomato restaurant data available [here](https://www.kaggle.com/datasets/shrutimehta/zomato-restaurants-data) into a database.

### Web API Service

Develop a web API service with the following endpoints to serve the content loaded in the previous step:

- _Get Restaurant by ID_: Retrieve details of a specific restaurant by its ID.
- _Get List of Restaurants_: Fetch a list of restaurants with pagination support.

### User Interface

Develop a web application with the following pages, which must connect to the web API service:

- _Restaurant List Page_: Display a list of restaurants. Clicking on a restaurant should navigate the user to the restaurant's detail page.
- _Restaurant Detail Page_: Show details of a specific restaurant.
- _Location search_: Search restaurants in given latitude and longitude range (e.g restaurants in 3 km of a given latitude and longitude)
- _Image search_: Upload an image of a food like icecream, pasta etc., and search restaurants which offer those cuisines.

## Additional Use Cases (Optional)

If time allows, implement the following additional features, ensuring they are supported in both the API and the UI:

- _Filtering Options_:
  - By Country
  - By Average Spend for Two People
  - By Cuisines
- _Search Functionality_: Enable search for restaurants by name and description.
