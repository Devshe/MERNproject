import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <div classname="container">
        <Link to="/">
          <h1> explore</h1>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
