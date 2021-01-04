import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginTop: theme.spacing(2),
            marginBottom:theme.spacing(2),
        },
    },
}));

export default function PaginationRounded(props) {
    const classes = useStyles();
    //   
    const {totalPosts, perPage, handleChangePage, currentPage } = props;
    const totalPage = Math.ceil(totalPosts / perPage);

    return (
        <div className={classes.root}>
            <Pagination count={totalPage} color="primary" page={currentPage} onChange={handleChangePage}/>
        </div>
    );
}







// import React from 'react';


// export default function Pagination(props){
//     const {totalPosts, perPage, paginate } = props;

//     const pageNumbers = [];
//     for(let i = 1; i <= Math.ceil(totalPosts / perPage); i++) {
//         pageNumbers.push(i);
//     }
//     return (
//         <nav>
//             <ul className="pagination">
//                 {pageNumbers.map(number => (
//                     <li key={number} className="page-item">
//                         <a onClick={() => paginate(number)} href="#" className="page-link">
//                             {number}
//                         </a>
//                     </li>
//                 ))}
//             </ul>
//         </nav>
//     )
// }