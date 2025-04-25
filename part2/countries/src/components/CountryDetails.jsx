export const CountryDetails = ({name, capital, area, languages, flagSrc, temperature, weatherIconUrl, windSpeed}) => {
  return (
    <article>
      <h1>{name}</h1>
          <p>Capital {capital}</p>
          <p>Area {area}</p>
          <h2>Languages</h2>
          <ul>
            {Object.values(languages)
              .map(lang => <li key={lang}>{lang}</li>)}
          </ul>
          <img src={flagSrc} alt={`Flag of ${name}`} />
          <h2>Weather in {capital}</h2>
          <p>Temperature {temperature} Celsius</p>
          <img src={weatherIconUrl} alt={`Weather icon for ${capital}`} />
          <p>Wind {windSpeed} m/s</p>
    </article>
  )
}