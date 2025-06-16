import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import humidity_icon from '../assets/humidity.png'
import wind_icon from '../assets/wind.png'
import { useEffect, useRef, useState} from 'react'

const Weather = () => {
    const inputRef = useRef()
    const [weatherData, setWeatherData] = useState(null);

    const search = async (city) => {
        try {
            const API_KEY = import.meta.env.VITE_APP_ID;
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
            const response = await fetch(url);
            const data = await response.json();
            // Store icon code as well
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: data.weather[0].icon // <-- store icon code
            });
        } catch (error) {
            setWeatherData(null);
        }
    }

    useEffect(() => {
        search("Kathmandu");
    }, []);

    return (
        <div className='weather'>
            <div className='search-bar'>
                <input ref={inputRef} type='text' placeholder='Search' />
                <img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)}/>
            </div>
            {/* Show OpenWeatherMap icon if data is ready */}
            {weatherData && weatherData.icon ? (
                <img
                    src={`https://openweathermap.org/img/wn/${weatherData.icon}@4x.png`}
                    alt="Weather Icon"
                    className='weather-icon'
                />
            ) : (
                <img src={clear_icon} alt='' className='weather-icon' />
            )}
            <p className='temperature'>
                {weatherData ? `${weatherData.temperature}°C` : '--'}
            </p>
            <p className='location'>
                {weatherData ? weatherData.location : '--'}
            </p>
            <div className='weather-data'>
                <div className='col'>
                    <img src={humidity_icon} alt="" />
                    <div>
                        <p>
                            {weatherData ? `${weatherData.humidity} %` : '--'}
                        </p>
                        <span>Humidity</span>
                    </div>
                </div>
                <div className='col'>
                    <img src={wind_icon} alt="" />
                    <div>
                        <p>
                            {weatherData ? `${weatherData.windSpeed} Km/hr` : '--'}
                        </p>
                        <span>Wind Speed</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Weather
