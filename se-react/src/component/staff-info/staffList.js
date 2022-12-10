import React, { useState, useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';

function StaffList() {
    const [userList, setUserList] = useState([]);

    const columns = [
        { dataField: 'staff_id', text: 'Staff ID' },
        { dataField: 'fullname', text: 'Fullname' }
    ]

    const pagination = paginationFactory({
        page: 1,
        sizePerPage: 6,
        lastPageText: '>>',
        firstPageText: '<<',
        nextPageText: '>',
        prePageText: '<',
        showTotal: true,
        alwaysShowAllBtns: true,
        onPageChange: function (page, sizePerPage) {
            console.log('page', page);
            console.log('sizePerpage', sizePerPage);
        },
        onSizePerPageChange: function (page, sizePerPage) {
            console.log('page', page);
            console.log('sizePerpage', sizePerPage);
        }
    });
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/collector/")
            .then(response => response.json())
            .then(result => setUserList(result))
            .catch(error => console.log(error));
    }, [userList.length])
    return <div>
        <BootstrapTable
            bootstrap4
            keyField='id'
            columns={columns}
            data={userList}
            pagination={pagination}
            filter={filterFactory()}
        />


        {/*y<table>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
            </tr>
            {
                userList && userList.length >0 ?
                userList.map(usr=>                    
                <tr>
                    <td>{usr.id}</td>
                    <td>{usr.name}</td>
                    <td>{usr.username}</td>
                    <td>{usr.email}</td>
                </tr>
                )
                :"Loading"
            }
        </table>*/}
    </div>
}
export default StaffList;