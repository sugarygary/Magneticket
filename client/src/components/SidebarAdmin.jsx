import { useState, useEffect } from "react"
import logo1 from "../assets/logo1.png"
import search from "../assets/search.png"
import { Link } from "react-router-dom"

const SidebarAdmin = (props) => {
    const [boolSales, setBoolSales] = useState(false)
    function buttonSales() {
        if (boolSales) {
            setBoolSales(false)
        } else {
            setBoolSales(true)
        }
    }
    return (
    <aside className="h-screen bg-gray-800 text-white w-72">
      <div className="p-4">
        <div className="justify-center flex mt-4">
            <img src={logo1} alt="" className="w-12 mr-2" />
            <p className="font-magneticket text-4xl">MAGNETICKET</p>
        </div>
      </div>
      <nav className="text-md mt-2">
        <ul>
          <li className="py-2 px-4 hover:bg-gray-700">
            <a href="#" className="block">Home</a>
          </li>
          <li className="py-2 px-4 hover:bg-gray-700">
            <a href="#" className="block">Laporan</a>
          </li>
          <li className="py-2 px-4 hover:bg-gray-700">
            <a href="#" className="block" onClick={() => {buttonSales()}}>Sales</a>
            {boolSales &&
                <ul className="pl-4">
              <li className="py-2 px-4 hover:bg-gray-700">
                <a href="#" className="block">Cineplex</a>
              </li>
              <li className="py-2 px-4 hover:bg-gray-700">
                <a href="#" className="block">Event Organize</a>
              </li>
              <li className="py-2 px-4 hover:bg-gray-700">
                <a href="#" className="block">Invoice</a>
              </li>
            </ul>
            }
          </li>
          <li className="py-2 px-4 hover:bg-gray-700">
            <a href="#" className="block">Messages</a>
          </li>
          <li className="py-2 px-4 hover:bg-gray-700">
            <a href="#" className="block">Verification</a>
          </li>
        </ul>
      </nav>
    </aside>
    )
}

export default SidebarAdmin