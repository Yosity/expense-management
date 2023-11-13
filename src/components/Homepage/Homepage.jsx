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

  const [history, setHistory] = useState([]);
  const [uniqueID, setUniqueID] = useState(0);
  //Income Page variables
  const [title, setIncomeTitle] = useState("");
  const [date, setIncomeDate] = useState("");
  const [description, setIncomeDescription] = useState("");
  const [amount, setIncomeAmount] = useState(0.0);
  //Dashboard page
  const [totalIncome, setTotalIncome] = useState(0.0);
  const [totalExpense, setTotalExpense] = useState(0.0);
  const [totalBalance, setTotalBalance] = useState(0.0);

  const [incomeHistory, setIncomeHistory] = useState([]);
  const [expenseHistory, setExpenseHistory] = useState([]);
  const [titleError, setTitleError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [amountError, setAmountError] = useState(false);
  const [isNavActive, setIsNavActive] = useState(false);

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    // Update the state based on the input field id
    if (id === "income-title-input" || id === "expense-title-input") {
      setIncomeTitle(value);
    } else if (id === "income-date-input" || id === "expense-date-input") {
      setIncomeDate(value);
    } else if (
      id === "income-description-input" ||
      id === "expense-description-input"
    ) {
      setIncomeDescription(value);
    } else if (id === "income-amount-input" || id === "expense-amount-input") {
      setIncomeAmount(value.replace(/[^0-9.]/g, ""));
    }
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
        type: "income",
        uniqueID: uniqueID,
      };
      setIncomeHistory((prevIncomeHistory) => [
        ...prevIncomeHistory,
        newIncome,
      ]);
      setHistory((prevHistory) => [newIncome, ...prevHistory]);
      setTotalIncome(parseFloat(totalIncome) + parseFloat(amount));
      setTotalBalance(parseFloat(totalBalance) + parseFloat(amount));
      setUniqueID(uniqueID + 1);
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
        type: "expense",
        uniqueID: uniqueID,
      };
      setExpenseHistory((prevExpenseHistory) => [
        ...prevExpenseHistory,
        newExpense,
      ]);
      setHistory((prevHistory) => [newExpense, ...prevHistory]);
      setTotalExpense(parseFloat(totalExpense) + parseFloat(amount));
      setTotalBalance(parseFloat(totalBalance) + parseFloat(amount));
      setUniqueID(uniqueID + 1);

      // setIncomeTitle("");
      // setIncomeDate("");
      // setIncomeAmount(0.0);
    } else {
      alert("Please provide Essential Inputs");
      checkError();
    }
  };

  const handleDeletion = (event, index) => {
    const { id } = event.target;
    let uniqueKey = 0;
    // Update the state based on the input field id
    if (id === "incomeTrash") {
      // Handle income item deletion
      const updatedIncomeHistory = [...incomeHistory];
      const deletedItem = updatedIncomeHistory.splice(index, 1)[0];
      uniqueKey = deletedItem.uniqueID;
      setIncomeHistory(updatedIncomeHistory);
      setTotalIncome((prevTotalIncome) => prevTotalIncome - deletedItem.amount);
      setTotalBalance(
        (prevTotalBalance) => prevTotalBalance - deletedItem.amount
      );
    } else if (id === "expenseTrash") {
      // Handle expense item deletion
      const updatedExpenseHistory = [...expenseHistory];
      const deletedItem = updatedExpenseHistory.splice(index, 1)[0];
      uniqueKey = deletedItem.uniqueID;
      setExpenseHistory(updatedExpenseHistory);
      setTotalExpense(
        (prevTotalExpense) => prevTotalExpense - deletedItem.amount
      );
      setTotalBalance(
        (prevTotalBalance) => prevTotalBalance - deletedItem.amount
      );
    }
    const updatedHistory = history.filter(
      (item) => item.uniqueID !== uniqueKey
    );
    setHistory(updatedHistory);
  };

  const toggleNav = () => {
    setIsNavActive(!isNavActive);
  };
  return (
    <section className="homepage">
      <main>
        <div
          onClick={toggleNav}
          id="mask"
          className={isNavActive ? "active" : "none"}
        ></div>
        <div
          className={isNavActive ? "burger open" : "burger"}
          onClick={toggleNav}
          role="button"
          aria-label="Toggle Menu"
        >
          <span className="line"></span>
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
        {activeTab === "dashboard" && ( // Render if activeTab is "dashboard"
          <section id="dashboard">
            <h1>Dashboard</h1>
            <div className="dashboard-content">
              <div className="graph-data">
                <div className="data">
                  <p className="data-amount">
                    Total Income
                    <span>{totalIncome.toLocaleString("en-US")} $</span>
                  </p>
                  <p className="data-amount">
                    Total Balance
                    <span>{totalBalance.toLocaleString("en-US")} $</span>
                  </p>
                  <p className="data-amount">
                    Total Expense{" "}
                    <span>{totalExpense.toLocaleString("en-US")} $</span>
                  </p>
                </div>
                <div className="graph"></div>
              </div>

              <div className="history-container">
                <h2>Recent History</h2>
                <ul className="history">
                  {history.map((element, index) => (
                    <li key={index}>
                      <p
                        className={
                          element.type === "income" ? "dIncome" : "dExpense"
                        }
                      >
                        {element.title} <br />
                        <span>{element.date}</span>
                      </p>

                      <span>{element.amount.toLocaleString("en-US")} $</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}
        {activeTab === "income-page" && ( // Render if activeTab is "income-page"
          <section id="income-page">
            <div className="income-content">
              <h2 className="amount">
                Total Income : {totalIncome.toLocaleString("en-US")}$
              </h2>
              <div className="income-subcontainer">
                <div className="income-input">
                  <input
                    type="text"
                    id="income-title-input"
                    value={title}
                    placeholder="Title"
                    onChange={handleInputChange}
                    className={titleError ? "error" : "valid"}
                  />
                  <input
                    type="date"
                    id="income-date-input"
                    value={date}
                    placeholder="Date"
                    onChange={handleInputChange}
                    className={dateError ? "error" : "valid"}
                  />
                  <input
                    type="text"
                    id="income-amount-input"
                    value={amount === 0 ? "" : amount}
                    placeholder="amount"
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9.]/g, "");
                      handleInputChange(e);
                    }}
                    className={amountError ? "error" : "valid"}
                  />
                  <textarea
                    id="income-description-input"
                    rows="4"
                    cols="50"
                    placeholder="Description (Optional)"
                    maxlength="30"
                    onChange={handleInputChange}
                  ></textarea>
                  <button onClick={addIncome}>Add Income</button>
                </div>
                <div className="income-history">
                  <h2>Recent History</h2>
                  <ul>
                    {incomeHistory.map((income, index) => (
                      <li key={index}>
                        <div className="cell-description">
                          <div className="cell-subdescription">
                            <span className="title" id="income-title">
                              {income.title}
                            </span>
                            <div className="money-date">
                              <span
                                className="money"
                                id="income-amount"
                              >{`${income.amount.toLocaleString(
                                "en-US"
                              )} $`}</span>
                              <span
                                className="hdate"
                                id="income-date"
                              >{`${income.date}`}</span>
                            </div>
                          </div>
                          <span
                            className="description"
                            id="income-description"
                          >{`${income.description}`}</span>
                        </div>

                        <i
                          onClick={(event) => handleDeletion(event, index)}
                          id="incomeTrash"
                          className="fa-solid fa-trash trashcan"
                        ></i>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}
        {activeTab === "expense-page" && ( // Render if activeTab is "expense-page"
          <section id="expense-page">
            <div className="expense-content">
              <h2 className="amount">
                Total Expense : {totalExpense.toLocaleString("en-US")}$
              </h2>
              <div className="expense-subcontainer">
                <div className="expense-input">
                  <input
                    type="text"
                    id="expense-title-input"
                    value={title}
                    placeholder="Title"
                    onChange={handleInputChange}
                    className={titleError ? "error" : "valid"}
                  />
                  <input
                    type="date"
                    id="expense-date-input"
                    value={date}
                    placeholder="Date"
                    onChange={handleInputChange}
                    className={dateError ? "error" : "valid"}
                  />
                  <input
                    type="text"
                    id="expense-amount-input"
                    value={amount === 0 ? "" : amount}
                    placeholder="amount"
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9.]/g, "");
                      handleInputChange(e);
                    }}
                    className={amountError ? "error" : "valid"}
                  />
                  <textarea
                    id="expense-description-input"
                    rows="4"
                    cols="50"
                    placeholder="Description (Optional)"
                    maxlength="30"
                    onChange={handleInputChange}
                  ></textarea>
                  <button onClick={addExpense}>Add Expense</button>
                </div>
                <div className="expense-history">
                  <h2>Recent History</h2>
                  <ul>
                    {expenseHistory.map((income, index) => (
                      <li key={index}>
                        <div className="cell-description">
                          <div className="cell-subdescription">
                            <span className="title" id="expense-title">
                              {income.title}
                            </span>
                            <div className="money-date">
                              <span
                                className="money"
                                id="expense-amount"
                              >{`${income.amount.toLocaleString(
                                "en-US"
                              )} $`}</span>
                              <span
                                className="hdate"
                                id="expense-date"
                              >{`${income.date}`}</span>
                            </div>
                          </div>
                          <span
                            className="description"
                            id="expense-description"
                          >{`${income.description}`}</span>
                        </div>

                        <i
                          onClick={(event) => handleDeletion(event, index)}
                          id="expenseTrash"
                          class="fa-solid fa-trash trashcan"
                        ></i>
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
