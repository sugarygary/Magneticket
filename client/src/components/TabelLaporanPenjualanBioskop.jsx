import React from 'react'

const TabelLaporanPenjualanBioskop = () => {
    const salesData = [
        { id: 1, branch: 'Bioskop A', date: '2023-11-01', qty: 120, amount: 1500, status: 'Completed' },
        { id: 2, branch: 'Bioskop B', date: '2023-11-02', qty: 100, amount: 1200, status: 'Pending' },
        { id: 3, branch: 'Bioskop C', date: '2023-11-03', qty: 80, amount: 1000, status: 'Completed' },
        { id: 4, branch: 'Bioskop D', date: '2023-11-04', qty: 150, amount: 1800, status: 'Pending' },
        { id: 5, branch: 'Bioskop E', date: '2023-11-05', qty: 90, amount: 1100, status: 'Completed' },
      ];
    
      return (
        <div className="p-4">
          <table className="min-w-full text-white table-auto">
            <thead>
              <tr className="bg-gray-200 text-left bg-gray-700">
                <th className="py-2 px-4">Cabang</th>
                <th className="py-2 px-4">Date</th>
                <th className="py-2 px-4">Qty</th>
                <th className="py-2 px-4">Amount</th>
                <th className="py-2 px-4">Status</th>
              </tr>
            </thead>
            <tbody className='biruTua'>
              {salesData.map((sale) => (
                <tr key={sale.id}>
                  <td className="border-t border-b py-2 px-4">{sale.branch}</td>
                  <td className="border-t border-b py-2 px-4">{sale.date}</td>
                  <td className="border-t border-b py-2 px-4">{sale.qty}</td>
                  <td className="border-t border-b py-2 px-4">{sale.amount}</td>
                  <td className="border-t border-b py-2 px-4">{sale.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
}

export default TabelLaporanPenjualanBioskop