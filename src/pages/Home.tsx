import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import data from "../data/valuable_wallets_sample.json"; // Import mock data

interface Wallet {
  walletAddress: string;
  netProfit: number;
}

const Home: React.FC = () => {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [sortedByProfit, setSortedByProfit] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const navigate = useNavigate();

  useEffect(() => {
    if (Array.isArray(data)) {
      setWallets(data);
    } else {
      console.error("Invalid data format", data);
    }
  }, []);

  const sortByProfit = () => {
    const sortedData = [...wallets].sort((a, b) =>
      sortedByProfit ? a.netProfit - b.netProfit : b.netProfit - a.netProfit
    );
    setSortedByProfit(!sortedByProfit);
    setWallets(sortedData);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedWallets = wallets.slice(startIndex, startIndex + itemsPerPage);

  const handleRowClick = (walletAddress: string) => {
    navigate(`/wallet/${walletAddress}`);
  };

  // Calculate total pages
  const totalPages = Math.ceil(wallets.length / itemsPerPage);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Wallet Dashboard</h1>
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-gray-700 font-semibold">
                Wallet Address
              </th>
              <th className="px-6 py-3 text-left text-gray-700 font-semibold">
                <button
                  onClick={sortByProfit}
                  className="focus:outline-none hover:text-blue-500"
                  aria-label={`Sort by net profit ${
                    sortedByProfit ? "descending" : "ascending"
                  }`}
                >
                  Net Profit {sortedByProfit ? "↓" : "↑"}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {selectedWallets.map((wallet, index) => (
              <tr
                key={index}
                className="cursor-pointer hover:bg-gray-100 transition duration-150"
                onClick={() => handleRowClick(wallet.walletAddress)}
              >
                <td className="border-b border-gray-300 px-6 py-4">
                  {wallet.walletAddress}
                </td>
                <td className="border-b border-gray-300 px-6 py-4">
                  {wallet.netProfit}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col justify-center items-center mt-6 space-y-2">
        <div className="flex space-x-2">
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md border transition duration-200 ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-500 hover:text-white"
            }`}
            aria-label="Go to first page"
          >
            &lt;&lt; First
          </button>
          <button
            onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md border transition duration-200 ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-500 hover:text-white"
            }`}
            aria-label="Go to previous page"
          >
            &lt; Previous
          </button>

          {/* Ellipsis and Middle Page Navigation */}
          {currentPage > 3 && <span className="mx-1">...</span>}
          {currentPage > 2 && (
            <button
              onClick={() => handlePageChange(currentPage - 2)}
              className="border px-3 py-1 rounded-md hover:bg-gray-200 transition duration-150"
            >
              {currentPage - 2}
            </button>
          )}
          {currentPage > 1 && (
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="border px-3 py-1 rounded-md hover:bg-gray-200 transition duration-150"
            >
              {currentPage - 1}
            </button>
          )}

          {/* Current Page Button */}
          <button className="border px-3 py-1 bg-blue-500 text-white rounded-md">
            {currentPage}
          </button>

          {currentPage < totalPages && (
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="border px-3 py-1 rounded-md hover:bg-gray-200 transition duration-150"
            >
              {currentPage + 1}
            </button>
          )}
          {currentPage < totalPages - 1 && (
            <button
              onClick={() => handlePageChange(currentPage + 2)}
              className="border px-3 py-1 rounded-md hover:bg-gray-200 transition duration-150"
            >
              {currentPage + 2}
            </button>
          )}
          {currentPage < totalPages - 2 && <span className="mx-1">...</span>}

          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md border transition duration-200 ${
              currentPage === totalPages
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-500 hover:text-white"
            }`}
            aria-label="Go to last page"
          >
            Last &gt;&gt;
          </button>
          <button
            onClick={() =>
              handlePageChange(Math.min(currentPage + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md border transition duration-200 ${
              currentPage === totalPages
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-500 hover:text-white"
            }`}
            aria-label="Go to next page"
          >
            Next &gt;
          </button>
        </div>

        {/* Current Page Indicator */}
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
      </div>
    </div>
  );
};

export default Home;
