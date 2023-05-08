import TablesComp from "./component/TableComp";
import "./styles.css";
import { Tabs, Tab } from 'react-bootstrap';

type Props = {
    spanText: string;
}

const networkdata = [
    { col1: 'Level 1', col2: 'John Smith', col3: 'Active', col4: '2023-01-12' },
    { col1: 'Level 1', col2: 'William Oliver', col3: 'Inactive', col4: '2023-01-12' },
    { col1: 'Level 2', col2: 'Benjamin Lucas', col3: 'Active', col4: '2023-01-12' },
    { col1: 'Level 3', col2: 'Benjamin Lucas', col3: 'Inactive', col4: '2023-01-12' },
    { col1: 'Level 3', col2: 'Benjamin Lucas', col3: 'Active', col4: '2023-01-12' }
]

const AgentNetwork = ({ spanText }: Props) => {
    const handleTabSelect = (key: string | null) => {
        if (key) {
            const tabContent = document.querySelector(`#${key}`);
            if (tabContent) {
                tabContent.scrollIntoView({ behavior: "smooth" });
            }
        }
    }

    return (
        <div className="box-main-network">
            <span className='textCustom'>{spanText}</span>
            <Tabs
                defaultActiveKey="directrefferals"
                id="uncontrolled-tab-example"
                className="mb-3"
                onSelect={handleTabSelect}
            >
                <Tab eventKey="directrefferals" title="My Direct Referrals">
                    <div id="directrefferals-tab-content">
                        <TablesComp data={networkdata} col1head='Level' col2head='Representative Name' col3head='Contact Status' col4head='Pay Date ' />
                    </div>
                </Tab>
                <Tab eventKey="indirectrefferals" title="My Indirect Referrals">
                    <div id="indirectrefferals-tab-content">
                        <TablesComp data={networkdata} col1head='Level' col2head='Representative Name' col3head='Contact Status' col4head='Pay Date ' />
                    </div>
                </Tab>
            </Tabs>
        </div>
    )
}

export default AgentNetwork;