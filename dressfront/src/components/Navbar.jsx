import { Link } from "@tanstack/react-router";
import { useAuth } from "@/context/AuthContext";
import "@/styles/navbar.css";
import { useNavigate } from "@tanstack/react-router";

function Navbar() {

  const navigate = useNavigate();

  const { user, setUser } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);

    navigate({
      to: "/",
    });
  };

  
    return (
        <nav className="navbar">
          <div className="logo">
              Dress Shop
          </div>

  <div className="nav-links">

  <Link to="/">Home</Link>

  {user && (
    <Link to="/cart">
      Cart
    </Link>
  )}

  {user?.role === "admin" && (
    <Link to="/admin">
      Admin
    </Link>
  )}

  {!user ? (
    <>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </>
  ) : (
    <>
      <span>
        Welcome {user.name}
      </span>

      <button onClick={handleLogout}>
        Logout
      </button>
    </>
  )}

</div>
        </nav>
    );
}
export default Navbar;