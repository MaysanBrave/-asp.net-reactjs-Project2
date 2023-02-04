import {DataContext} from "./DataProvider";
import ProgressProducts from './ProgressProducts' ;
import  {useContext,useState} from 'react';
import Products from "./Products";
import React from 'react'

export default function ProductsHandler(props) {
    const value = useContext(DataContext);
    const [search, setSearch] = useState(props.search);

    return (
        <div>
        {
            value.currentUser && value.currentUser.role == 'admin' ?
            <ProgressProducts search={props.search}></ProgressProducts> :
            // <div>Hello</div>:
            <Products search={props.search}></Products>        
        }
        </div>
    )
}
