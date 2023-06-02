import "./styles.css";
import { Button, Modal, Table } from 'react-bootstrap';
import { useState } from "react";
import AgentCustomers from "../agent-customers/AgentCustomers";
import { ReferralClient } from "../../../services/my";

type Props = {
  title: string;
  data: ReferralClient[]
}

const AgentTeam = ({ title, data }: Props) => {
  const [viewMore, setViewMore] = useState<ReferralClient | undefined>();

  return (
    <div className="box-main team-box">
      <span className='textCustom'>{title}</span>
      <Table bordered hover responsive style={{ borderRadius: '5%' }} className='tableDesign'>
        <thead>
        <tr style={{ backgroundColor: '#F4F6F8' }}>
          <th>Representative Name</th>
          <th>Commission Rate</th>
          <th>View Client List</th>
        </tr>
        </thead>
        <tbody>
        {data?.map((agent, idx) => (
          <tr key={idx} style={{ backgroundColor: 'white' }}>
            <td>{agent.agent.name}</td>
            <td>{(agent.commission) * (agent.agent.companies?.length ?? 0)}$</td>
            <td>{(agent.agent.companies?.length ?? 0) > 0 ?
              <a onClick={() => setViewMore(agent)} className="color-link">View More</a> : null}</td>
          </tr>
        ))}
        </tbody>
      </Table>
      <Modal show={!!viewMore} onHide={() => setViewMore(undefined)} className='boxModal'>
        <Modal.Body>
          <AgentCustomers agent={viewMore?.agent} commission={viewMore?.commission} title="View Direct Clients " />
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
