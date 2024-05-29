document.addEventListener("DOMContentLoaded", () => {
    const vehicleSelectionDiv = document.getElementById("vehicle-selection");
    const allVehicles = document.createElement("div");
    const calculateBtn = document.getElementById("calculate-btn");
    const resultDiv = document.getElementById("result");
    const comparisonDiv = document.getElementById("comparison");

    fetch("/vehicles")
        .then((response) => response.json())
        .then((data) => {
            data.forEach((vehicle) => {
                const vehicleDiv = document.createElement("div");
                vehicleDiv.classList.add("vehicle-item");

                const radio = document.createElement("input");
                radio.type = "radio";
                radio.name = "vehicle";
                radio.value = vehicle.name;

                const label = document.createElement("label");
                label.innerText = vehicle.name;

                vehicleDiv.append(radio);
                vehicleDiv.append(label);
                allVehicles.append(vehicleDiv);
            });
            vehicleSelectionDiv.append(allVehicles);
        });

    calculateBtn.addEventListener("click", () => {
        const distance = document.getElementById("distance").value;
        const selectedVehicle = document.querySelector(
            'input[name="vehicle"]:checked'
        ).value;

        fetch("/vehicles")
            .then((response) => response.json())
            .then((data) => {
                const vehicle = data.find((v) => v.name === selectedVehicle);

                const time = distance / vehicle.speed;
                const fuelConsumed = distance / vehicle.efficiency;

                let result = `Time to travel: ${time.toFixed(2)} hours`;
                if (distance > vehicle.range) {
                    result += " - Out of Range";
                } else {
                    result += `, Fuel consumed: ${fuelConsumed.toFixed(
                        2
                    )} liters`;
                }

                resultDiv.innerText = result;

                let comparison = `Comparison:\n`;
                data.forEach((v) => {
                    if (v.name !== selectedVehicle) {
                        const t = distance / v.speed;
                        comparison += `${v.name}: ${t.toFixed(2)} hours\n`;
                    }
                });

                comparisonDiv.innerText = comparison;
            });
    });
});
