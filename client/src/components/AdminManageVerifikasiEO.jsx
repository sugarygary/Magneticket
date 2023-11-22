import { useState, useEffect } from "react"
import openheimer from "../assets/openheimer.jpg"
const AdminManageVerifikasiEO = (props) => {
    return (
    <div className="w-9/12 border rounded-lg overflow-x-auto h-max">
        <table className="w-full h-auto">
            <thead className="bg-gray-700 text-white text-left">
                <tr>
                <th className="py-2 px-4">Nama</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Action</th>
                <th className="py-2 px-4">Status</th>
                </tr>
            </thead>
            <tbody className="bg-gray-900 text-white">
                <tr className="border-b border-gray-700">
                <td className="py-2 px-4">John Doe</td>
                <td className="py-2 px-4">john.doe@example.com</td>
                <td className="py-2 px-4">
                    <button className="bg-blue-500 text-white py-1 px-2 rounded">Lihat Detail</button>
                </td>
                <td className="py-2 px-4">
                    <span className="text-white py-1 px-2 rounded">Active</span>
                </td>
                </tr>
            </tbody>
        </table>
    </div>
    )
}

export default AdminManageVerifikasiEO