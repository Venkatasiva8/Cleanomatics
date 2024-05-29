const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

const vehicles = [
    { name: "Maruti Suzuki Alto", speed: 140, efficiency: 22.05, capacity: 35, range: 771.75 },
    { name: "Hyundai i20", speed: 180, efficiency: 20.35, capacity: 37, range: 753.05 },
    { name: "Tata Nexon", speed: 180, efficiency: 17.57, capacity: 44, range: 772.68 },
    { name: "Honda City", speed: 180, efficiency: 17.8, capacity: 40, range: 712.00 },
    { name: "Mahindra Thar", speed: 155, efficiency: 15.2, capacity: 57, range: 866.40 },
    { name: "Toyota Innova Crysta", speed: 179, efficiency: 11.25, capacity: 55, range: 618.75 },
    { name: "Kia Seltos", speed: 170, efficiency: 16.8, capacity: 50, range: 840.00 },
    { name: "Renault Kwid", speed: 150, efficiency: 22.3, capacity: 28, range: 624.40 },
    { name: "Ford EcoSport", speed: 182, efficiency: 15.9, capacity: 52, range: 826.80 },
    { name: "Tata Tiago", speed: 150, efficiency: 23.84, capacity: 35, range: 834.40 }
];

app.get('/vehicles', (req, res) => {
    res.json(vehicles);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
