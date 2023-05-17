import { Table } from 'react-bootstrap';
import './styles.css';

type TableData = {
    col1?: string | number;
    col2?: string | number;
    col3?: string | number;
    col4?: string | number;
    col5?: string | number;
    col6?: string | number;
    [key: string]: string | number | undefined;
};

type Props = {
    data: TableData[];
    col1head?: string | number;
    col2head?: string | number;
    col3head?: string | number;
    col4head?: string | number;
    col5head?: string | number;
    col6head?: string | number;
};

function TablesComp({ data, col1head, col2head, col3head, col4head, col5head, col6head }: Props): JSX.Element {
    const numCols = Math.max(...data.map(row => Object.keys(row).length));
    const lastColIndex = numCols - 1;
    const lastColumnTotal = data.reduce((total, row) => {
        const lastColumn = row[`col${lastColIndex + 1}`] as string | number | undefined;
        if (lastColumn && typeof lastColumn === 'number') {
            return total + lastColumn;
        }
        return total;
    }, 0);

    return (
        <div>
            <Table bordered hover responsive style={{ borderRadius: '5%' }} className='tableDesign'>
                <thead>
                    <tr style={{ backgroundColor: '#F4F6F8' }}>
                        {col1head && <th>{col1head}</th>}
                        {col2head && (
                            <th style={{ textAlign: lastColIndex === 1 ? 'end' : 'start', paddingRight: '2.5%' }}>
                                {col2head}
                            </th>
                        )}
                        {col3head && (
                            <th style={{ textAlign: lastColIndex === 2 ? 'end' : 'start', paddingRight: '2.5%' }}>
                                {col3head}
                            </th>
                        )}
                        {col4head && (
                            <th style={{ textAlign: lastColIndex === 3 ? 'end' : 'start', paddingRight: '2.5%' }}>
                                {col4head}
                            </th>
                        )}
                        {col5head && (
                            <th style={{ textAlign: lastColIndex === 4 ? 'end' : 'start', paddingRight: '2.5%' }}>
                                {col5head}
                            </th>
                        )}
                        {col6head && (
                            <th style={{ textAlign: lastColIndex === 5 ? 'end' : 'start', paddingRight: '2.5%' }}>
                                {col6head}
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index} style={{ backgroundColor: 'white' }}>
                            {row.col1 && <td>{row.col1}</td>}
                            {row.col2 && (
                                <td style={{ textAlign: lastColIndex === 1 ? 'end' : 'start', paddingRight: '2.5%' }}>
                                    {lastColIndex === 1 ? `$ ${row.col2}` : row.col2}
                                </td>
                            )}
                            {row.col3 && (
                                <td style={{ textAlign: lastColIndex === 2 ? 'end' : 'start', paddingRight: '2.5%' }}>
                                    {lastColIndex === 2 ? `$ ${row.col3}` : row.col3}
                                </td>
                            )}
                            {row.col4 && (
                                <td style={{ textAlign: lastColIndex === 3 ? 'end' : 'start', paddingRight: '2.5%' }}>
                                    {lastColIndex === 3 ? `$ ${row.col4}` : row.col4}
                                </td>
                            )}
                            {row.col5 && (
                                <td style={{ textAlign: lastColIndex === 4 ? 'end' : 'start', paddingRight: '2.5%' }}>
                                    {lastColIndex === 4 ? `$ ${row.col5}` : row.col5}
                                </td>
                            )}
                            {row.col6 && (
                                <td style={{ textAlign: lastColIndex === 5 ? 'end' : 'start', paddingRight: '2.5%' }}>
                                    {lastColIndex === 5 ? `$ ${row.col6}` : row.col6}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div className='grid-for-total'>
                <div className='box-for-total'>
                    <div className='grid-for-text'>Total:</div>
                    <div className='grid-for-number'>$ {lastColumnTotal}</div>
                </div>
            </div>
        </div>
    );
}

export default TablesComp;
