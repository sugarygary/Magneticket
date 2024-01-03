import React from 'react'
import { Link } from 'react-router-dom'
import { useLoaderData } from 'react-router-dom'
import { deleteKodePromo } from "../handlers/CineplexHandler";

const CineplexKodePromo = () => {
    const data = useLoaderData();
    if (data == "Request failed with status code 401") {
        throw new Response('', { status: 401 })
    }
    async function handleDelete(id) {
        const response = await deleteKodePromo(id);
        console.log(response);
        window.location.reload();
    }
    return (
        <div className='mx-2 sm:mx-10'>
            <div className='my-4'>
                <Link className='biruMuda text-white px-2 py-2 rounded' to="/cineplex/create-promo"> Tambah Kode Promo</Link>
            </div>
            {data !== "Request failed with status code 404" && (
                <div className="text-white table-auto overflow-x-scroll">
                    <table className="whitespace-nowrap w-full">
                        <thead>
                            <tr className="bg-gray-200 text-left bg-gray-700">  
                                <th className="py-2 px-4">Kode Promo</th>
                                <th className="py-2 px-4">Masa Berlaku</th>
                                <th className="py-2 px-4">Potongan</th>
                                <th className="py-2 px-4">Action</th>
                            </tr>
                        </thead>
                        <tbody className="biruTua">
                            {data.promos.map((promo) => (
                                <tr key={promo.id}>
                                    <td className="border-t border-b py-2 px-4">{promo.promo_code}</td>
                                    <td className="border-t border-b py-2 px-4">{promo.valid_until.substring(0, 10)}</td>
                                    <td className="border-t border-b py-2 px-4">{new Intl.NumberFormat("id-ID", {
                                                                                    style: "currency",
                                                                                    currency: "IDR",
                                                                                }).format(promo.discount_amount)}
                                    </td>
                                    <td className="border-t border-b py-2 px-4">
                                        <button className='bg-blue-500 px-2 py-1 rounded' onClick={() => handleDelete(promo._id)}>delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default CineplexKodePromo
