// import "./Navbar.css";
import { useLocation } from "react-router-dom";
import logo from "../assets/tub-logo.png";
import { Route, Wrench, UserIcon,Bus, BarChart3Icon} from "lucide-react";

interface props {
  page?: number;
}

let user = '';

export function Navbar(props: props) {

  const location = useLocation();
  const numeroT = location.state?.numeroT;

  user = numeroT;

  return (
    <div className="h-24 flex items-center select-none justify-between sm:gap-16 xl:px-[20rem] lg:px-[20rem] md:px-[10rem] sm:px-[8rem] bg-[#222222]">
      <div className="navbar-container-top pt-4 absolute top-2 xl:left-[10rem] lg:left-10 md:left-0 sm:left-0">
        <img className="" src={logo} width={130} />
      </div>
      <ul className="flex items-center gap-16 font-poppins text-base ">
        <li>
          <a href="linhas"
            className={`flex justify-center items-center gap-1 hover:cursor-pointer hover:text-[#1070ff] ${
              props.page == 1 ? "text-[#0080ff]" : "text-white"
            }`}
          >
            <Route className="w-5" />
            Informação
          </a>
        </li>
        <li>
          <a href="/gerir-linhas"
            className={`flex justify-center items-center gap-1 hover:cursor-pointer hover:text-[#1070ff] ${
              props.page == 2 ? "text-[#0080ff]" : "text-white"
            }`}
          >
            <Wrench className="w-5" />
            Gerir Linhas
          </a>
        </li>
        <li>
          <a href="/gerir-autocarros"
            className={`flex justify-center items-center gap-1 hover:cursor-pointer hover:text-[#1070ff] ${
              props.page == 3 ? "text-[#0080ff]" : "text-white"
            }`}
          >
            <Bus className="w-5" />
            Autocarro
          </a>
        </li>
        <li>
          <a href="/analise"
            className={`flex justify-center items-center gap-1 hover:cursor-pointer hover:text-[#1070ff] ${
              props.page == 4 ? "text-[#0080ff]" : "text-white"
            }`}
          >
            <BarChart3Icon className="w-5" />
            Análise
          </a>
        </li>
      </ul>
      <a
        className={`flex gap-1 font-overpass hover:cursor-pointer hover:text-[#1070ff] ${
          props.page == 5 ? "text-[#0060ff]" : "text-white"
        }`}
      >
        <UserIcon className="w-5" />
        <div className="py-0.5 font-poppins">
          {user}
        </div>
      </a>
    </div>
  );
}
