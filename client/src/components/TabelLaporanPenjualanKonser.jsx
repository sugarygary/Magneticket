import React from 'react'

const TabelLaporanPenjualanKonser = () => {
    const salesData = [
        { id: 1, branch: 'KONSER A', date: '2023-11-01', qty: 120, amount: 1500, status: 'Completed' },
        { id: 2, branch: 'KONSER B', date: '2023-11-02', qty: 100, amount: 1200, status: 'Pending' },
        { id: 3, branch: 'KONSER C', date: '2023-11-03', qty: 80, amount: 1000, status: 'Completed' },
        { id: 4, branch: 'KONSER D', date: '2023-11-04', qty: 150, amount: 1800, status: 'Pending' },
        { id: 5, branch: 'KONSER E', date: '2023-11-05', qty: 90, amount: 1100, status: 'Completed' },
      ];
    
      return (
        <div className="biruTua mx-12 my-12 rounded">
            {/* Input for Artist */}
          <div className="px-4 pt-3 mb-5">
            <label htmlFor="artist" className="block text-white">Artist</label>
            <input type="text" id="artist" className="border-2 border-gray-300 p-2 rounded-md w-full biruTua" placeholder='Search'/>
          </div>
          {/* Table */}
          <table className="min-w-full text-white table-auto">
            {/* Table header */}
            <thead>
              <tr className="bg-gray-200 text-left bg-gray-700">
                <th className="py-2 px-4">NAMA</th>
                <th className="py-2 px-4">ARTIST</th>
                <th className="py-2 px-4">TANGGAL</th>
                <th className="py-2 px-4">TIKET</th>
                <th className="py-2 px-4">JUMLAH</th>
                <th className="py-2 px-4">STATUS</th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className='biruTua'>
              {salesData.map((sale) => (
                <tr key={sale.id}>
                  <td className="border-t border-b py-2 px-4">{sale.branch}</td>
                  <td className="border-t border-b py-2 px-4">{sale.qty}</td>
                  <td className="border-t border-b py-2 px-4">{sale.date}</td>
                  <td className="border-t border-b py-2 px-4">{sale.amount}</td>
                  <td className="border-t border-b py-2 px-4">{sale.status}</td>
                  <td className="border-t border-b py-2 px-4">{sale.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
    
          
        </div>
      );
}

export default TabelLaporanPenjualanKonser