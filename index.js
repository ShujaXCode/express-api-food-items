/**
 * Food-info-API
 * @author Shuja Naqvi
 */


const express = require('express');
const app = express();
const PORT = 8080;

// func1 (115 milliseconds) returns a food list with name, description, price,
const getFoodList = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                foodList: [
                    { name: 'Goan Fish Curry', description: 'A tangy and spicy fish curry', price: 300 },
                    { name: 'Prawn Balchao', description: 'A fiery prawn pickle dish', price: 400 },
                ],
            });
        }, 115);
    });
};

// func2 (2 minutes)  returns food available locations

const getAvailableLocations = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                availableLocations: ['Panaji', 'Margao', 'Vasco da Gama', 'Calangute'],
            });
        }, 120000); 
    });
};

//func3 (300 milliseconds) returns food nutritional information

const getNutritionalInfo = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                nutritionalInfo: [
                    { name: 'Goan Fish Curry', calories: 250, protein: '20g', fat: '15g' },
                    { name: 'Prawn Balchao', calories: 200, protein: '18g', fat: '12g' },
                ],
            });
        }, 300);
    });
};

//func4 (100 milliseconds) returns stock-out foods

const getStockOutFoods = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                stockOutFoods: ['Bebinca', 'Sannas'],
            });
        }, 100);
    });
};

// Combine data from all functions , use Promise.all to resolve at once 
const fetchData = async () => {
    const [data1, data2, data3, data4] = await Promise.all([getFoodList(), getAvailableLocations(), getNutritionalInfo(), getStockOutFoods()]);
    return { ...data1, ...data2, ...data3, ...data4 };
};

// Calling API , and calling combinedData
app.get('/api/food-info', async (req, res) => {
    try {
        const data = await fetchData();
        res.json({
            success: true,
            message: 'Food data fetched successfully',
            data,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching the food data.',
            error: error.message,
        });
    }
});

// Start the server , listening to a port :)
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Happy Coding :)
