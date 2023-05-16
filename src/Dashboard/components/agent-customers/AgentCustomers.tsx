import './styles.css';
import { Table } from 'react-bootstrap';

type TableData = {
    col1: string;
    col2: string;
    col3: string;
    col4: string;
    col5: string;
}

type Props = {
    data: TableData[];
    spanText: string;
    col1head: string;
    col2head: string;
    col3head: string;
    col4head: string;
    col5head: string;
}

const AgentCustomers = ({ data, spanText, col1head, col2head, col3head, col4head, col5head }: Props)   =>  {
  const getStatusIcon = (status: string) => {
    switch (status) {
    case 'Approved':
      return <img src="assets/svg/Dashboard/approve.svg" className="Approved-icon" alt="Approved" />;
    case 'Rejected':
      return <img src="assets/svg/Dashboard/rejected.svg" className="Rejected-icon" alt="Rejected" />;
    case 'Pending':
      return <img src="assets/svg/Dashboard/pending.svg" className="Pending-icon" alt="Pending" />;
    default:
      return null;
    }
  };
  return (
    <div className="box-main box-main-customer">
      <span className='textCustom'>{spanText}</span>
      <Table bordered hover responsive style={{ borderRadius: '5%' }} className='tableDesign'>
        <thead>
          <tr style={{ backgroundColor: '#F4F6F8' }}>
            <th>{col1head}</th>
            <th>{col2head}</th>
            <th>{col3head}</th>
            <th>{col4head}</th>
            <th>{col5head}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} style={{ backgroundColor: 'white' }}>
              <td>{row.col1}</td>
              <td>{row.col2}</td>
              <td>{row.col3}</td>
              <td className="status-col">{getStatusIcon(row.col4)} {row.col4}</td>
              <td>{row.col5}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AgentCustomers;