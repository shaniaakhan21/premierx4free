import TablesComp from "./component/TablesComp";
import "./styles.css";
import { Tabs, Tab } from 'react-bootstrap';
import Contract from "../../../models/contract.model";
import AgentProfile, {AgentProfileCompany} from "../../../models/agentProfile.model";
//import {JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useMemo} from "react";
import moment from "moment-timezone";

type CommissionProps = {
    title: string;
    data?: {
        referrals: Contract[],
        directs: Contract[],
    }
}

const comissiondata = [
    { col1: 'Acme Corporation', col2: '2022-01-10', col3: '2023-01-12', col4: 120, col5:5, col6: 1000},
    { col1: 'Vehement Capital.Inc', col2: '2022-01-10', col3: '2023-01-12', col4: 500, col5:4, col6: 3000 },
    { col1: 'Massive Dynamic.LLC', col2: '2022-01-10', col3: '2023-01-12', col4: 1000, col5:3, col6: 3000}
]

const comission2data = [
    { col1: 'Acme Corporation', col2: 'Agent Name A', col3: '2023-01-03', col4: '2023-01-12', col5: 110, col6:5, col7: 550 },
    { col1: 'Vehement Capital.Inc', col2: 'Agent Name B', col3: '2023-01-03', col4: '2023-01-12', col5: 500, col6:5, col7: 10000 },
    { col1: 'Massive Dynamic.LLC', col2: 'Agent Name C', col3: '2023-01-03', col4: '2023-01-12', col5:100, col6:5, col7: 4000 },
]

const comission3data = [
    { col1: 'Direct', col2: 2052 },
    { col1: 'Referrals ', col2: 303650 },
]

const Commission = ({ title, data }: CommissionProps) => {
    const handleTabSelect = (key: string | null) => {
        if (key) {
            const tabContent = document.querySelector(`#${key}`);
            if (tabContent) {
                tabContent.scrollIntoView({ behavior: "smooth" });
            }
        }
    }

    const directTotal = useMemo(() => data?.directs?.reduce<number>((a, c) => a + (c.employeeCount * c.commissionRate * c.amountPerPerson), 0), [data?.directs])

    const referralTotal = useMemo(() => data?.referrals?.reduce<number>((a, c) => a + (c.employeeCount * c.commissionRate * c.amountPerPerson), 0), [data?.referrals])

    return (
        <div className="box-main-commission">
            <div className="box-it">
                <span className='textCustom'>{title}</span>
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
                        <TablesComp data={data?.directs ?? []} headings={[
                          {
                              title: 'Company Name',
                              renderData: (r: { agent: AgentProfile; company: string | undefined; }) => <td>{(r.agent as AgentProfile)?.companies?.find(c => c._id === r.company)?.name}</td>
                          }, {
                            title: 'Contract Start Date',
                            renderData: (r: { start: moment.MomentInput; }) => <td>{moment(r.start).format('YYYY-MM-DD')}</td>
                          }, {
                            title: 'Contract End Date',
                            renderData: (r: { end: moment.MomentInput; }) => <td>{moment(r.end).format('YYYY-MM-DD')}</td>
                          }, {
                            title: 'Monthly Membership paid (No. of People)',
                            renderData: (r: { employeeCount: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }) => <td>{r.employeeCount}</td>
                          }, {
                            title: 'Amount Paid Per Person',
                            renderHeading: () => <th style={{ textAlign: 'right' }}>Amount Paid Per Person</th>,
                            renderData: (r: { amountPerPerson: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }) => <td style={{ textAlign: 'right' }}>${r.amountPerPerson}</td>
                          }, {
                            title: 'Commission Rate',
                            renderHeading: () => <th style={{ textAlign: 'right' }}>Commission Rate</th>,
                            renderData: (r: { commissionRate: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }) => <td style={{ textAlign: 'right' }}>{r.commissionRate}</td>
                          }, {
                            title: 'Total Pay',
                            renderHeading: () => <th style={{ textAlign: 'right' }}>Total Pay</th>,
                            renderData: (r: { commissionRate: number; employeeCount: number; amountPerPerson: number; }) => <td style={{ textAlign: 'right' }}>${r.commissionRate * r.employeeCount * r.amountPerPerson}</td>
                          }
                        ]} footer={<div className='grid-for-total'>
                                <div className='box-for-total'>
                                    <div className='grid-for-text'>Total:</div>
                                    <div className='grid-for-number'>${directTotal}</div>
                                </div>
                            </div>}
                        />
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
                        <TablesComp data={data?.referrals ?? []} headings={[
                            {
                                title: 'Company Name',
                                renderData: (r: { agent: AgentProfile; company: string | undefined; }) => <td>{(r.agent as AgentProfile)?.companies?.find(c => c._id === r.company)?.name}</td>
                            }, {
                                title: 'Referral Agent',
                                renderData: (r: { agent: AgentProfile; }) => <td>{(r.agent as AgentProfile)?.name}</td>
                            }, {
                                title: 'Contract Start Date',
                                renderData: (r: { start: moment.MomentInput; }) => <td>{moment(r.start).format('YYYY-MM-DD')}</td>
                            }, {
                                title: 'Contract End Date',
                                renderData: (r: { end: moment.MomentInput; }) => <td>{moment(r.end).format('YYYY-MM-DD')}</td>
                            }, {
                                title: 'Monthly Membership paid (No. of People)',
                                renderData: (r: { employeeCount: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }) => <td>{r.employeeCount}</td>
                            }, {
                                title: 'Amount Paid Per Person',
                                renderHeading: () => <th style={{ textAlign: 'right' }}>Amount Paid Per Person</th>,
                                renderData: (r: { amountPerPerson: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }) => <td style={{ textAlign: 'right' }}>${r.amountPerPerson}</td>
                            }, {
                                title: 'Commission Rate',
                                renderHeading: () => <th style={{ textAlign: 'right' }}>Commission Rate</th>,
                                renderData: (r: { commissionRate: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }) => <td style={{ textAlign: 'right' }}>{r.commissionRate}</td>
                            }, {
                                title: 'Total Pay',
                                renderHeading: () => <th style={{ textAlign: 'right' }}>Total Pay</th>,
                                renderData: (r: { commissionRate: number; employeeCount: number; amountPerPerson: number; }) => <td style={{ textAlign: 'right' }}>${r.commissionRate * r.employeeCount * r.amountPerPerson}</td>
                            }
                        ]} footer={<div className='grid-for-total'>
                            <div className='box-for-total'>
                                <div className='grid-for-text'>Total:</div>
                                <div className='grid-for-number'>${referralTotal}</div>
                            </div>
                        </div>}
                        />
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
                      <TablesComp data={directTotal && referralTotal ? [{ client: 'Direct', commission: `$${directTotal}` }, { client: 'Referral', commission: `$${referralTotal}` }] : []} headings={[
                        {
                          title: 'Clients',
                          key: 'client'
                        }, {
                          title: 'Commission',
                          renderHeading: () => <th style={{ textAlign: 'right' }}>Commission</th>,
                          renderData: (r: { commission: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }) => <td style={{ textAlign: 'right' }}>{r.commission}</td>
                        }
                      ]} footer={<div className='grid-for-total'>
                        <div className='box-for-total'>
                          <div className='grid-for-text'>Total:</div>
                          <div className='grid-for-number'>${(referralTotal ?? 0) + (directTotal ?? 0)}</div>
                        </div>
                      </div>}
                      />
                    </div>
                </Tab>
            </Tabs>
        </div>
    )
}

export default Commission;
