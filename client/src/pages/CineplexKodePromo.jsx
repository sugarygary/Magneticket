import React from 'react'
import { Link } from 'react-router-dom'
import { useLoaderData } from 'react-router-dom'
import { deleteKodePromo } from "../handlers/CineplexHandler";

const CineplexKodePromo = () => {
    const data = useLoaderData();
    async function handleDelete(id) {
        // console.log(id);
        const response = await deleteKodePromo(id);
        console.log(response);
        window.location.reload();
    }
    // console.log(data.length);
    return (
        <>
            <Link to="/cineplex/create-promo"> Tambah Kode Promo</Link>
            {data !== "Request failed with status code 404" && (
                <table>
                    <thead>
                        <tr>
                            <th>Kode Promo</th>
                            <th>Masa Berlaku</th>
                            <th>Potongan</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.promos.map((promo) => (
                            <tr key={promo.id}>
                                <td>{promo.promo_code}</td>
                                <td>{promo.valid_until}</td>
                                <td>{promo.discount_amount}</td>
                                <td>
                                    <button onClick={() => handleDelete(promo._id)}>delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    )
}

export default CineplexKodePromo