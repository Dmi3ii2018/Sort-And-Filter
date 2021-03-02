import React from "react";
import "./App.css";
import { Table } from "components"
import { useData } from "hooks/useData";

const columns = [
  {
    title: '',
    dataIndex: 'img',
    key: 'img',
    filter: false,
    sort: false,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    filter: true,
    sort: true,
  },
  {
    title: 'Attack',
    dataIndex: 'attack',
    key: 'attack',
    filter: true,
    sort: true,
  },
  {
    title: 'Defense',
    dataIndex: 'defense',
    key: 'defense',
    filter: true,
    sort: true,
  },
  {
    title: 'Hp',
    dataIndex: 'hp',
    key: 'hp',
    filter: true,
    sort: true,
  },
  {
    title: 'Speed',
    dataIndex: 'speed',
    key: 'speed',
    filter: true,
    sort: true,
  }
];

function App() {
  const [data, isLoading, isError] = useData();
  
  if(isError) {
    return `Error happend: ${isError}`
  }

  return (
    <div>
      {data && data.items.length && <Table dataSource={data} isLoading={isLoading} columns={columns}/>}
    </div>
  );
}

export default App;
