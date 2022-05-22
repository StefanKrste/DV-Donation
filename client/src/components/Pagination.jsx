import React from 'react'

function Pagination({donationsPerPage, totalDonations, paginate}) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalDonations / donationsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <nav className={"mt-5"}>
            <ul className="pagination" style={{justifyContent: "center"}}>
                {pageNumbers.map((number) => {
                    return (
                        <li key={number} className="page-item">
                            <a onClick={() => paginate(number)} className='page-link'>
                                {number}
                            </a>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}

export default Pagination
