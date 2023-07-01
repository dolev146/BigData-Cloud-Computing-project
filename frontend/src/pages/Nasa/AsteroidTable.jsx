import { Table, Tag } from 'antd';

const AsteroidTable = ({ asteroids }) => {
  const columns = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'index',
    },
    {
      title: 'Asteroid ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Absolute Magnitude',
      dataIndex: 'absolute_magnitude_h',
      key: 'absolute_magnitude_h',
    },
    {
      title: 'Estimated Diameter (m)',
      dataIndex: 'estimated_diameter',
      key: 'estimated_diameter',
      render: text => text.meters.estimated_diameter_min,
    },
    {
      title: 'Is Potentially hazardous asteroid?',
      dataIndex: 'is_potentially_hazardous_asteroid',
      key: 'is_potentially_hazardous_asteroid',
      render: text => (
        <Tag color={text ? 'volcano' : 'green'}>
          {text ? 'True' : 'False'}
        </Tag>
      ),
    },
    {
      title: 'Close Approach Date',
      dataIndex: 'close_approach_date',
      key: 'close_approach_date',
      render: text => text[0].close_approach_date,
    }
  ];

  const dataSource = asteroids.map((asteroid, index) => ({
    key: asteroid.id,
    index: index + 1,
    id: asteroid.id,
    absolute_magnitude_h: asteroid.absolute_magnitude_h,
    estimated_diameter: asteroid.estimated_diameter,
    is_potentially_hazardous_asteroid: asteroid.is_potentially_hazardous_asteroid,
    close_approach_date: asteroid.close_approach_data,
    name: asteroid.name,
  }));

  return <Table dataSource={dataSource} columns={columns} />;
};

export default AsteroidTable;
