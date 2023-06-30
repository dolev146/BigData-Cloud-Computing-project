import Table from "react-bootstrap/Table";

const AsteroidTable = ({ asteroids }) => (
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>#</th>
        <th>Asteroid ID</th>
        <th>Absolute Magnitude</th>
        <th>Estimated Diameter (m)</th>
        <th>Is Potentially hazardous asteroid?</th>
        <th>Close Approach Date</th>
        <th>Name</th>
      </tr>
    </thead>
    <tbody>
      {asteroids.map((asteroid, index) => (
        <tr key={asteroid.id}>
          <td>{index + 1}</td>
          <td>{asteroid.id}</td>
          <td>{asteroid.absolute_magnitude_h}</td>
          <td>{asteroid.estimated_diameter.meters.estimated_diameter_min}</td>
          <td
            style={{
              color: asteroid.is_potentially_hazardous_asteroid
                ? "red"
                : "green",
            }}
          >
            {asteroid.is_potentially_hazardous_asteroid ? "Yes" : "No"}
          </td>
          <td>{asteroid.close_approach_data[0].close_approach_date}</td>
          <td>{asteroid.name}</td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default AsteroidTable;
