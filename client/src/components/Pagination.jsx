import React from 'react'

function Pagination( {donationsPerPage, totalDonations, paginate} ) {
    const pageNumbers = [];

    for(let i = 1 ; i <= Math.ceil(totalDonations / donationsPerPage); i++) {
        pageNumbers.push(i);
    }
  return (
     
    <nav >
        <ul classNam="page" >
            {pageNumbers.map((number) => {
                return (
                <li key={number} >
                    <a onClick={() => paginate(number)}  className='broj'>
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