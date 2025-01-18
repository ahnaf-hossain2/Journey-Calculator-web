# Journey Metrics Calculator

A modern web-based calculator for computing journey metrics including speed, distance, and time calculations with support for multiple units of measurement.

## Overview

Journey Metrics Calculator is an intuitive, browser-based tool that performs common journey-related calculations. It features a clean, dark-themed interface and supports various measurement units, making it suitable for both personal and professional use.

## Features

- Calculate three primary metrics:
  - Speed (when given distance and time)
  - Distance (when given speed and time)
  - Time (when given distance and speed)
- Support for multiple units:
  - Distance: meters (m), kilometers (km), miles (mi), feet (ft), yards (yd)
  - Speed: meters per second (m/s), kilometers per hour (km/h), miles per hour (mph), feet per second (ft/s)
  - Time: seconds (s), minutes (min), hours (h), days (d)
- Real-time calculation updates
- Error handling and input validation
- Responsive design for all device sizes
- Dark mode interface for reduced eye strain

## Installation

1. Clone the repository:
```bash
git clone "https://github.com/ahnaf-hossain2/Journey-Calculator-web.git"
```

2. Navigate to the project directory:
```bash
cd journey-metrics-calculator
```

3. Open `index.html` in your preferred web browser.

Alternatively, you can deploy the files to any web server or hosting service of your choice.

## Usage

1. Select the type of calculation you want to perform from the dropdown menu:
   - Calculate Speed
   - Calculate Distance
   - Calculate Time

2. Enter the required values with their units:
   - For distance: Use format "value unit" (e.g., "100 km", "50 mi")
   - For speed: Use format "value unit/time" (e.g., "60 km/h", "15 m/s")
   - For time: Use composite format (e.g., "1h 30min", "45min", "2h 30min")

3. Click the "Calculate" button to see results in multiple units.

Example inputs:
```
Distance: 100 km
Speed: 60 km/h
Time: 1h 30min
```

## Technical Details

The calculator is built using:
- HTML5
- CSS3 with modern flexbox layout
- Vanilla JavaScript with ES6+ features
- Event-driven architecture
- Modular design pattern

## Project Structure

```
journey-metrics-calculator/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js          # JavaScript logic
└── README.md          # Documentation
```

## Error Handling

The calculator includes comprehensive error handling for:
- Invalid input formats
- Unsupported units
- Mathematical impossibilities
- Edge cases in calculations

## Browser Compatibility

Tested and supported on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Design inspired by modern dark-themed calculators
- Unit conversion formulas based on international standards

## Future Enhancements

- Additional calculation types (fuel consumption, CO2 emissions)
- Save calculation history
- Export results to CSV
- Custom unit preferences
- Progressive Web App (PWA) support

## Support

For support, please open an issue in the GitHub repository or contact [ahnaf20042023@gmail.com].
