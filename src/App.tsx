import { useEffect, useState } from "react";
import Bars from "./components/Bars";

interface AppProps { };

const App = ({ }: AppProps) => {

  const dimensions = {
    height: 600,
    with: 400,
  };

  const [data, setData] = useState<number[]>([]);

  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setCount(count + 1), 1000);


    if (data.length < 10) {
      data.push(Math.random())
    } else {
      const newData = data.splice(1, 10)
      setData(newData)
    }
    return () => clearTimeout(timer)
  }, [count, setCount])


  return (
    <>
      <div className="bg-slate-950 w-full h-screen">
        <header className="container mx-auto">
          <Bars
            data={data}
            dimensions={dimensions}
          />
        </header>
      </div>
    </>
  )
}

export default App;