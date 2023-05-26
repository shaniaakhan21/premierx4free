import { Col, Tab, Row, Nav } from 'react-bootstrap';
import { useState } from 'react';
import './styles.css';
import AgentCustomers from '../agent-customers/AgentCustomers';
import AgentTeam from '../agent-team/AgentTeam';
import Commission from '../comission/Commission';
import AgentFooter from '../agent-footer/AgentFooter';
import AgentReport from '../agent-report/AgentReport';
import AgentSubHeader from '../agent-header/component/AgentSubHeader';
import AgentSubmitCompany from '../agent-submit-company/AgentSubmitCompany';
import AgentSettings from '../agent-settings/AgentSettings';
import MarketingMaterials from '../agent-marketing-materials/MarketingMaterials';
import AgentProfile from '../agent-profile/AgentProfile';
import User from "../../../models/user.model";
import {useMyDashboard} from "../../../services/my";
import {useAuth} from "../../../contexts/auth.context";


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

interface Props {

}

function AgentTabs(props: Props): JSX.Element {
    const [from, setFrom] = useState(new Date());
    const [to, setTo] = useState(() => {
        const date = new Date();
        date.setMonth(date.getMonth() + 1);
        return date;
    });
    const { user } = useAuth()
    const { data } = useMyDashboard(user!, from, to)
    const [showTabs, setShowTabs] = useState(false);

    const handleToggleTabs = () => {
        setShowTabs(!showTabs);
    };

    const [profile, setProfile] = useState(initialProfile);
    const handleCancel = () => {
        setProfile(initialProfile);
    };

    const handleSave = () => {
        console.log('Saving profile:', profile);
    };

    return (

        <>
            <Row className='phone-row'>
                <Col sm="2" lg="12" className='phone-logo'>
                   <a  href='/'><img className="card-img-top" src={"/assets/svg/Dashboard/logo-dash.svg"} alt="Card image cap" /></a>
                </Col>
                <Col sm="1" lg="12" className='phone-hamburger'>
                    <div>
                        <a onClick={handleToggleTabs}>
                            <img src='/assets/svg/Dashboard/hamburger.svg' alt="" />
                        </a>
                    </div>
                </Col>
            </Row>

            <Tab.Container id="left-tabs-example" defaultActiveKey="first" >
                <Row>
                    {showTabs && (
                        <Col sm={2} className='tab-contains'>
                            <AgentProfile />
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
                                <Nav.Item>
                                    <Nav.Link eventKey="sixth">
                                        <img src={'/assets/svg/Dashboard/logout.svg'} alt="logout" />
                                        <span>Logout</span>
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                    )}
                    <Col sm={2} className='tab-contains mobile-hide'>
                        <AgentProfile />
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
                    <Col sm={10} style={{ padding: 0 }}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first" className="tab-pane-first">
                                <AgentSubHeader />
                                <AgentCustomers agent={{ companies: data?.data?.directs ?? [] }} title="Direct Clients" />
                                <AgentTeam data={data?.data.referrals ?? []} title="Referral Clients" />
                                <Commission data={data?.data?.summary} title="Commission Summary" />
                            </Tab.Pane>
                            <Tab.Pane eventKey="second" className="tab-pane-second">
                                <AgentSubmitCompany />
                            </Tab.Pane>
                            <Tab.Pane eventKey="third" className="tab-pane-third">
                                {/*<AgentReport data={reportdata} spanText="Reports" col1head='Representative' col2head='Contract Status' col3head='Contract End Date' col4head='Pay Date' col5head='Company Name' col6head='Active Employees' col7head='Payment Date' col8head='Payment Amount' col9head='Level' />*/}
                            </Tab.Pane>
                            <Tab.Pane eventKey="fourth" className='tab-pane-fourth'>
                                <MarketingMaterials />
                            </Tab.Pane>
                            <Tab.Pane eventKey="fifth" className='tab-pane-fifth'>
                                <div className="container no-m-y-p">
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
                                    />
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="sixth" className='tab-pane-sixth'>
                                Logout
                            </Tab.Pane>
                        </Tab.Content>
                        <AgentFooter />
                    </Col>
                </Row>
            </Tab.Container>
        </>
    );
}

export default AgentTabs;
