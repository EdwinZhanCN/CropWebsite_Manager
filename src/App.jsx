import { useState } from 'react'
import FileUpload from "./services/ProductImageUpload";
import MainSideBar from "./components/MainPicker";
import Avatar from "./pages/Avatar";
import "@/root.css";
import AvatarContainer from "@/components/containers/AvatarContainer";
import Test from "@/Test";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <AvatarContainer/>
    </>
  )
}

export default App
