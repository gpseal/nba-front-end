import React from "react";
import { PaginationItem } from "reactstrap";

const Pagination = (props) => {

    console.log(props.dataPerPage)

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(props.totalData / props.dataPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className="page-item" >
                        <a onClick={() => props.paginate(number)}href="#!" className="page-link" style={{color: 'black'}}>
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )

}

export default Pagination;