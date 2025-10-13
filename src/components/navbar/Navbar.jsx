import "./navbar.css"
import navImg from "../../assets/love.png"

const Navbar = () => {
  return (
    <div className="navbar">
        {/* <Sidebar/> */}
        <div className="wrapper">
            <img className="nav-img" src={navImg} alt="" />
            <div className="social">
                <a href="#">Facebook</a>
                <a href="#">Instagram</a>
                <a href="#">Linkedin</a>
                <a href="#">Github</a>
            </div>
        </div>
    </div>
  )
}

export default Navbar