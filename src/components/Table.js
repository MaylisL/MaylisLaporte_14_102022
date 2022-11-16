//libraries
import React, { useState } from 'react';
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';
import { usePagination } from '@table-library/react-table-library/pagination';
import { useSort, HeaderCellSort } from '@table-library/react-table-library/sort';
import {
    Table,
    Header,
    HeaderRow,
    Body,
    Row,
    Cell
  } from '@table-library/react-table-library/table';
import { useSelector } from 'react-redux';

//components
import MyDropdown from './dropdown';

//styles
import "./table.css";

const TableComponent = () => {
    const employeeList = useSelector((state) => state.employee.list);
    
    let data = { nodes: employeeList };

    const [search, setSearch] = useState('');
  
    const handleSearch = (event) => {
      setSearch(event.target.value);
    };
    
    const paginationSizeOptions = [
        {
            value: 10,
            label: 10,
        },
        {
            value: 25,
            label: 25,
        },
        {
            value: 50,
            label: 50,
        },
    ]
    // pagination nb de pages + state changement de page
    const pagination = usePagination(data, {
        state: {
            page: 0,
            size: paginationSizeOptions[0].value,
        }
    });

    //const theme = useTheme(getTheme());
    const theme = useTheme([
        getTheme(),
        {
        HeaderRow: `background-color: #eaf5fd;`,
        Row: `text-align: left;`,
        HeaderCell: `
            text-align: left;
            background-color:#EEF2DF;
        `,
        Cell: `
            & div {
                white-space: normal;
            }
        `,
        Table: `
            --data-table-library_grid-template-columns: repeat(9, minmax(140px, 1fr));
        `,
    }]);

    // filter data by search value
    data = {
        nodes: data.nodes.filter(row =>  {
            // combine all values from row into 1 string
            const combinedRowValues = Object.values(row).join(',').toLowerCase();
            // check if the row values matches search text
            const isSearchTextInRow = combinedRowValues.includes(search.toLocaleLowerCase())
            return isSearchTextInRow;
        })
    }

    const showingFrom = data.nodes.length > 0 ? pagination.state.page * pagination.state.size + 1 : 0;
    const showingTo = ((pagination.state.page + 1) * pagination.state.size) < data.nodes.length ? ((pagination.state.page + 1) * pagination.state.size) : data.nodes.length;
    
    // sort
    const sort = useSort(
        data,
        null,
        {
        sortFns: {
            firstName: (array) => array.sort((a, b) => a.firstName.localeCompare(b.firstName)),
            lastName: (array) => array.sort((a, b) => a.lastName.localeCompare(b.lastName)),
            startDate: (array) => array.sort((a, b) => new Date(a.startDate) - new Date(b.startDate)),
            department: (array) => array.sort((a, b) => a.department.localeCompare(b.department)),
            dateOfBirth: (array) => array.sort((a, b) => new Date(a.dateOfBirth) - new Date(b.dateOfBirth)),
            street: (array) => array.sort((a, b) => a.street.localeCompare(b.street)),
            city: (array) => array.sort((a, b) => a.city.localeCompare(b.city)),
            state: (array) => array.sort((a, b) => a.state.localeCompare(b.state)),
            zipCode: (array) => array.sort((a, b) => a.zipCode - b.zipCode),
          },
        },
      );
    
    return (
        <div className='table-wrapper'>
            <label className='search' htmlFor="search">
                Search:  
                <input className='input-search' id="search" type="text" onChange={handleSearch} />
            </label>
            <Table data={data} sort={sort} theme={theme} layout={{ custom: true, horizontalScroll: true }} pagination={pagination}>
            {(tableList) => (
                <>
                <Header>
                    <HeaderRow>
                        <HeaderCellSort sortKey="firstName">First Name</HeaderCellSort>
                        <HeaderCellSort sortKey="lastName">Last Name</HeaderCellSort>
                        <HeaderCellSort sortKey="startDate">Start Date</HeaderCellSort>
                        <HeaderCellSort sortKey="department">Department</HeaderCellSort>
                        <HeaderCellSort sortKey="dateOfBirth">Date of Birth</HeaderCellSort>
                        <HeaderCellSort sortKey="street">Street</HeaderCellSort>
                        <HeaderCellSort sortKey="city">City</HeaderCellSort>
                        <HeaderCellSort sortKey="state">State</HeaderCellSort>
                        <HeaderCellSort sortKey="zipCode">Zip Code</HeaderCellSort>
                    </HeaderRow>
                </Header>

                <Body>
                    {tableList.map((item) => (
                    <Row key={item.id} item={item}>
                        <Cell>{item.firstName}</Cell>
                        <Cell>{item.lastName}</Cell>
                        <Cell>
                        {new Date(item.startDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                        })}
                        </Cell>
                        <Cell>{item.department}</Cell>
                        <Cell>
                        {new Date(item.dateOfBirth).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                        })}
                        </Cell>
                        <Cell>{item.street}</Cell>
                        <Cell>{item.city}</Cell>
                        <Cell>{item.state}</Cell>
                        <Cell>{item.zipCode}</Cell>
                    </Row>
                    ))}
                </Body>
                </>
            )}
            </Table>
            <div className='pagination-bar' style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Showing {showingFrom} to {showingTo} entries:{data.nodes.length}</span>
                <span className='next-and-previous'>
                    <button
                    type='button'
                    className='button button-pagination'
                    disabled={data.nodes.length === 0 || pagination.state.page === 0}
                    onClick={() => pagination.fns.onSetPage(pagination.state.page - 1)}
                    >
                    {'Previous'}
                    </button>
                    <span>{` ${pagination.state.page+1} `}</span>
                    <button
                    type='button'
                    className='button button-pagination'
                    disabled={data.nodes.length === 0 || pagination.state.page + 1 === pagination.state.getTotalPages(data.nodes)}
                    onClick={() => pagination.fns.onSetPage(pagination.state.page + 1)}
                    >
                    {'Next'}
                    </button>
                </span> 
            </div>    
            <div className='pagination-dropdown'>
                <MyDropdown options={paginationSizeOptions} onChange={pagination.fns.onSetSize}/>
            </div>
        </div>
    );
};

export default TableComponent;