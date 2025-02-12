import React, { useState } from "react";

const SidebarOrganism = () => {
    // State untuk mengontrol visibilitas sidebar
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

    // Contoh data riwayat percakapan
    const [histories, setHistories] = useState([
        { id: 1, title: "Percakapan 1" },
        { id: 2, title: "Percakapan 2" },
        { id: 3, title: "Percakapan 3" },
        { id: 4, title: "Percakapan 4" }
    ]);

    // Toggle sidebar visibility
    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    return (
        <div>
            {/* Tombol Hamburger */}
            <button
                onClick={toggleSidebar}
                className="lg:hidden p-4 text-gray-600 hover:text-gray-800 transition duration-200 fixed top-4 left-4 z-50"
            >
                <span className="block w-8 h-0.5 bg-gray-600 mb-1"></span>
                <span className="block w-8 h-0.5 bg-gray-600 mb-1"></span>
                <span className="block w-8 h-0.5 bg-gray-600"></span>
            </button>

            {/* Sidebar */}
            {isSidebarVisible && (
                <nav className="w-64 bg-gray-100 p-4 h-full fixed top-0 left-0 z-50">
                    <h3 className="text-lg font-semibold mb-4">Histori Percakapan</h3>
                    <ul className="space-y-3">
                        {histories.map((history) => (
                            <li key={history.id}>
                                <a
                                    href={`#${history.id}`}
                                    className="text-gray-800 hover:text-blue-500 transition duration-200"
                                >
                                    {history.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            )}
        </div>
    );
};

export default SidebarOrganism;
