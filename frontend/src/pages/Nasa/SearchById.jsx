import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTable } from 'react-table';

const SearchById = ({ asteroidId }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        // const response = await axios.get(`http://localhost:9080/nasa-api/asteroids/${asteroidId}`);
        const response = await axios.get(`http://localhost:9080/nasa-api/asteroids/3542519`);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [asteroidId]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Close Approach Date',
        accessor: 'close_approach_date',
      },
      {
        Header: 'Orbiting Body',
        accessor: 'orbiting_body',
      },
      {
        Header: 'Relative Velocity (km/h)',
        accessor: d => d.relative_velocity.kilometers_per_hour,
      },
      {
        Header: 'Miss Distance (km)',
        accessor: d => d.miss_distance.kilometers,
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data: data ? data.close_approach_data : [] });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{data.name}</h1>
      <p>ID: {data.id}</p>
      <p>NASA JPL URL: <a href={data.nasa_jpl_url}>{data.nasa_jpl_url}</a></p>
      <p>Potentially Hazardous: {data.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}</p>

      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SearchById;