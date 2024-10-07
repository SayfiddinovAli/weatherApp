// src/App.js
import React, { useEffect, useState } from 'react';  // React, useState va useEffect hook'larini import qilish
import WeatherApp from './Component/weatherApp/WeatherApp';  // WeatherApp komponentini import qilish

const App = () => {
  return (
    <div>
      <WeatherApp />  {/* WeatherApp komponentini chaqirish */}
    </div>
  );
};

export default App;
