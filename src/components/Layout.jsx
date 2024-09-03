import Navbar from "./Navbar"
// import PropTypes from 'prop-types'

const Layout = ({children}) => {
  return (
    <>
    <Navbar/>
    <main>
        {children}
    </main>
    </>
  )
};

export default Layout