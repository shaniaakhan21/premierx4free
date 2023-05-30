import TablesComp from "./component/TablesComp";
import "./styles.css";
import { Tabs, Tab } from 'react-bootstrap';
import Contract from "../../../models/contract.model";
import AgentProfile, {AgentProfileCompany} from "../../../models/agentProfile.model";
import {Dispatch, SetStateAction, useMemo} from "react";
import moment, {Moment} from "moment-timezone";
import {FormControl} from "@mui/material";
import {MobileDatePicker} from "@mui/x-date-pickers";

type CommissionProps = {
    title: string;
    data?: {
        referrals: Contract[],
        directs: Contract[],
    },
    from: Date,
    setFrom: Dispatch<SetStateAction<Date>>,
    to: Date,
    setTo: Dispatch<SetStateAction<Date>>,
    isLoading: boolean
}

const Commission = ({ title, data, from, setFrom, to, setTo, isLoading }: CommissionProps) => {
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

          <div className="tab-options-box">
            <FormControl>
              <MobileDatePicker<Moment>
                label="Date Range"
                value={from ? moment(from) : moment()}
                onChange={(date) => setFrom((date ?? moment())?.toDate())}
              />
            </FormControl>
            <FormControl style={{ marginLeft: 10, marginTop: 33 }}>
              <MobileDatePicker<Moment>
                value={to ? moment(to) : moment()}
                onChange={(date) => setTo((date ?? moment())?.toDate())}
              />
            </FormControl>
          </div>
            <Tabs
                defaultActiveKey="customers"
                id="uncontrolled-tab-example"
                className="mb-3"
                onSelect={handleTabSelect}
            >
                <Tab eventKey="customers" title="Direct Clients">
                    <div id="customers-tab-content">
                        <TablesComp loading={isLoading} data={data?.directs ?? []} headings={[
                          {
                              title: 'Company Name',
                              renderData: r => <td>{(r.agent as AgentProfile)?.companies?.find(c => c._id === r.company)?.name}</td>
                          }, {
                            title: 'Contract Start Date',
                            renderData: r => <td>{moment(r.start).format('YYYY-MM-DD')}</td>
                          }, {
                            title: 'Contract End Date',
                            renderData: r => <td>{moment(r.end).format('YYYY-MM-DD')}</td>
                          }, {
                            title: 'Monthly Membership paid (No. of People)',
                            renderData: r => <td>{r.employeeCount}</td>
                          }, {
                            title: 'Amount Paid Per Person',
                            renderHeading: () => <th style={{ textAlign: 'right' }}>Amount Paid Per Person</th>,
                            renderData: r => <td style={{ textAlign: 'right' }}>${r.amountPerPerson}</td>
                          }, {
                            title: 'Commission Rate',
                            renderHeading: () => <th style={{ textAlign: 'right' }}>Commission Rate</th>,
                            renderData: r => <td style={{ textAlign: 'right' }}>{r.commissionRate}</td>
                          }, {
                            title: 'Total Pay',
                            renderHeading: () => <th style={{ textAlign: 'right' }}>Total Pay</th>,
                            renderData: r => <td style={{ textAlign: 'right' }}>${r.commissionRate * r.employeeCount * r.amountPerPerson}</td>
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
                    <div id="customers-tab-content">
                        <TablesComp loading={isLoading} data={data?.referrals ?? []} headings={[
                            {
                                title: 'Company Name',
                                renderData: r => <td>{(r.agent as AgentProfile)?.companies?.find(c => c._id === r.company)?.name}</td>
                            }, {
                                title: 'Referral Agent',
                                renderData: r => <td>{(r.agent as AgentProfile)?.name}</td>
                            }, {
                                title: 'Contract Start Date',
                                renderData: r => <td>{moment(r.start).format('YYYY-MM-DD')}</td>
                            }, {
                                title: 'Contract End Date',
                                renderData: r => <td>{moment(r.end).format('YYYY-MM-DD')}</td>
                            }, {
                                title: 'Monthly Membership paid (No. of People)',
                                renderData: r => <td>{r.employeeCount}</td>
                            }, {
                                title: 'Amount Paid Per Person',
                                renderHeading: () => <th style={{ textAlign: 'right' }}>Amount Paid Per Person</th>,
                                renderData: r => <td style={{ textAlign: 'right' }}>${r.amountPerPerson}</td>
                            }, {
                                title: 'Commission Rate',
                                renderHeading: () => <th style={{ textAlign: 'right' }}>Commission Rate</th>,
                                renderData: r => <td style={{ textAlign: 'right' }}>{r.commissionRate}</td>
                            }, {
                                title: 'Total Pay',
                                renderHeading: () => <th style={{ textAlign: 'right' }}>Total Pay</th>,
                                renderData: r => <td style={{ textAlign: 'right' }}>${r.commissionRate * r.employeeCount * r.amountPerPerson}</td>
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
                    <div id="customers-tab-content">
                      <TablesComp loading={isLoading} data={directTotal && referralTotal ? [{ client: 'Direct', commission: `$${directTotal}` }, { client: 'Referral', commission: `$${referralTotal}` }] : []} headings={[
                        {
                          title: 'Clients',
                          key: 'client'
                        }, {
                          title: 'Commission',
                          renderHeading: () => <th style={{ textAlign: 'right' }}>Commission</th>,
                          renderData: r => <td style={{ textAlign: 'right' }}>{r.commission}</td>
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
