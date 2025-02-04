import { Icon } from "@iconify/react";
import { Link } from "react-router-dom"

const NavbarOrganism = () => {
  return (
    <nav className="fixed bottom-[128px] right-0">
      <ul className="flex flex-col p-3 border border-black/15 rounded-full items-center justify-center">
        <li className="mt-3 mb-3">
          <Link to={"/"}>
            <Icon icon="material-symbols:book-4-spark" width="20" height="20" />
          </Link>
        </li>
        <li className="mt-3 mb-3">
          <Link to={"/catatan"}>
            <Icon icon="material-symbols:book-ribbon" width="20" height="20" />
          </Link>
        </li>
      </ul>
    </nav>
  )
};

export default NavbarOrganism;
