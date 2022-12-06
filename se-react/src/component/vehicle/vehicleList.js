import React, {useState, useEffect} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import filterFactory, {textFilter} from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';

function VehicleList(){
    const [vehicleList, setVehicleList] = useState([]);

    const columns = [
        {dataField:'id',text:'Vehicle ID'},
        {dataField:'fuel_capacity',text:'Fuel Capacity', /*sort:true, filter:textFilter()*/},
        {dataField:'capacity', text:'Weight Capacity'},
        {dataField:'driver', text:'Driver ID'}

    ]
    
    const pagination = paginationFactory({
        page:1,
        sizePerPage:6,
        lastPageText:'>>',
        firstPageText:'<<',
        nextPageText:'>',
        prePageText:'<',
        showTotal:true,
        alwaysShowAllBtns:true,
        onPageChange: function(page,sizePerPage){
            console.log('page',page);
            console.log('sizePerpage',sizePerPage);
        },
        onSizePerPageChange: function(page,sizePerPage){
            console.log('page',page);
            console.log('sizePerpage',sizePerPage);
        }
    });
    useEffect(()=>{
        fetch("http://127.0.0.1:8000/api/vehicle/")
            .then (response => response.json())
            .then(result => setVehicleList(result))
            .catch(error => console.log(error));
    },[])
    return <div>
        <BootstrapTable 
        bootstrap4 
        keyField='id' 
        columns={columns} 
        data={vehicleList}
        pagination = {pagination}
        filter = {filterFactory()}
        />
        </div>
}
export default VehicleList;