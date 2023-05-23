import "./styles.css";
import { Table } from 'react-bootstrap';
import {useAgentInfo} from "../../../services/agent";
import {useAuth} from "../../../contexts/auth.context";

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
    const { user } = useAuth()

    const { data: agentInfo } = useAgentInfo(user!, user?.userId!)

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "Active":
                return <img src="assets/svg/Dashboard/approve.svg" className="Approved-icon" alt="Active" />;
            case "Rejected":
                return <img src="assets/svg/Dashboard/rejected.svg" className="Rejected-icon" alt="Rejected" />;
            case "Pending":
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
                        <th>Company Name</th>
                        <th>Number of Employees / Members</th>
                        <th>Commission Rate</th>
                        <th>Status (Active / Pending)</th>
                        <th>Comments</th>
                    </tr>
                </thead>
                <tbody>
                    {agentInfo?.data.agentProfile?.companies?.map((company, index) => (
                    <tr key={index} style={{ backgroundColor: 'white' }}>
                        <td>{company.name}</td>
                        <td>{company.employeeCount}</td>
                        <td>{company.commissionRate}</td>
                        <td></td>
                        <td></td>
                    </tr>
                    ))}
                </tbody>
            </Table>
		</div>
	)
}

export default AgentCustomers
