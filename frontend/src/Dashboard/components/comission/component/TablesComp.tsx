import { Table } from 'react-bootstrap';
import './styles.css';
import footer from "../../../../components/Footer";

type TableHading<T> = {
    title: string
    key?: keyof T
    renderHeading?: (key?: keyof T) => JSX.Element
    renderData?: (row: T) => JSX.Element | string | number | undefined
};

type TableCompProps<DataType> = {
    data: DataType[]
    headings: TableHading<DataType>[]
    getRowKey?: (row: DataType) => string | number
    footer?: JSX.Element
};

function TablesComp<DataType>({ data, headings, getRowKey, footer }: TableCompProps<DataType>): JSX.Element {


    return (
        <>
            <Table bordered hover responsive style={{ borderRadius: '5%' }} className='tableDesign'>
                <thead>
                    <tr style={{ backgroundColor: '#F4F6F8' }}>
                        {headings.map((heading, index) => (heading?.renderHeading ? heading.renderHeading(heading.key) : <th key={index}>{heading.title}</th>))}
                    </tr>
                </thead>
                <tbody>
                    {data?.map((row, index) => (
                        <tr key={getRowKey ? getRowKey(row) : index} style={{ backgroundColor: 'white' }}>
                            {headings.map((heading, index) => (heading?.renderData ? heading.renderData(row) : <td key={index}>{heading.key ? row[heading.key]?.toString?.() : ''}</td>))}
                        </tr>
                    ))}
                </tbody>
            </Table>
            {footer}
        </>
    );
}

export default TablesComp;
