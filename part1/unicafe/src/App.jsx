import { useState } from 'react'


const StatisticLine = ({text, value}) => (
  <p>{text} {value}{text == 'positive' ? '%' : ''}</p>
)


const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  const average = (good - bad) / total;
  const positive = (good / total) * 100
  
  return (
    <>
      <h2>statistics</h2>
      { total == 0 ?
      <p>No feedback given</p>
    :
      <>
        <StatisticLine text="good" value ={good} />
        <StatisticLine text="neutral" value ={neutral} />
        <StatisticLine text="bad" value ={bad} />
        <StatisticLine text="total" value ={total} />
        <StatisticLine text="average" value ={average} />
        <StatisticLine text="positive" value ={positive} />
      </>}
    </>
    
  )
}

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClick = (total, setState) => {
    return () => setState(total + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleClick(good, setGood)} text="good" />
      <Button handleClick={handleClick(neutral, setNeutral)} text="neutral" />
      <Button handleClick={handleClick(bad, setBad)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App