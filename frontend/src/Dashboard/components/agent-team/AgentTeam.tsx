import "./styles.css";
import { Table, Modal, Button } from 'react-bootstrap';
import { useState } from "react";
import {useMyDashboard} from "../../../services/my";
import {useAuth} from "../../../contexts/auth.context";
import AgentProfile from "../../../models/agentProfile.model";
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

const AgentTeam = ({ spanText, col1head, col2head, col3head }: Props) => {
    const { user } = useAuth()
    const { data } = useMyDashboard(user!)

    const [viewMore, setViewMore] = useState<AgentProfile | undefined>();

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
                    {data?.data.map((agent, idx) => (
                        <tr key={idx} style={{ backgroundColor: 'white' }}>
                            <td>{agent.agent.name}</td>
                            <td>{agent.commission}$</td>
                            <td >{(agent.agent.companies?.length ?? 0) > 0 ? <a onClick={() => setViewMore(agent.agent)} className="color-link">View More</a> : null}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Modal show={!!viewMore} onHide={() => setViewMore(undefined)} className='boxModal'>
                <Modal.Body>
                <AgentCustomers agent={viewMore} title="View Direct Clients " />
                </Modal.Body>
                <Modal.Footer className='modalFooter'>
                    <Button variant="secondary" onClick={() => setViewMore(undefined)} className='buttonBlue'>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AgentTeam;
