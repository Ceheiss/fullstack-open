export const CountryDetails = ({name, capital, area, languages, flagSrc}) => {
  return (
    <article>
      <h1>{name}</h1>
          <p>Capital {capital}</p>
          <p>Area {area}</p>
          <h3>Languages</h3>
          <ul>
            {Object.values(languages)
              .map(lang => <li key={lang}>{lang}</li>)}
          </ul>
          <img src={flagSrc} alt={`Flag of ${name}`} />
    </article>
  )
}