import { Table } from 'react-bootstrap';
import './styles.css';
import { Skeleton } from "@mui/material";

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
  loading?: boolean
};

function TablesComp<DataType>({ data, headings, getRowKey, footer, loading }: TableCompProps<DataType>): JSX.Element {


  return (
    <>
      <Table bordered hover responsive style={{ borderRadius: '5%' }} className='tableDesign'>
        <thead>
        <tr style={{ backgroundColor: '#F4F6F8' }}>
          {headings.map((heading, index) => (heading?.renderHeading ? heading.renderHeading(heading.key) :
            <th key={index}>{heading.title}</th>))}
        </tr>
        </thead>
        <tbody>
        {loading
          ? [...Array(8).keys()].map((k) => <tr>{headings.map((_, k2) => <td><Skeleton key={`${k}_${k2}`} height={20}
                                                                                       width='100%' /></td>)}</tr>)
          : data?.map((row, index) => (
            <tr key={getRowKey ? getRowKey(row) : index} style={{ backgroundColor: 'white' }}>
              {headings.map((heading, index2) => (heading?.renderData ? heading.renderData(row) :
                <td key={`${index}_${index2}`}>{heading.key ? row[heading.key]?.toString?.() : ''}</td>))}
            </tr>
          ))}
        </tbody>
      </Table>
      {footer}
    </>
  );
}

export default TablesComp;
