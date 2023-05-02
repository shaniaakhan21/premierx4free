import "./styles.css";
import { Table } from 'react-bootstrap';

type TableData = {
    col1: string;
    col2: string;
    col3: string;
    col4: string;
}
  
type Props = {
    data: TableData[];
    spanText: string;
    col1head: string;
    col2head: string;
    col3head: string;
    col4head: string;
}

const AgentTeam = ({ data, spanText, col1head, col2head, col3head, col4head }: Props)   =>  {
	return (
		<div className="box-main">
            <span className='textCustom'>{spanText}</span>
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
                        <td>{row.col3}</td>
                        <td ><a href="#" className="color-link">{row.col4}</a></td>
                    </tr>
                    ))}
                </tbody>
            </Table>
		</div>
	)
}

export default AgentTeam;