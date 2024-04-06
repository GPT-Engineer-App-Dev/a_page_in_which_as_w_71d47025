import React, { useState } from "react";
import { Box, Container, Select, Text, VStack, FormControl, FormLabel } from "@chakra-ui/react";

// Mock data for countries, currencies, states, and cities
// In a real-world scenario, you would fetch this data from an API
const data = {
  countries: [
    { name: "United States", currency: "USD", states: ["California", "Texas"] },
    { name: "India", currency: "INR", states: ["Maharashtra", "Delhi"] },
    { name: "Canada", currency: "CAD", states: ["Ontario", "Quebec"] },
  ],
  states: {
    California: ["Los Angeles", "San Francisco"],
    Texas: ["Houston", "Dallas"],
    Maharashtra: ["Mumbai", "Pune"],
    Delhi: ["New Delhi", "Old Delhi"],
    Ontario: ["Toronto", "Ottawa"],
    Quebec: ["Montreal", "Quebec City"],
  },
};

const Index = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [currency, setCurrency] = useState("");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  // Handle country selection
  const handleCountryChange = (event) => {
    const countryName = event.target.value;
    const country = data.countries.find((c) => c.name === countryName);
    if (country) {
      setSelectedCountry(countryName);
      setCurrency(country.currency);
      setStates(country.states);
      setCities([]);
      setSelectedState("");
    }
  };

  // Handle state selection
  const handleStateChange = (event) => {
    const stateName = event.target.value;
    const cities = data.states[stateName] || [];
    setSelectedState(stateName);
    setCities(cities);
  };

  return (
    <Container centerContent>
      <VStack spacing={4} mt={10}>
        <FormControl id="country-select">
          <FormLabel>Select Country</FormLabel>
          <Select placeholder="Select country" onChange={handleCountryChange}>
            {data.countries.map((country) => (
              <option key={country.name} value={country.name}>
                {country.name}
              </option>
            ))}
          </Select>
        </FormControl>

        {selectedCountry && (
          <Box>
            <Text>Currency: {currency}</Text>
          </Box>
        )}

        {states.length > 0 && (
          <FormControl id="state-select">
            <FormLabel>Select State</FormLabel>
            <Select placeholder="Select state" onChange={handleStateChange}>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </Select>
          </FormControl>
        )}

        {selectedState && cities.length > 0 && (
          <FormControl id="city-select">
            <FormLabel>Select City</FormLabel>
            <Select placeholder="Select city">
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </Select>
          </FormControl>
        )}
      </VStack>
    </Container>
  );
};

export default Index;
