# Currency Converter

A simple web-based currency converter that allows users to convert between different currencies using real-time exchange rates from the **Frankfurter API**.

## Features
- Fetches real-time exchange rates.
- Supports multiple currencies.
- Simple and user-friendly UI.
- Uses HTML, CSS, and JavaScript.

## Technologies Used
- **HTML** - Structure of the webpage.
- **CSS** - Styling and layout.
- **JavaScript** - Logic for fetching exchange rates and updating the UI.
- **Frankfurter API** - Source for currency exchange rates.

## Installation & Usage
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/currency-converter.git
   ```
2. Navigate to the project folder:
   ```sh
   cd currency-converter
   ```
3. Open `index.html` in a browser.

## API Used
- **Frankfurter API** ([https://www.frankfurter.app](https://www.frankfurter.app))
  - Fetches currency exchange rates.
  - API endpoint: `https://api.frankfurter.app/latest?amount={amount}&from={from_currency}&to={to_currency}`

## How It Works
1. Select the currency you want to convert from and to.
2. Enter the amount to be converted.
3. Click the **Convert** button.
4. The converted amount will be displayed in the output field.

## Project Structure
```
📂 currency-converter
│── index.html      # Main HTML file
│── style.css       # CSS for styling
│── app.js          # JavaScript logic
│── README.md       # Project documentation
```

## Static Website
![Currency Converter UI](https://raw.githubusercontent.com/kavin-antony/Currency_Converter/main/screenshot.png)

[Live Demo](https://kavin-antony.github.io/Currency_Converter/)

## Future Enhancements
- Add error handling for API failures.
- Improve UI/UX with animations.
- Allow users to swap selected currencies easily.
- Add a historical exchange rate feature.
