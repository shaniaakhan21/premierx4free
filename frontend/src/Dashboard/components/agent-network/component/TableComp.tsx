import { Table } from 'react-bootstrap';

type TableData = {
  col1: string;
  col2: string;
  col3: string;
  col4: string;
}

type Props = {
  data: TableData[];
  col1head: string;
  col2head: string;
  col3head: string;
  col4head: string;
}

function TablesComp({ data, col1head, col2head, col3head, col4head }: Props): JSX.Element {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Active":
        return <img src="assets/svg/Dashboard/approve.svg" className="Active-icon" alt="Active" />;
      case "Inactive":
        return <img src="assets/svg/Dashboard/rejected.svg" className="Inactive-icon" alt="Inactive" />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Table bordered hover responsive style={{ borderRadius: '5%' }} className='tableDesign'>
        <thead>
        <tr style={{ backgroundColor: '#F4F6F8' }}>
          <th>{col1head}</th>
          <th>{col2head}</th>
          <th>{col3head}</th>
          <th>{col4head}</th>
        </tr>
        </thead>
        <tbody>
        {data.map((row, index) => (
          <tr key={index} style={{ backgroundColor: 'white' }}>
            <td>{row.col1}</td>
            <td>{row.col2}</td>
            <td className="status-col">{getStatusIcon(row.col3)} {row.col3}</td>
            <td>{row.col4}</td>
          </tr>
        ))}
        </tbody>
      </Table>
    </div>
  );
}

export default TablesComp;
