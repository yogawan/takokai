import Link from "next/link";
import { Icon } from "@iconify/react";

const Navbar = () => {
    return (
        <nav className="fixed bottom-5 left-0 right-0 flex justify-center">
            <ul className="bg-black/5 backdrop-blur flex p-3 border border-white/15 rounded-full">
                <li className="m-3">
                    <Link className="flex items-center text-white text-xs" href="/history">
                        <Icon className="text-white mr-2" icon="material-symbols:history" width="24" height="24" />
                        History
                    </Link>
                </li>
                <li className="m-3">
                    <Link className="flex items-center text-white text-xs" href="/profile">
                        <Icon className="text-white mr-2" icon="iconamoon:profile-fill" width="24" height="24" />
                        Profile
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;