import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import FileUpload from "./scripts/ProductImageUpload";
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <h1>Upload file</h1>
        <FileUpload />
    </>
  )
}

export default App
