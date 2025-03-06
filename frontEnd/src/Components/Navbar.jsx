import { Link } from "react-router-dom";
import cartLogo from "../Images/cartLogo.png";
import mainLogo from "../Images/brandLogo.png";
import accountLogo from "../Images/accLogo.png";

export const Navbar = () => {
  return (
    <nav className="w-full h-full bg-[#c4af75] flex justify-around items-center p-[1rem] rounded-lg ">
      {/* Default view */}

      <div>
        <Link to="/">
          <img
            src={mainLogo}
            alt="Splendid Brand"
            className="w-[9rem] h-[2.5rem]"
          />
        </Link>
      </div>

      <ul className="flex gap-[2rem]">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/Product-Splendid">Greeting</Link>
        </li>
        <li>
          <Link to="/About-Splendid">About</Link>
        </li>
        <li>
          <Link to="/Contact-Splendid">Contact</Link>
        </li>
      </ul>

      <div className="flex gap-[1rem]">
        <button className="p-[0.4rem]">
          <img
            src={cartLogo}
            alt="MainLogo"
            className="w-[2rem] h-[2rem] cursor-pointer"
          />
        </button>
        <button className="p-[0.4rem]">
          <img
            src={accountLogo}
            alt="MainLogo"
            className="w-[2rem] h-[2rem] cursor-pointer"
          />
        </button>
      </div>
    </nav>
  );
};
