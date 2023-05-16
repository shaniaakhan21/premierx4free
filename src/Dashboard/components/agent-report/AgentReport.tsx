import { Table } from 'react-bootstrap';
import './styles.css';

type TableData = {
    col1: string;
    col2: string;
    col3: string;
    col4: string;
    col5: string;
    col6: string;
    col7: string;
    col8: string;
    col9: string;
}

type Props = {
    data: TableData[];
    spanText: string;
    col1head: string;
    col2head: string;
    col3head: string;
    col4head: string;
    col5head: string;
    col6head: string;
    col7head: string;
    col8head: string;
    col9head: string;
}

const Report = ({ data, spanText, col1head, col2head, col3head, col4head, col5head, col6head, col7head, col8head, col9head }: Props)   =>  {
  const getStatusIcon = (status: string) => {
    switch (status) {
    case 'Active':
      return <img src="assets/svg/Dashboard/approve.svg" className="Active-icon" alt="Active" />;
    case 'Inactive':
      return <img src="assets/svg/Dashboard/rejected.svg" className="Inactive-icon" alt="Inactive" />;
    default:
      return null;
    }
  };
  return (
    <div className="box-main-network" id='report'>
      <span className='textCustom'>{spanText}</span>
      <Table bordered hover responsive style={{ borderRadius: '5%' }} className='tableDesign'>
        <thead>
          <tr style={{ backgroundColor: '#F4F6F8' }}>
            <th>{col1head}</th>
            <th>{col2head}</th>
            <th>{col3head}</th>
            <th>{col4head}</th>
            <th>{col5head}</th>
            <th>{col6head}</th>
            <th>{col7head}</th>
            <th>{col8head}</th>
            <th>{col9head}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} style={{ backgroundColor: 'white' }}>
              <td>{row.col1}</td>
              <td className="status-col">{getStatusIcon(row.col2)}{row.col2}</td>
              <td>{row.col3}</td>
              <td>{row.col4}</td>
              <td>{row.col5}</td>
              <td>{row.col6}</td>
              <td>{row.col7}</td>
              <td>{row.col8}</td>
              <td>{row.col9}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Report;