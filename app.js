// Base data from the Company Data sheet
const standardHourlyRate = 469.33;
const residentialTaxRate = 0.0825; // 8.25% tax on materials

// Labor hour ranges and their corresponding multipliers
const laborMultipliers = [
    { from: 0, to: 25, multiplier: 2.580296 },
    { from: 25.01, to: 50, multiplier: 2.143126 },
    { from: 50.01, to: 75, multiplier: 1.997259 },
    { from: 75.01, to: 100, multiplier: 1.924335 },
    { from: 100.01, to: 125, multiplier: 1.880588 },
    { from: 125.01, to: 150, multiplier: 1.851376 },
    { from: 150.01, to: 175, multiplier: 1.830636 },
    { from: 175.01, to: 200, multiplier: 1.814978 },
    { from: 200.01, to: 225, multiplier: 1.802810 },
    { from: 225.01, to: 250, multiplier: 1.793096 },
    { from: 250.01, to: 275, multiplier: 1.785127 },
    { from: 275.01, to: 300, multiplier: 1.778539 },
    { from: 300.01, to: 325, multiplier: 1.772908 },
    { from: 325.01, to: 350, multiplier: 1.768089 },
    { from: 350.01, to: 375, multiplier: 1.763919 },
    { from: 375.01, to: 400, multiplier: 1.760263 },
    { from: 400.01, to: 425, multiplier: 1.757065 },
    { from: 425.01, to: 450, multiplier: 1.754292 }
];

// Material cost ranges and their corresponding markup percentages
const materialMarkup = [
    { from: 0, to: 0.99, markup: 4.32 },
    { from: 1, to: 2.99, markup: 4.32 },
    { from: 3, to: 7.99, markup: 3.78 },
    { from: 8, to: 16.99, markup: 3.51 },
    { from: 17, to: 33.99, markup: 3.24 },
    { from: 34, to: 66.99, markup: 2.70 },
    { from: 67, to: 131.99, markup: 2.16 },
    { from: 132, to: 260.99, markup: 1.89 },
    { from: 261, to: 549.99, markup: 1.674 },
    { from: 550, to: 99999.99, markup: 1.486 }
];

// Function to calculate labor cost
function calculateLaborCost(laborHours) {
    // Find the appropriate multiplier based on labor hours
    const laborMultiplier = laborMultipliers.find(range => laborHours >= range.from && laborHours <= range.to).multiplier;
    
    // Calculate labor cost
    return laborHours * standardHourlyRate * laborMultiplier;
}

// Function to calculate material cost with markup and tax
function calculateMaterialCost(materialCost) {
    // Find the appropriate markup based on material cost
    const materialMarkupPercentage = materialMarkup.find(range => materialCost >= range.from && materialCost <= range.to).markup;
    
    // Calculate the total cost with markup and tax
    const markupCost = materialCost * (materialMarkupPercentage / 100);
    const totalMaterialCost = materialCost + markupCost;
    
    // Apply residential tax
    const totalCostWithTax = totalMaterialCost + (totalMaterialCost * residentialTaxRate);
    
    return totalCostWithTax;
}

// Handle form submission
document.getElementById('pricing-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const laborHours = parseFloat(document.getElementById('laborHours').value);
    const materialCost = parseFloat(document.getElementById('materialCost').value);
    
    const totalLaborCost = calculateLaborCost(laborHours).toFixed(2);
    const totalMaterialCost = calculateMaterialCost(materialCost).toFixed(2);
    
    document.getElementById('laborResult').textContent = `$${totalLaborCost}`;
    document.getElementById('materialResult').textContent = `$${totalMaterialCost}`;
});