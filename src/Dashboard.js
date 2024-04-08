import React, { useState, useEffect } from 'react';
import LoginFunction from './LoginFunct';
import AuthService from './AuthService'; 
import getTotalClass from './totalClass';

function Dashboard() {
    const [isLoggedIn, setIsLoggedIn] = useState(AuthService.isLoggedIn());
    const userId = AuthService.getUserInfo(); 
    const [income, setIncome] = useState(0);
    const [outcome, setOutcome] = useState(0);
    const [total, setTotal] = useState(0);
    const [financeType, setFinanceType] = useState('income');
    const [financeAmount, setFinanceAmount] = useState(0);
    const [content, setContent] = useState('dashboard');
    const [borderAmount, setBorderAmount] = useState(0);
  
    const handleContentChange = (newContent) => {
        setContent(newContent);
    };
  
    useEffect(() => {
        setTotal(income - outcome);
    }, [income, outcome]);
  
    const handleSubmit = (event) => {
        event.preventDefault();
  
        if (financeType === 'income') {
            setIncome(income + parseFloat(financeAmount));
        } else {
            setOutcome(outcome + parseFloat(financeAmount));
        }
    };
  
    const handleLogin = () => {
        setIsLoggedIn(true);
    };
  
    const handleLogout = () => {
        AuthService.logout();
        setIsLoggedIn(false);
    };
  
    if (!isLoggedIn) {
        return <LoginFunction onLogin={handleLogin} />;
    }
  
    return (
      <div>
        <nav style={{backgroundColor: '#7ad0ec', padding: '25px', color: 'white', display: 'flex', justifyContent: 'space-between'}}>
        <div>
            <button className={content === 'dashboard' ? 'button-nav active' : 'button-nav'} onClick={() => handleContentChange('dashboard')}>Dashboard</button>
            <button className={content === 'incomeHistory' ? 'button-nav active' : 'button-nav'} onClick={() => handleContentChange('incomeHistory')}>Income History</button>
            <button className={content === 'outcomeHistory' ? 'button-nav active' : 'button-nav'} onClick={() => handleContentChange('outcomeHistory')}>Outcome History</button>
            <button className={content === 'settings' ? 'button-nav active' : 'button-nav'} onClick={() => handleContentChange('settings')}>Settings</button>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </nav>
        {content === 'dashboard' ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', padding: '20px' }}>
            <h1 style={{ alignSelf: 'flex-start' }}>Personal Finance Manager, Welcome, User {userId}</h1>
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
              <button type="submit" className="btn-add">Add</button>
            </form>
          </div>
        ) : content === 'incomeHistory' ? (
          <div>
            <h1>testing 123456</h1>
          </div>
        ) : content === 'outcomeHistory' ? (
          <div>
            <h1>Test</h1>
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