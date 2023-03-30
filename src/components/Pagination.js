import { useEffect, useState } from 'react';
import { Pagination as BPagination, PaginationItem, PaginationLink } from 'reactstrap';


const Pagination = ({ currentPage, hits, perPage, onPageChanged, className }) => {
    const [pages, setPages] = useState([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(0);

    useEffect(() => {
        if(hits && perPage) {
            setCount(Math.ceil(hits / perPage));
            setPage(1);
            pages.splice(0, pages.length);
            for (let i = 0; i < Math.ceil(hits / perPage); i++) {
                pages.push(i + 1);
            }

            setPages(pages);
        }
    }, [hits, perPage]);

    useEffect(() => {
        if(currentPage) {
            setPage(currentPage);
        }
    }, [currentPage]);

    useEffect(() => {
        onPageChanged && onPageChanged(page);
    }, [page]);

    const onNextClick = (e) => {
        e.preventDefault();
        if(page < count) {
            setPage(page + 1);
        }
    }

    const onPrevClick = (e) => {
        e.preventDefault();
        if(page > 1) {
            setPage(page - 1);
        }
    }

    const onPageClick = (idx) => {
        if(idx >= 1 && idx <= count) {
            setPage(idx);
        }
    }


    return (
        <BPagination className={ className ? `d-flex justify-content-center ${ className }` : "d-flex justify-content-center" }>
            { 
                page !== 1 && 
                <PaginationItem>
                    <PaginationLink href="#" previous className="bg-dark text-white rounded-0" onClick={ onPrevClick } />
                </PaginationItem> 
            }
           
            { 
            pages && pages.map((item => 
                <PaginationItem key={ item } active={ item === page }>
                    <PaginationLink href="#" onClick={ (e) => { e.preventDefault(); onPageClick(item); } } className="bg-dark text-white rounded-0">{ item }</PaginationLink>
                </PaginationItem>)) 
            }

            { 
                page < count && 
                <PaginationItem>
                    <PaginationLink href="#" next className="bg-dark text-white rounded-0" onClick={ onNextClick } /> 
                </PaginationItem> 
            }
        </BPagination>
    );
}

export default Pagination;