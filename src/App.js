import './App.css';
import AqiList from './components/AqiList';
import Dialog from './components/Dialog'
import { useState, useCallback } from 'react';
import AqiGraph from './components/AqiGraph';

function App() {
  const [selectedCity, setSelectedCity] = useState("");
  const removeCity = useCallback(
    () => setSelectedCity(""),
    [],
  );
  return (
    <div className="app">
      <AqiList showCityAqi={setSelectedCity} />
      {selectedCity && <Dialog closeDialog={removeCity}><AqiGraph selectedCity={selectedCity} /></Dialog>}
    </div>
  );
}

export default App;
