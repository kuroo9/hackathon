import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PricingDisplay = () => {
    const [price, setPrice] = useState(null);
    const [demand, setDemand] = useState(10);
    const [supply, setSupply] = useState(5);

    const fetchPrice = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/pricing', {
                demand,
                supply,
                location: "Downtown"
            });
            setPrice(response.data.price);
        } catch (error) {
            console.error("Error fetching price:", error);
        }
    };

    useEffect(() => {
        fetchPrice();
    }, [demand, supply]);

    return (
        <div>
            <h1>Ride-Sharing Dynamic Pricing</h1>
            <p>Demand: {demand}</p>
            <p>Supply: {supply}</p>
            <h2>Current Price: ${price ? price.toFixed(2) : "Loading..."}</h2>
            <button onClick={() => setDemand(demand + 1)}>Increase Demand</button>
            <button onClick={() => setSupply(supply + 1)}>Increase Supply</button>
        </div>
    );
};

export default PricingDisplay;
