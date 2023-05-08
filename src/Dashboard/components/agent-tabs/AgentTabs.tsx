import { Col, Tab, Row, Nav } from 'react-bootstrap';
import { useState } from 'react';
import './styles.css';
import AgentCustomers from '../agent-customers/AgentCustomers';
import AgentTeam from '../agent-team/AgentTeam';
import AgentNetwork from '../agent-network/AgentNetwork';
import Comission from '../comission/Comission';
import AgentFooter from '../agent-footer/AgentFooter';
import AgentReport from '../agent-report/AgentReport';
import AgentSubHeader from '../agent-header/component/AgentSubHeader';
import AgentSubmitCompany from '../agent-submit-company/AgentSubmitCompany';
import AgentSettings from '../agent-settings/AgentSettings';


const initialProfile = {
    imageUrl: '/assets/svg/Dashboard/dummy.svg',
    fullName: 'John Doe',
    email: 'johndoe@example.com',
    phone: '123-456-7890',
    zip: '12345',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
};


function AgentTabs(): JSX.Element {
    const data = [
        { col1: 'Acme Corporation', col2: '50', col3: '500', col4: 'Approved', col5: 'Lorem Ipsum is simply dummy text of the printing ...' },
        { col1: 'Vehement Capital.Inc', col2: '50', col3: '500', col4: 'Rejected', col5: 'Lorem Ipsum is simply dummy text of the printing ...' },
        { col1: 'Massive Dynamic.LLC', col2: '50', col3: '500', col4: 'Pending', col5: 'Lorem Ipsum is simply dummy text of the printing ...' },
    ]

    const teamdata = [
        { col1: 'Level 1', col2: 'John Smith', col3: '5', col4: 'View More' },
        { col1: 'Level 1', col2: 'William Oliver', col3: '3', col4: 'View More' },
        { col1: 'Level 2', col2: 'Benjamin Lucas', col3: '8', col4: 'View More' },
        { col1: 'Level 3', col2: 'Benjamin Lucas', col3: '12', col4: 'View More' },
        { col1: 'Level 3', col2: 'Benjamin Lucas', col3: '10', col4: 'View More' }
    ]

    const reportdata = [
        { col1: 'John Smith', col2: 'Active', col3: '2023-04-30', col4: '2023-04-30', col5: 'Acme Corporation', col6: '10', col7: '2023-04-30', col8: '$ 1,200,000', col9: 'Level 1' },
        { col1: 'John Smith', col2: 'Inactive', col3: '2023-04-30', col4: '2023-04-30', col5: 'Acme Corporation', col6: '10', col7: '2023-04-30', col8: '$ 1,200,000', col9: 'Level 1' },
        { col1: 'John Smith', col2: 'Inactive', col3: '2023-04-30', col4: '2023-04-30', col5: 'Acme Corporation', col6: '10', col7: '2023-04-30', col8: '$ 1,200,000', col9: 'Level 2' },
        { col1: 'John Smith', col2: 'Active', col3: '2023-04-30', col4: '2023-04-30', col5: 'Acme Corporation', col6: '10', col7: '2023-04-30', col8: '$ 1,200,000', col9: 'Level 3' },
        { col1: 'John Smith', col2: 'Active', col3: '2023-04-30', col4: '2023-04-30', col5: 'Acme Corporation', col6: '10', col7: '2023-04-30', col8: '$ 1,200,000', col9: 'Level 3' },
    ]

    const [profile, setProfile] = useState(initialProfile);
    const handleCancel = () => {
        setProfile(initialProfile);
    };

    const handleSave = () => {
        console.log('Saving profile:', profile);
        // You can send a request to update the profile here
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        setProfile((prevProfile) => ({ ...prevProfile, [id]: value }));
    };

    return (
        <Tab.Container id="left-tabs-example" defaultActiveKey="first" >
            <Row>
                <Col sm={2} className='tab-contains'>
                    <Nav variant="pills" className="flex-column" >
                        <Nav.Item>
                            <Nav.Link eventKey="first">
                                <img src={"/assets/svg/Dashboard/dashboard-icon.svg"} alt="dashboard" />
                                <span>Dashboard</span>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="second">
                                <img src={"/assets/svg/Dashboard/submit-icon.svg"} alt="submit" />
                                <span>Submit Company</span>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="third">
                                <img src={"/assets/svg/Dashboard/report-icon.svg"} alt="report" />
                                <span>Report</span>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="fourth">
                                <img src={"/assets/svg/Dashboard/marketing-icon.svg"} alt="Marketing Materials" />
                                <span>Marketing Materials</span>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="fifth">
                                <img src={"/assets/svg/Dashboard/setting-icon.svg"} alt="setting" />
                                <span>Settings</span>
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col sm={10} style={{ paddingRight: 0 }}>
                    <Tab.Content>
                        <Tab.Pane eventKey="first" className="tab-pane-first">
                            <AgentSubHeader />
                            <AgentCustomers data={data} col1head='Company Name' col2head='Employers Number' col3head='Payment' col4head='Approval Status' col5head='Comments' spanText="My Personal Customers" />
                            <AgentTeam data={teamdata} col1head='Level' col2head='Customer Name' col3head='Companies Number' col4head='View Personal Customers List ' spanText="My Teams" />
                            <AgentNetwork spanText="My Network" />
                            <Comission spanText="Commission Summary" />
                        </Tab.Pane>
                        <Tab.Pane eventKey="second" className="tab-pane-second">
                            <AgentSubmitCompany />
                        </Tab.Pane>
                        <Tab.Pane eventKey="third" className="tab-pane-third">
                            <AgentReport data={reportdata} spanText="Reports" col1head='Representative' col2head='Contract Status' col3head='Contract End Date' col4head='Pay Date' col5head='Company Name' col6head='Active Employees' col7head='Payment Date' col8head='Payment Amount' col9head='Level' />
                        </Tab.Pane>
                        <Tab.Pane eventKey="fourth">
                            <h1>Hey!</h1>
                        </Tab.Pane>
                        <Tab.Pane eventKey="fifth" className='tab-pane-fifth'>
                            <div className="container mt-4">
                                <AgentSettings
                                    imageUrl={profile.imageUrl}
                                    fullName={profile.fullName}
                                    email={profile.email}
                                    phone={profile.phone}
                                    zip={profile.zip}
                                    currentPassword={profile.currentPassword}
                                    newPassword={profile.newPassword}
                                    confirmNewPassword={profile.confirmNewPassword}
                                    onCancel={handleCancel}
                                    onSave={handleSave}
                                    onChange={handleChange}
                                />
                            </div>
                        </Tab.Pane>
                    </Tab.Content>
                    <AgentFooter />
                </Col>
            </Row>
        </Tab.Container>
    );
}

export default AgentTabs;