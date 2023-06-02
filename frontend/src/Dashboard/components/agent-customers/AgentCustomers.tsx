import "./styles.css";
import { Table } from 'react-bootstrap';
import { useAgentInfo } from "../../../services/agent";
import { useAuth } from "../../../contexts/auth.context";
import AgentProfile from "../../../models/agentProfile.model";

type Props = {
  title: string;
  agentUserId?: number
  agent?: AgentProfile | Pick<AgentProfile, 'companies'>,
  commission?: number
}

const AgentCustomers = ({ title, agentUserId, agent, commission }: Props) => {
  const { user } = useAuth()

  const { data: agentInfo } = useAgentInfo(user!, !agent ? (agentUserId ?? user?.userId?.toString()!) : undefined)

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
      {title ? <span className='textCustom'>{title}</span> : null}
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
        {(agent ?? agentInfo?.data.agentProfile)?.companies?.map((company, index) => (
          <tr key={index} style={{ backgroundColor: 'white' }}>
            <td>{company.name}</td>
            <td>{company.employeeCount}</td>
            <td>{commission ?? company.commissionRate}$</td>
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
