import { Button, useColorMode } from "@chakra-ui/react"
import Layout from "./components/Layout"
import { Outlet } from "react-router-dom"

function App() {
 
  const { colorMode, toggleColorMode } = useColorMode()
  return (
     <Layout>
      <Outlet/>
     </Layout>
  )
}

export default App
