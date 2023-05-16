import TablesComp from "./component/TablesComp";
import "./styles.css";
import { Tabs, Tab } from 'react-bootstrap';

type Props = {
    spanText: string;
}

const comissiondata = [
    { col1: 'Acme Corporation', col2: '2022-01-10', col3: '2023-01-12', col4: '5000', col5: '$ 1,200,000' },
    { col1: 'Vehement Capital.Inc', col2: '2022-01-10', col3: '2023-01-12', col4: '4000', col5: '$ 960,000' },
    { col1: 'Massive Dynamic.LLC', col2: '2022-01-10', col3: '2023-01-12', col4: '5000', col5: '$ 1,200,000' },
]

const comission2data = [
    { col1: 'Acme Corporation', col2: 'Agent Name A', col3: '2023-01-03', col4: '2023-01-12', col5: '$ 50 (1)', col6: '$ 1,200,000' },
    { col1: 'Vehement Capital.Inc', col2: 'Agent Name B', col3: '2023-01-03', col4: '2023-01-12', col5: '$ 50 (2)', col6: '$ 960,000' },
    { col1: 'Massive Dynamic.LLC', col2: 'Agent Name C', col3: '2023-01-03', col4: '2023-01-12', col5: '$ 50 (3)', col6: '$ 1,200,000' },
]

const Comission = ({ spanText }: Props) => {
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
                {/* <div className="tab-options">
                    <div>
                        <img src='assets/svg/Dashboard/filter.svg' />
                        <span>Filter</span>
                    </div>
                    <div className='line'></div>
                    <div>
                        <span>Sort By</span>
                        <div className="sort-arrows">
                            <img src='assets/svg/Dashboard/up-sort.svg' />
                            <img src='assets/svg/Dashboard/down-sort.svg' />
                        </div>
                    </div>
                </div> */}
            </div>

            <Tabs
                defaultActiveKey="customers"
                id="uncontrolled-tab-example"
                className="mb-3"
                onSelect={handleTabSelect}
            >
                <Tab eventKey="customers" title="Customers">
                    <div id="customers-tab-content">
                        <TablesComp data={comissiondata}  col1head= 'Company Name' col2head= 'Contact Start Date' col3head= 'Contact End Date' col4head= 'Monthly Membership paid Number (No. People)' col5head= 'Commission Due'/>
                    </div>
                </Tab>
                <Tab eventKey="refferalscustomers" title="Referral Customers">
                    <div id="customers-tab-content">
                        <TablesComp data={comission2data}  col1head= 'Company Name' col2head= 'Referral Agent' col3head= 'Contact Start Date' col4head= 'Contact End Date' col5head= 'Monthly Membership paid Number' col6head='Commission Due'/>
                    </div>
                </Tab>
            </Tabs>
        </div>
    )
}

export default Comission;