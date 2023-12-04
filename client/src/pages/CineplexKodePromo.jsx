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
        // console.log(id);
        const response = await deleteKodePromo(id);
        console.log(response);
        window.location.reload();
    }
    // console.log(data.length);
    return (
        <div className='mx-10'>
            <div className='my-4'>
                <Link className='biruMuda text-white px-2 py-2 rounded' to="/cineplex/create-promo"> Tambah Kode Promo</Link>
            </div>
            {data !== "Request failed with status code 404" && (
                <table className="min-w-full text-white table-auto">
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
                                    <button className='biruMuda px-2 py-1 rounded' onClick={() => handleDelete(promo._id)}>delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default CineplexKodePromo