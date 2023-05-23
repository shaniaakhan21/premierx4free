import "./styles.css";
import { Table, Modal, Button } from 'react-bootstrap';
import { useState } from "react";
import AgentCustomers from "../agent-customers/AgentCustomers";

type TableData = {
    col1: string;
    col2: string;
    col3: string;
}

type Props = {
    data: TableData[];
    spanText: string;
    col1head: string;
    col2head: string;
    col3head: string;
}

const AgentTeam = ({ data, spanText, col1head, col2head, col3head }: Props) => {
    const hydata = [
        { col1: 'Acme Corporation', col2: '50', col3: '$ 500', col4: 'Active', col5: 'Lorem Ipsum is simply dummy text of the printing ...' },
        { col1: 'Vehement Capital.Inc', col2: '50', col3: '$ 500', col4: 'Pending', col5: 'Lorem Ipsum is simply dummy text of the printing ...' },
        { col1: 'Massive Dynamic.LLC', col2: '50', col3: '$ 400', col4: 'Pending', col5: 'Lorem Ipsum is simply dummy text of the printing ...' },
    ]
    const [showPopup, setShowPopup] = useState(false);

    const handleClick = () => {
        setShowPopup(true);
    };

    const handleCancel = () => {
        setShowPopup(false);
    };


    return (
        <div className="box-main team-box">
            <span className='textCustom'>{spanText}</span>
            <Table bordered hover responsive style={{ borderRadius: '5%' }} className='tableDesign'>
                <thead>
                    <tr style={{ backgroundColor: '#F4F6F8' }}>
                        <th>{col1head}</th>
                        <th>{col2head}</th>
                        <th>{col3head}</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index} style={{ backgroundColor: 'white' }}>
                            <td>{row.col1}</td>
                            <td>{row.col2}</td>
                            <td ><a onClick={handleClick} className="color-link">{row.col3}</a></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Modal show={showPopup} onHide={handleCancel} className='boxModal'>
                <Modal.Body>
                <AgentCustomers data={hydata} col1head='Company Name' col2head='Number of Employees /Members' col3head='Commission Rate' col4head='Status (Active/Pending)' col5head='Comments' spanText="View Direct Clients " />
                </Modal.Body>
                <Modal.Footer className='modalFooter'>
                    <Button variant="secondary" onClick={handleCancel} className='buttonBlue'>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AgentTeam;