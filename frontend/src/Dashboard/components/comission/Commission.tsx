import TablesComp from "./component/TablesComp";
import "./styles.css";
import { Tab, Tabs } from 'react-bootstrap';
import Contract from "../../../models/contract.model";
import AgentProfile from "../../../models/agentProfile.model";
import { Dispatch, SetStateAction, useMemo } from "react";
import moment, { Moment } from "moment-timezone";
import { FormControl } from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers";

type CommissionProps = {
  title: string;
  data?: {
    referrals: (Contract & { level: number })[],
    directs: (Contract & { level: number })[],
  },
  from: Date,
  setFrom: Dispatch<SetStateAction<Date>>,
  to: Date,
  setTo: Dispatch<SetStateAction<Date>>
  isLoading?: boolean;
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

  const directTotal = useMemo(() => data?.directs?.reduce<number>((a, c) => a + (c.employeeCount * c.commissionRates?.[0]), 0), [data?.directs])

  const referralTotal = useMemo(() => data?.referrals?.reduce<number>((a, c) => a + (c.employeeCount * c.commissionRates?.[c.level]), 0), [data?.referrals])

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
            <TablesComp data={data?.directs ?? []} headings={[
              {
                title: 'Company Name',
                renderData: r => <td>{(r.agent as AgentProfile)?.companies?.find(c => c._id === r.company)?.name}</td>
              }, {
                title: 'Contract Start Date',
                renderHeading: () => <th style={{ textAlign: 'center' }}>Contract Start Date</th>,
                renderData: r => <td style={{ textAlign: 'center' }}>{moment(r.start).format('YYYY-MM-DD')}</td>
              }, {
                title: 'Contract End Date',
                renderHeading: () => <th style={{ textAlign: 'center' }}>Contract End Date</th>,
                renderData: r => <td style={{ textAlign: 'center' }}>{moment(r.end).format('YYYY-MM-DD')}</td>
              }, {
                title: 'Monthly Membership paid (No. of People)',
                renderHeading: () => <th style={{ textAlign: 'right' }}>Monthly Membership paid (No. of People)</th>,
                renderData: r => <td style={{ textAlign: 'right' }}>{r.employeeCount}</td>
              }, {
                title: 'Amount Paid Per Person',
                renderHeading: () => <th style={{ textAlign: 'right' }}>Amount Paid Per Person</th>,
                renderData: r => <td style={{ textAlign: 'right' }}>${r.amountPerPerson}</td>
              }, {
                title: 'Commission Rate',
                renderHeading: () => <th style={{ textAlign: 'right' }}>Commission Rate</th>,
                renderData: r => <td style={{ textAlign: 'right' }}>${r.commissionRates?.[0]}</td>
              }, {
                title: 'Total Pay',
                renderHeading: () => <th style={{ textAlign: 'right' }}>Total Pay</th>,
                renderData: r => <td
                  style={{ textAlign: 'right' }}>${r.commissionRates?.[0] * r.employeeCount}</td>
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
                renderHeading: () => <th style={{ textAlign: 'center' }}>Contract Start Date</th>,
                renderData: r => <td style={{ textAlign: 'center' }}>{moment(r.start).format('YYYY-MM-DD')}</td>
              }, {
                title: 'Contract End Date',
                renderHeading: () => <th style={{ textAlign: 'center' }}>Contract End Date</th>,
                renderData: r => <td style={{ textAlign: 'center' }}>{moment(r.end).format('YYYY-MM-DD')}</td>
              }, {
                title: 'Monthly Membership paid (No. of People)',
                renderHeading: () => <th style={{ textAlign: 'right' }}>Monthly Membership paid (No. of People)</th>,
                renderData: r => <td style={{ textAlign: 'right' }}>{r.employeeCount}</td>
              }, {
                title: 'Amount Paid Per Person',
                renderHeading: () => <th style={{ textAlign: 'right' }}>Amount Paid Per Person</th>,
                renderData: r => <td style={{ textAlign: 'right' }}>${r.amountPerPerson}</td>
              }, {
                title: 'Commission Rate',
                renderHeading: () => <th style={{ textAlign: 'right' }}>Commission Rate</th>,
                renderData: r => <td style={{ textAlign: 'right' }}>${r?.commissionRates?.[r.level]}</td>
              }, {
                title: 'Total Pay',
                renderHeading: () => <th style={{ textAlign: 'right' }}>Total Pay</th>,
                renderData: r => <td
                  style={{ textAlign: 'right' }}>${r?.commissionRates?.[r.level] * r.employeeCount}</td>
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
            <TablesComp data={directTotal && referralTotal ? [{
              client: 'Direct',
              commission: `$${directTotal}`
            }, { client: 'Referral', commission: `$${referralTotal}` }] : []} headings={[
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
