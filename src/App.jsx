import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import CreatePledge from "./pages/CreatePledge";


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>React Router</h1>
      <p>Time to learn about routing</p>
    </>
  )
}

<Route path="/create-pledge/:id" element={<CreatePledge />} />

export default App
