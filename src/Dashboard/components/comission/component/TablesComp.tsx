import { Table } from 'react-bootstrap';

type TableData = {
    col1?: string;
    col2?: string;
    col3?: string;
    col4?: string;
    col5?: string;
    col6?: string;
}

type Props = {
    data: TableData[];
    col1head?: string;
    col2head?: string;
    col3head?: string;
    col4head?: string;
    col5head?: string;
    col6head?: string;
}

function TablesComp({ data, col1head, col2head, col3head, col4head, col5head, col6head }: Props): JSX.Element {
    const numCols = Object.keys(data[0] || {}).length;
    const lastColIndex = numCols - 1;
    return (
        <div>
            <Table bordered hover responsive style={{ borderRadius: '5%' }} className='tableDesign'>
                <thead>
                    <tr style={{ backgroundColor: '#F4F6F8' }}>
                        {col1head && <th>{col1head}</th>}
                        {col2head && <th>{col2head}</th>}
                        {col3head && <th>{col3head}</th>}
                        {col4head && <th>{col4head}</th>}
                        {col5head && <th>{col5head}</th>}
                        {col6head && <th>{col6head}</th>}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index} style={{ backgroundColor: 'white' }}>
                            {row.col1 && <td>{row.col1}</td>}
                            {row.col2 && <td>{row.col2}</td>}
                            {row.col3 && <td>{row.col3}</td>}
                            {row.col4 && <td>{row.col4}</td>}
                            {row.col5 && (
                                <td style={{ textAlign: lastColIndex === 4 ? 'end' : 'start', paddingRight: '2.5%' }}>
                                    {row.col5}
                                </td>
                            )}
                            {row.col6 && (
                                <td style={{ textAlign: lastColIndex === 5 ? 'end' : 'start', paddingRight: '2.5%' }}>
                                    {row.col6}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default TablesComp;
