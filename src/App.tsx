import React from 'react'
import Bars from './components/Bars'

const App = () => {
  const data = [
    { label: 'A', value: 10 },
    { label: 'B', value: 20 },
    { label: 'C', value: 15 },
    { label: 'D', value: 5 },
    { label: 'E', value: 25 },
    { label: 'F', value: 36 },
  ];

  return (
    <>
      <div>
        <Bars data={data} width={500} height={300} />
      </div>
    </>
  )
}

export default App