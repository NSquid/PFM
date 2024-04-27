import React, { useState, useEffect } from 'react';
import getTotalClass from './totalClass';

function Dashboard() {
    const [income, setIncome] = useState(0);
    const [outcome, setOutcome] = useState(0);
    const [total, setTotal] = useState(0);
    const [financeType, setFinanceType] = useState('income');
    const [financeAmount, setFinanceAmount] = useState(0);
    const [content, setContent] = useState('dashboard');
    const [borderAmount, setBorderAmount] = useState(0);
    const [description, setDescription] = useState('');
    const [incomeHistory, setIncomeHistory] = useState([]);
    const [outcomeHistory, setOutcomeHistory] = useState([]);

    const handleContentChange = (newContent) => {
        setContent(newContent);
    };

    const fetchData = async () => {
      const response = await fetch('/api/finance');
      const data = await response.json();
  
      setIncome(data.income);
      setOutcome(data.outcome);
    };
  
    useEffect(() => {
      fetchData();
    }, []);

    useEffect(() => {
        setTotal(income - outcome);
    }, [income, outcome]);
    
    const fetchIncomeHistory = async () => {
        try {
            const response = await fetch('/api/finance/income');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const text = await response.text();
            console.log(text);
            const data = JSON.parse(text);
            setIncomeHistory(data);
        } catch (error) {
            console.error('Failed to fetch income history:', error);
        }
    };

    const fetchOutcomeHistory = async () => {
        try {
            const response = await fetch('/api/finance/outcome');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const text = await response.text();
            console.log(text);
            const data = JSON.parse(text);
            setOutcomeHistory(data);
        } catch (error) {
            console.error('Failed to fetch outcome history:', error);
        }
    };

    useEffect(() => {
        fetchIncomeHistory();
        fetchOutcomeHistory();
    }, []);

    useEffect(() => {
        console.log(incomeHistory);
        console.log(outcomeHistory);
    }, [incomeHistory, outcomeHistory]);

    const handleSubmit = async (event) => {
    event.preventDefault();

    const parsedAmount = parseFloat(financeAmount);

    const response = await fetch('/api/finance', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            type: financeType,
            amount: parsedAmount,
            description: description,
        }),
    });

    if (!response.ok) {
        console.error('Failed to post data:', response.statusText);
        return;
    }

    const responseData = await response.json();
    console.log('Posted data:', responseData);

    if (financeType === 'income') {
        setIncome(income + parsedAmount);
    } else {
        setOutcome(outcome + parsedAmount);
    }
};

    return (
        <div>
            <nav style={{backgroundColor: '#7ad0ec', padding: '25px', color: 'white', display: 'flex', justifyContent: 'space-between'}}>
                <div>
                    <button className={content === 'dashboard' ? 'button-nav active' : 'button-nav'} onClick={() => handleContentChange('dashboard')}>Dashboard</button>
                    <button className={content === 'incomeHistory' ? 'button-nav active' : 'button-nav'} onClick={() => handleContentChange('incomeHistory')}>Income History</button>
                    <button className={content === 'outcomeHistory' ? 'button-nav active' : 'button-nav'} onClick={() => handleContentChange('outcomeHistory')}>Outcome History</button>
                    <button className={content === 'settings' ? 'button-nav active' : 'button-nav'} onClick={() => handleContentChange('settings')}>Settings</button>
                </div>
            </nav>
            {content === 'dashboard' ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', padding: '20px' }}>
                    <h1 style={{ alignSelf: 'flex-start' }}>Personal Finance Manager</h1>
                    <div class="row" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', padding: '0 20px' }}>
                        <div class="col-md-4">
                            <h2>Income</h2>
                            <p id="income" className='numDisplay'>{income}</p> 
                        </div>
                        <div class="col-md-4">
                            <h2>Outcome</h2>
                            <p id="outcome" className='numDisplay'>{outcome}</p> 
                        </div>
                        <div class="col-md-4">
                            <h2>Total</h2>
                            <p id="total" className={`numDisplay ${getTotalClass(total, borderAmount)}`}>{total}</p>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="form">
                        <div className="form-group">
                            <label><h2>Type:</h2></label>
                            <select value={financeType} onChange={e => setFinanceType(e.target.value)} className="form-control">
                                <option value="income">Income</option>
                                <option value="outcome">Outcome</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label><h2>Amount:</h2></label>
                            <input type="number" value={financeAmount} onChange={e => setFinanceAmount(e.target.value)} min="0" step="1" required className="form-control" />
                        </div>
                        <div className="form-group">
                            <label><h2>Description:</h2></label>
                            <input type="text" value={description} onChange={e => setDescription(e.target.value)} required className="form-control" />
                        </div>
                        <button type="submit" className="btn-add">Add</button>
                    </form>
                </div>
            ) : content === 'incomeHistory' ? (
              <div style={{ width: '100%', fontSize: '20px' }}>
                <h1>Income History</h1>
                  <table style={{ width: '100%', fontSize: '20px' }}>
                      <thead>
                          <tr style={{fontSize: '30px'}}>
                              <th>Date</th>
                              <th>Amount</th>
                              <th>Description</th>
                          </tr>
                      </thead>
                      <tbody>
                        {incomeHistory.map((item, index) => (
                            <tr key={index} style={{backgroundColor: index % 2 === 0 ? '#E3E3E3' : 'white', height: '50px'}}>
                                <td style={{textAlign: 'center'}}>{new Date(item.Date).toLocaleDateString()}</td>
                                <td style={{textAlign: 'center'}}>{item.Amount}</td>
                                <td style={{textAlign: 'center'}}>{item.Description}</td>
                            </tr>
                        ))}
                      </tbody>
                  </table>
              </div>
            ) : content === 'outcomeHistory' ? (
              <div style={{ width: '100%', fontSize: '20px' }}>
                <h1>Outcome History</h1>
                  <table style={{ width: '100%', fontSize: '20px' }}>
                      <thead>
                          <tr style={{fontSize: '30px'}}>
                              <th>Date</th>
                              <th>Amount</th>
                              <th>Description</th>
                          </tr>
                      </thead>
                      <tbody>
                        {outcomeHistory.map((item, index) => (
                            <tr key={index} style={{backgroundColor: index % 2 === 0 ? '#E3E3E3' : 'white', height: '50px'}}>
                                <td style={{textAlign: 'center'}}>{new Date(item.Date).toLocaleDateString()}</td>
                                <td style={{textAlign: 'center'}}>{item.Amount}</td>
                                <td style={{textAlign: 'center'}}>{item.Description}</td>
                            </tr>
                        ))}
                      </tbody>
                  </table>
              </div>
            ) : (
                <div>
                    {<div className="settings-form">
                        <div className="row">
                            <div className="col-md-12">
                                <h1>Settings</h1>
                                <div className="form-group">
                                    <label><h2>Set Certain Amount:</h2></label>
                                    <input type="number" value={borderAmount} onChange={e => setBorderAmount(parseFloat(e.target.value))} className="form-control" />
                                    <button onClick={() => setBorderAmount(borderAmount)} className="btn-add">Update</button>
                                </div>
                            </div>
                        </div>
                    </div>}
                </div>
            )}
        </div>
    );
}

export default Dashboard;