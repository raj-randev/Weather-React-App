import React from 'react';
import './App.css';
import { Grid, Cell} from 'react-mdl';
import Titles from './components/Titles';
import Form from './components/Form';
import Weather from './components/Weather';


const API_KEY = '827c012dfefa3689648e2076da919ff4'

class App extends React.Component {
  state ={
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }
  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${API_KEY}&units=metric`);
    const data = await api_call.json();
   
   if(city && country){
    this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ''
    });
  }else {
    this.setState({
      temperature: undefined,
      city: undefined,
      country: undefined,
      humidity: undefined,
      description: undefined,
      error: 'Please enter a valid location'
  });
  }
  }
  render (){
  return (
    <div >
      <Grid className="wrapper">
        <Cell className="title-container" col={4}>
          <Titles />
        </Cell>
        <Cell className="form-container " col={8}>
          <Form getWeather={this.getWeather} />
          <Weather 
            temperature={this.state.temperature}
            city={this.state.city}
            country={this.state.country}
            humidity={this.state.humidity}
            description={this.state.description}
            error={this.state.error}
             />
        </Cell>
      </Grid>
    </div>
  );
}
}

export default App;
