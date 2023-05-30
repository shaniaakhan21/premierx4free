import TablesComp from "./component/TablesComp";
import "./styles.css";
import { Tabs, Tab } from 'react-bootstrap';
import { useAuth } from "../../../contexts/auth.context";
import AgentProfile from "../../../models/agentProfile.model";
import {useAgentInfo} from "../../../services/agent";

type Props = {
    spanText: string;
    agentUserId?: number
    agent?: AgentProfile,
    commission?: number
}
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

// const comissiondata = [
//     { col1: 'Acme Corporation', col2: '2022-01-10', col3: '2023-01-12', col4: 120, col5:5, col6: 1000},
//     { col1: 'Vehement Capital.Inc', col2: '2022-01-10', col3: '2023-01-12', col4: 500, col5:4, col6: 3000 },
//     { col1: 'Massive Dynamic.LLC', col2: '2022-01-10', col3: '2023-01-12', col4: 1000, col5:3, col6: 3000}
// ]



const comission2data = [
    { col1: 'Acme Corporation', col2: 'Agent Name A', col3: '2023-01-03', col4: '2023-01-12', col5: 110, col6:5, col7: 550 },
    { col1: 'Vehement Capital.Inc', col2: 'Agent Name B', col3: '2023-01-03', col4: '2023-01-12', col5: 500, col6:5, col7: 10000 },
    { col1: 'Massive Dynamic.LLC', col2: 'Agent Name C', col3: '2023-01-03', col4: '2023-01-12', col5:100, col6:5, col7: 4000 },
]

const comission3data = [
    { col1: 'Direct', col2: 2052 },
    { col1: 'Referrals ', col2: 303650 },
]

const Comission = ({ spanText,agent,agentUserId,commission }: Props) => {
    console.log("in comission data")
    const { user } = useAuth()

    const { data: agentInfo } = useAgentInfo(user!, !agent ? (agentUserId ?? user?.userId?.toString()!) : undefined)

    console.log("data from commision",agent ?? agentInfo?.data.agentProfile)

    const comissiondata = () => {
        let comData: any [] = []; 
        (agent ?? agentInfo?.data.agentProfile)?.companies?.map((comp) => {
            comData.push({
                col1:comp.name,
                col2:comp.contractStartDate ? comp.contractStartDate:"-",
                col3:comp.contractEndDate ? comp.contractEndDate:"-",
                col4:comp.employeeCount,
                col5:comp.commissionRate,
                col6:1
            })
        })
        return comData
    }

    console.log("comisndgt",comissiondata())

    const handleTabSelect = (key: string | null) => {
        if (key) {
            const tabContent = document.querySelector(`#${key}`);
            if (tabContent) {
                tabContent.scrollIntoView({ behavior: "smooth" });
            }
        }
    }
    return (
        <div className="box-main-commission">
            <div className="box-it">
                <span className='textCustom'>{spanText}</span>
            </div>
            <Tabs
                defaultActiveKey="customers"
                id="uncontrolled-tab-example"
                className="mb-3"
                onSelect={handleTabSelect}
            >
                <Tab eventKey="customers" title="Direct Clients">
                    <div className="tab-options-box">
                        <div className="tab-options">
                            <img src='assets/svg/Dashboard/calender.svg' />
                            <span>Monthly Calendar</span>
                        </div>
                    </div>
                    <div id="customers-tab-content">
                        <TablesComp data={comissiondata()} col1head='Company Name' col2head='Contract Start Date' col3head='Contract End Date' col4head='Monthly Membership paid (No. of People)' col5head='Amount Paid Per Person' col6head='Total Pay' />
                    </div>
                </Tab>
                <Tab eventKey="refferalscustomers" title="Referral Clients">
                    <div className="tab-options-box">
                        <div className="tab-options">
                            <img src='assets/svg/Dashboard/calender.svg' />
                            <span>Monthly Calendar</span>
                        </div>
                    </div>
                    <div id="customers-tab-content">
                        <TablesComp data={comission2data} col1head='Company Name' col2head='Referral Agent' col3head='Contract Start Date' col4head='Contract End Date' col5head='Monthly Membership paid (No. of People)' col6head='Amount Paid Per Person' col7head='Total Pay' />
                    </div>
                </Tab>
                <Tab eventKey="summary" title="Summary">
                    <div className="tab-options-box">
                        <div className="tab-options">
                            <img src='assets/svg/Dashboard/calender.svg' />
                            <span>Monthly Calendar</span>
                        </div>
                    </div>
                    <div id="customers-tab-content">
                        <TablesComp data={comission3data} col1head='Clients' col2head='Commission Due' />
                    </div>
                </Tab>
            </Tabs>
        </div>
    )
}

export default Comission;