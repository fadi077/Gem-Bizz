function updatePrice() {
    let total = 0;

    // Calculate total from checkboxes in Desired Outcome / Consultation Focus
    const focusCheckboxes = document.querySelectorAll('fieldset:nth-of-type(1) input[type=checkbox]:checked');
    focusCheckboxes.forEach(checkbox => {
        total += parseInt(checkbox.value);
    });

    // Calculate total from Company Stage
    const companyStage = document.querySelector('fieldset:nth-of-type(2) input[type=radio]:checked');
    if (companyStage) {
        total += parseInt(companyStage.value);
    }

    // Calculate total from Partnership Focus
    const partnershipCheckboxes = document.querySelectorAll('fieldset:nth-of-type(3) input[type=checkbox]:checked');
    partnershipCheckboxes.forEach(checkbox => {
        total += parseInt(checkbox.value);
    });

    // Calculate total from Timeframe for Results
    const timeframe = document.querySelector('fieldset:nth-of-type(4) input[type=radio]:checked');
    if (timeframe) {
        total += parseInt(timeframe.value);
    }

    // Calculate total from Consultation Length
    const consultationLength = document.querySelector('fieldset:nth-of-type(5) input[type=radio]:checked');
    if (consultationLength) {
        total += parseInt(consultationLength.value);
    }

    // Calculate total from Follow-Up Support
    const followUpCheckboxes = document.querySelectorAll('fieldset:nth-of-type(6) input[type=checkbox]:checked');
    followUpCheckboxes.forEach(checkbox => {
        total += parseInt(checkbox.value);
    });

    // Update the total price in the DOM
    document.getElementById('totalPrice').innerText = total;

    // Update the progress bar based on the total
    const maxPrice = 2000;  // Example maximum price
    const percentage = (total / maxPrice) * 100;
    document.getElementById('progressBar').style.width = percentage + "%";

    // Optionally update the chart if you're using it for a visual breakdown
    updateChart(focusCheckboxes);
}

// Chart.js Setup for Consultation Breakdown
let consultationChart;

function initializeChart() {
    const ctx = document.getElementById('consultationBreakdownChart').getContext('2d');
    consultationChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Refining Value Proposition', 'Strategic Rebranding', 'Customer Base Development', 'Strengthening USP'],
            datasets: [{
                label: 'Consultation Focus',
                data: [0, 0, 0, 0],  // Start with zero values
                backgroundColor: ['#ff5500', '#ff8f66', '#ffd1b3', '#ff3300'],
            }]
        },
        options: {
            responsive: true,
        }
    });
}

function updateChart(focusCheckboxes) {
    let focusValues = [0, 0, 0, 0]; // Default values for the four options

    focusCheckboxes.forEach(checkbox => {
        const value = parseInt(checkbox.value);
        switch (value) {
            case 112:
                focusValues[0] += value; // Refining Value Proposition
                break;
            case 150:
                focusValues[1] += value; // Strategic Rebranding
                break;
            case 200:
                if (focusCheckboxes.length > 2) {
                    focusValues[2] += value; // Customer Base Development
                } else {
                    focusValues[3] += value; // Strengthening USP
                }
                break;
            default:
                break;
        }
    });

    // Update the chart with the new data
    consultationChart.data.datasets[0].data = focusValues;
    consultationChart.update();
}

// Initialize the chart when the page loads
window.onload = function () {
    initializeChart();
};
