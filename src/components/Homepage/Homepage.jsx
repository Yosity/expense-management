import "./Homepage.css";
import { Link, useLocation } from "react-router-dom";
import profilePic from "./profile-pic.png";
import { useState } from "react"; // Import useState from React

function Homepage() {
  const { state } = useLocation();
  const { name } = state;
  // Define a state variable to keep track of the active tab
  const [activeTab, setActiveTab] = useState("dashboard");

  // Function to set the active tab
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  //Income Page variables
  const [title, setIncomeTitle] = useState("");
  const [date, setIncomeDate] = useState("");
  const [description, setIncomeDescription] = useState("");
  const [amount, setIncomeAmount] = useState(0.0);
  const [totalIncome, setTotalIncome] = useState(0.0);
  const [totalExpense, setTotalExpense] = useState(0.0);

  const [incomeHistory, setIncomeHistory] = useState([]);
  const [expenseHistory, setExpenseHistory] = useState([]);
  const [titleError, setTitleError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [amountError, setAmountError] = useState(false);
  const [isNavActive, setIsNavActive] = useState(false);
  const handleInputChange = (event) => {
    const { id, value } = event.target;
    if (id === "title") setIncomeTitle(value);
    if (id === "date") setIncomeDate(value);
    if (id === "description") setIncomeDescription(value);
    if (id === "amount") setIncomeAmount(value.replace(/[^0-9.]/g, ""));
  };

  const checkError = () => {
    if (!title) setTitleError(true);
    else setTitleError(false);
    if (!date) setDateError(true);
    else setDateError(false);
    if (amount <= 0) setAmountError(true);
    else setAmountError(false);
  };

  const addIncome = () => {
    if (title && date && amount > 0) {
      const newIncome = {
        title: title,
        date: date,
        amount: parseFloat(amount),
        description: description,
      };
      setIncomeHistory((prevIncomeHistory) => [
        newIncome,
        ...prevIncomeHistory,
      ]);
      setTotalIncome(parseFloat(totalIncome) + parseFloat(amount));
      // setIncomeTitle("");
      // setIncomeDate("");
      // setIncomeAmount(0.0);
    } else {
      alert("Please provide Essential Inputs");
      checkError();
    }
  };
  const addExpense = () => {
    if (title && date && amount > 0) {
      const newExpense = {
        title: title,
        date: date,
        amount: parseFloat(amount),
        description: description,
      };
      setExpenseHistory((prevExpenseHistory) => [
        newExpense,
        ...prevExpenseHistory,
      ]);
      setTotalExpense(parseFloat(totalExpense) + parseFloat(amount));
      // setIncomeTitle("");
      // setIncomeDate("");
      // setIncomeAmount(0.0);
    } else {
      alert("Please provide Essential Inputs");
      checkError();
    }
  };
  const toggleNav = () => {
    setIsNavActive(!isNavActive);
  };
  return (
    <section className="homepage">
      <div
        className="burger"
        onClick={toggleNav}
        role="button"
        aria-label="Toggle Menu"
      >
        <span className="line"></span>
        <span className="line"></span>
        <span className="line"></span>
      </div>
      <nav className={isNavActive ? "active" : ""}>
        <div className="profile-section">
          <div className="image-name">
            <img src={profilePic} alt="" />
            <p>{name}</p>
          </div>
          <Link to="/" className="logout-link">
            Log out
          </Link>
        </div>
        <ul>
          {/* Add onClick handlers to change the active tab */}
          <li
            onClick={() => handleTabChange("dashboard")}
            className={activeTab === "dashboard" ? "active" : ""}
          >
            Dashboard
          </li>
          <li
            onClick={() => handleTabChange("income-page")}
            className={activeTab === "income-page" ? "active" : ""}
          >
            Income
          </li>
          <li
            onClick={() => handleTabChange("expense-page")}
            className={activeTab === "expense-page" ? "active" : ""}
          >
            Expense
          </li>
        </ul>
      </nav>
      <main>
        {activeTab === "dashboard" && ( // Render if activeTab is "dashboard"
          <section className="dashboard">
            <h1>Dashboard</h1>
            <div className="dashboard-content">
              <div className="graph-income">
                <div className="income">
                  <p className="income-amount">
                    Total Income<span>0,00$</span>
                  </p>
                  <p className="balance-amount">
                    Total Balance<span>0,00$</span>
                  </p>
                  <p className="expense-amount">
                    Total Expense <span>0,00$</span>
                  </p>
                </div>
                <div className="graph"></div>
              </div>

              <div className="history-container">
                <h2>Recent History</h2>
                <ul className="history">
                  <li>
                    <p>
                      Title <br />
                      <span>11/08/2023</span>
                    </p>

                    <span>0.00$</span>
                  </li>
                  <li>
                    <p>
                      Title <br />
                      <span>11/08/2023</span>
                    </p>

                    <span>0.00$</span>
                  </li>
                  <li>
                    <p>
                      Title <br />
                      <span>11/08/2023</span>
                    </p>

                    <span>0.00$</span>
                  </li>
                  <li>
                    <p>
                      Title <br />
                      <span>11/08/2023</span>
                    </p>

                    <span>0.00$</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        )}
        {activeTab === "income-page" && ( // Render if activeTab is "income-page"
          <section className="income-page">
            <div className="income-content">
              <h2 className="amount">Total Income : {totalIncome}$</h2>
              <div className="income-subcontainer">
                <div className="income-input">
                  <input
                    type="text"
                    id="income-title"
                    value={title}
                    placeholder="Title"
                    onChange={handleInputChange}
                    className={titleError ? "error" : "valid"}
                  />
                  <input
                    type="date"
                    id="income-date"
                    value={date}
                    placeholder="Date"
                    onChange={handleInputChange}
                    className={dateError ? "error" : "valid"}
                  />
                  <input
                    type="text"
                    id="income-amount"
                    value={amount === 0 ? "" : amount}
                    placeholder="amount"
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9.]/g, "");
                      handleInputChange(e);
                    }}
                    className={amountError ? "error" : "valid"}
                  />
                  <textarea
                    id="income-description"
                    rows="4"
                    cols="50"
                    placeholder="Description (Optional)"
                    maxlength="30"
                    onChange={handleInputChange}
                  ></textarea>
                  <button onClick={addIncome}>Add Income</button>
                </div>
                <div className="income-history-container">
                  <h2>Recent History</h2>
                  <ul className="income-history">
                    {incomeHistory.map((income, index) => (
                      <li key={index}>
                        <div className="cell-description">
                          <span id="income-title">{income.title}</span>
                          <div className="cell-subdescription">
                            <span id="income-date">{`${income.date}`}</span>
                            <span id="income-amount">{`${income.amount}$`}</span>
                            <span id="income-description">{`${income.description}`}</span>
                          </div>
                        </div>

                        <i class="fa-solid fa-trash trashcan"></i>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}
        {activeTab === "expense-page" && ( // Render if activeTab is "expense-page"
          <section className="expense-page">
            <div className="expense-content">
              <h2 className="amount">Total Expense : {totalExpense}$</h2>
              <div className="expense-subcontainer">
                <div className="expense-input">
                  <input
                    type="text"
                    id="expense-title"
                    value={title}
                    placeholder="Title"
                    onChange={handleInputChange}
                    className={titleError ? "error" : "valid"}
                  />
                  <input
                    type="expense-date"
                    id="date"
                    value={date}
                    placeholder="Date"
                    onChange={handleInputChange}
                    className={dateError ? "error" : "valid"}
                  />
                  <input
                    type="text"
                    id="expense-amount"
                    value={amount === 0 ? "" : amount}
                    placeholder="amount"
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9.]/g, "");
                      handleInputChange(e);
                    }}
                    className={amountError ? "error" : "valid"}
                  />
                  <textarea
                    id="expense-description"
                    rows="4"
                    cols="50"
                    placeholder="Description (Optional)"
                    maxlength="30"
                    onChange={handleInputChange}
                  ></textarea>
                  <button onClick={addExpense}>Add Expense</button>
                </div>
                <div className="expense-history-container">
                  <h2>Recent History</h2>
                  <ul className="expense-history">
                    {expenseHistory.map((income, index) => (
                      <li key={index}>
                        <div className="cell-description">
                          <span id="expense-title">{income.title}</span>
                          <div className="cell-subdescription">
                            <span id="expense-date">{`${income.date}`}</span>
                            <span id="expense-amount">{`${income.amount}$`}</span>
                            <span id="expense-description">{`${income.description}`}</span>
                          </div>
                        </div>

                        <i class="fa-solid fa-trash trashcan"></i>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </section>
  );
}

export default Homepage;
