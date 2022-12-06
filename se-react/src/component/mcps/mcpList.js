import React, {useState, useEffect} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import filterFactory, {textFilter} from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';

function MCPList(){
    const [mcpList, setMCPList] = useState([]);

    const columns = [
        {dataField:'id',text:'MCP ID'},
        {dataField:'capacity',text:'MCP Capacity', /*sort:true, filter:textFilter()*/},
        {dataField:'lat', text:'Latitude'},
        {dataField:'long', text:'Longtitude'}

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
        fetch("http://127.0.0.1:8000/api/mcp/")
            .then (response => response.json())
            .then(result => setMCPList(result))
            .catch(error => console.log(error));
    },[])
    return <div>
        <BootstrapTable 
        bootstrap4 
        keyField='id' 
        columns={columns} 
        data={mcpList}
        pagination = {pagination}
        filter = {filterFactory()}
        />
        </div>
}
export default MCPList;