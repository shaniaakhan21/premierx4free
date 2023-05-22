import { Table } from 'react-bootstrap';
import './styles.css';

type TableData = {
    col1?: string | number;
    col2?: string | number;
    col3?: string | number;
    col4?: string | number;
    col5?: string | number;
    col6?: string | number;
    col7?: string | number;
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
    col7head?: string | number;
};

function TablesComp({ data, col1head, col2head, col3head, col4head, col5head, col6head, col7head }: Props): JSX.Element {
    const numCols = Math.max(...data.map(row => Object.keys(row).length));
    const lastColIndex = numCols - 1;
    const SeclastColIndex = numCols - 2;
    const lastColumnTotal = data.reduce((total, row) => {
        const fifthCol = row[`col${lastColIndex - 1}`] as string | number | undefined;
        const sixthCol = row[`col${lastColIndex}`] as string | number | undefined;
        if (fifthCol && sixthCol && typeof fifthCol === 'number' && typeof sixthCol === 'number') {
            return total + (fifthCol * sixthCol);
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
                            <th style={{ textAlign: lastColIndex === 1 ? 'end' : 'start' }}>
                                {col2head}
                            </th>
                        )}
                        {col3head && (
                            <th style={{ textAlign: lastColIndex === 2 ? 'end' : 'start' }}>
                                {col3head}
                            </th>
                        )}
                        {col4head && (
                            <th style={{ textAlign: lastColIndex === 3 ? 'end' : 'start' }}>
                                {col4head}
                            </th>
                        )}
                        {col5head && (
                            <th style={{ textAlign: lastColIndex === 4 ? 'end' : 'start' }}>
                                {col5head}
                            </th>
                        )}
                        {col6head && (
                            <th style={{ textAlign: lastColIndex === 5 ? 'end' : 'start' }}>
                                {col6head}
                            </th>
                        )}
                        {col7head && (
                            <th style={{ textAlign: lastColIndex === 6 ? 'end' : 'start' }}>
                                {col7head}
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index} style={{ backgroundColor: 'white' }}>
                            {row.col1 && <td>{row.col1}</td>}
                            {row.col2 && (
                                <td style={{ textAlign: lastColIndex === 1 ? 'end' : 'start' }}>
                                    {lastColIndex === 1 || SeclastColIndex === 1 ? `$ ${row.col2}` : row.col2}
                                </td>
                            )}
                            {row.col3 && (
                                <td style={{ textAlign: lastColIndex === 2 ? 'end' : 'start' }}>
                                    {lastColIndex === 2 || SeclastColIndex === 2 ? `$ ${row.col3}` : row.col3}
                                </td>
                            )}
                            {row.col4 && (
                                <td style={{ textAlign: lastColIndex === 3 ? 'end' : 'start' }}>
                                    {lastColIndex === 3 || SeclastColIndex === 3 ? `$ ${row.col4}` : row.col4}
                                </td>
                            )}
                            {row.col5 && (
                                <td style={{ textAlign: lastColIndex === 4 ? 'end' : 'start' }}>
                                    {lastColIndex === 4 || SeclastColIndex === 4 ? `$ ${row.col5}` : row.col5}
                                </td>
                            )}
                            {row.col6 && (
                                <td style={{ textAlign: lastColIndex === 5 ? 'end' : 'start' }}>
                                    {lastColIndex === 5 ? `$ ${Number(row.col4) * Number(row.col5)}` : SeclastColIndex === 5 ? `$ ${row.col6}` : row.col6}
                                </td>
                            )}
                            {row.col7 && (
                                <td style={{ textAlign: lastColIndex === 6 ? 'end' : 'start' }}>
                                    {lastColIndex === 6 ? `$ ${Number(row.col5) * Number(row.col6)}` : SeclastColIndex === 5 ? `$ ${row.col7}` : row.col7}
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
