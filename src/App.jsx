import { useState } from 'react'
import './App.css'
import { UserProfileFetcher } from './components/UserProfileFetcher';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <UserProfileFetcher/>
    </>
  )
}

export default App
