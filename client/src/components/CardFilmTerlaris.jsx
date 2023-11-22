import React from 'react'


const CardFilmTerlaris = () => {
    const topMovies = [
        { title: 'Film 1', director: 'Director 1', rating: '9.0' },
        { title: 'Film 2', director: 'Director 2', rating: '8.8' },
        { title: 'Film 3', director: 'Director 3', rating: '8.7' },
        { title: 'Film 4', director: 'Director 4', rating: '8.5' },
        { title: 'Film 5', director: 'Director 5', rating: '8.4' },
        { title: 'Film 6', director: 'Director 6', rating: '8.3' },
        { title: 'Film 7', director: 'Director 7', rating: '8.2' },
        { title: 'Film 8', director: 'Director 8', rating: '8.1' },
        { title: 'Film 9', director: 'Director 9', rating: '8.0' },
        { title: 'Film 10', director: 'Director 10', rating: '7.9' },
      ];
    
      return (
        <div className="flex">
            <div className="p-4 biruTua rounded mx-3 my-5 text-white">
            <h1 className="text-2xl font-bold mb-2">Judul Film Terlaris</h1>
            <h2 className="text-lg mb-5">Per Minggu Ini</h2>
            <div className="">
                <table>
                    {topMovies.map((movie, index) => (
                    <tr>
                        <td className=''>{index+1}. </td>
                        <td>{movie.title}</td>
                    </tr>
                    // <p key={index} className="text-lg font-semibold mb-1">
                    //     {index+1}.  {movie.title} ({movie.director}) - {movie.rating}
                    // </p>
                    ))}
                </table>
            </div>
            </div>
        </div>
      );
}

export default CardFilmTerlaris