import "./Homepage.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import profilePic from "./profile-pic.png";
import { useState, useEffect } from "react"; // Import useState from React

import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import moment from "moment";

function Homepage() {
  const navigatTo = useNavigate();
  const { state } = useLocation();
  const { name, email, password } = state;
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

  const [category, setCategory] = useState("Diğer");
  const [selectedCategoryFilter, setSelectedCategoryFilter] =
    useState("Select");
  const [filteredHistory, setFilteredHistory] = useState(history);
  const [selectedTypeFilter, setSelectedTypeFilter] = useState("all");

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
        category: category,
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
      setIncomeTitle("");
      setIncomeDate("");
      setIncomeAmount(0.0);
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
        amount: parseFloat(-amount),
        description: description,
        type: "expense",
        category: category,
        uniqueID: uniqueID,
      };
      setExpenseHistory((prevExpenseHistory) => [
        ...prevExpenseHistory,
        newExpense,
      ]);
      setHistory((prevHistory) => [newExpense, ...prevHistory]);
      setTotalExpense(parseFloat(totalExpense) - parseFloat(amount));
      setTotalBalance(parseFloat(totalBalance) - parseFloat(amount));
      setUniqueID(uniqueID + 1);

      setIncomeTitle("");
      setIncomeDate("");
      setIncomeAmount(0.0);
    } else {
      alert("Please provide Essential Inputs");
      checkError();
    }
  };

  // Handling deletion of a transaction
  const handleDeletion = (event, index) => {
    const { id } = event.target;
    let uniqueKey = 0;
    // Update the state based on the input field id
    if (id === "incomeTrash") {
      // income item deletion
      const updatedIncomeHistory = [...incomeHistory];
      const deletedItem = updatedIncomeHistory.splice(index, 1)[0];
      uniqueKey = deletedItem.uniqueID;
      setIncomeHistory(updatedIncomeHistory);
      setTotalIncome((prevTotalIncome) => prevTotalIncome - deletedItem.amount);
      setTotalBalance(
        (prevTotalBalance) => prevTotalBalance - deletedItem.amount
      );
    } else if (id === "expenseTrash") {
      // expense item deletion
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

    //Updating history
    const updatedHistory = history.filter(
      (item) => item.uniqueID !== uniqueKey
    );
    setHistory(updatedHistory);
  };

  // Applying fiters to the History page after clicking the button
  const applyFilter = () => {
    if (selectedCategoryFilter === "all" && selectedTypeFilter === "all") {
      setFilteredHistory(history);
    } else {
      const filteredItems = history.filter(
        (item) =>
          (selectedCategoryFilter === "all" ||
            item.category === selectedCategoryFilter) &&
          (selectedTypeFilter === "all" || item.type === selectedTypeFilter)
      );
      setFilteredHistory(filteredItems);
    }
  };

  // Toggling the theme of the body
  const [bodyTheme, setBodyTheme] = useState(true);
  const toggleTheme = () => {
    setBodyTheme(!bodyTheme);
    if (bodyTheme) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  };
  const toggleNav = () => {
    setIsNavActive(!isNavActive);
  };

  useEffect(() => {
    const storedData = JSON.parse(sessionStorage.getItem("user_data")) || {};
    // Set the state based on the data retrieved from localStorage
    setHistory(storedData.history || []);
    setUniqueID(storedData.uniqueID || 0);
    setTotalIncome(storedData.totalIncome || 0.0);
    setTotalExpense(storedData.totalExpense || 0.0);
    setTotalBalance(storedData.totalBalance || 0.0);
    setIncomeHistory(storedData.incomeHistory || []);
    setExpenseHistory(storedData.expenseHistory || []);
    console.log("Data retrieved", storedData);
  }, []);

  // Save data to localStorage whenever there is an update
  useEffect(() => {
    const userData = {
      history,
      uniqueID,
      totalIncome,
      totalExpense,
      totalBalance,
      incomeHistory,
      expenseHistory,
    };
    sessionStorage.setItem("user_data", JSON.stringify(userData));
  }, [
    history,
    uniqueID,
    totalIncome,
    totalExpense,
    totalBalance,
    incomeHistory,
    expenseHistory,
  ]);

  const monthlyData = history.reduce((data, item) => {
    const month = moment(item.date).format("MMM YYYY");

    if (!data[month]) {
      data[month] = {
        x: new Date(item.date),
        income: 0,
        expense: 0,
      };
    }

    if (item.type === "income") {
      data[month].income += item.amount;
    } else if (item.type === "expense") {
      data[month].expense -= item.amount; // Negate the expense amount for the chart
    }

    data[month].balance = data[month].income - data[month].expense;

    return data;
  }, {});

  const sortedMonths = Object.keys(monthlyData).sort((a, b) =>
    moment(a, "MMM YYYY").isBefore(moment(b, "MMM YYYY")) ? -1 : 1
  );

  const chartData = {
    labels: sortedMonths,
    datasets: [
      {
        label: "Gelir",
        data: sortedMonths.map((month) => monthlyData[month].income),
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        backgroundColor: "rgba(75, 192, 192, 1)",
        fill: false,
      },
      {
        label: "Gider",
        data: sortedMonths.map((month) => monthlyData[month].expense),
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        backgroundColor: "rgba(255, 99, 132, 1)",
        fill: false,
      },
      {
        label: "Toplam",
        data: sortedMonths.map((month) => monthlyData[month].balance),
        borderColor: "rgba(0, 0, 0, 1)",
        borderWidth: 2,
        backgroundColor: "rgba(0, 0, 0, 1)",
        fill: false,
      },
    ],
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
            <button
              className="logout-link"
              onClick={() => {
                console.log("Navigating to /sign-in");
                navigatTo("/sign-in", {
                  state: { name: name, email: email, password: password },
                });
              }}
            >
              Log out
            </button>
          </div>
          <ul>
            {/* Add onClick handlers to change the active tab */}
            <li
              tabIndex="0"
              onClick={() => handleTabChange("dashboard")}
              className={activeTab === "dashboard" ? "active" : ""}
            >
              Gösterge
            </li>
            <li
              tabIndex="0"
              onClick={() => handleTabChange("history-page")}
              className={activeTab === "history-page" ? "active" : ""}
            >
              History
            </li>
            <li
              tabIndex="0"
              onClick={() => handleTabChange("income-page")}
              className={activeTab === "income-page" ? "active" : ""}
            >
              Gelir
            </li>
            <li
              tabIndex="0"
              onClick={() => handleTabChange("expense-page")}
              className={activeTab === "expense-page" ? "active" : ""}
            >
              Gider
            </li>
          </ul>
          <div className="theme-btn-container">
            <label>Renk teması</label>
            <button className="theme-button" onClick={toggleTheme}></button>
          </div>
        </nav>
        {activeTab === "dashboard" && ( // Render if activeTab is "dashboard"
          <section id="dashboard">
            <h1>Gösterge Paneli</h1>
            <div className="dashboard-content">
              <div className="graph-data">
                <div className="data">
                  <p className="data-amount">
                    Toplam gelir
                    <span>{totalIncome.toLocaleString("en-US")} ₺</span>
                  </p>
                  <p className="data-amount">
                    Toplam Bakiye
                    <span>{totalBalance.toLocaleString("en-US")} ₺</span>
                  </p>
                  <p className="data-amount">
                    Toplam Gider
                    <span>{totalExpense.toLocaleString("en-US")} ₺</span>
                  </p>
                </div>
                <div className="graph">
                  <Line data={chartData} />
                </div>
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
                        <span>
                          {element.date} &ensp;{element.category}
                        </span>
                      </p>

                      <span>{element.amount.toLocaleString("en-US")} ₺</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}
        {activeTab === "history-page" && (
          <section id="history-page">
            <h1>İşlem geçmişi</h1>
            <div className="history-page-content">
              <div className="filter-container">
                <div className="filters">
                  <div className="filter">
                    Türüne Göre Filtrele <br />
                    <select
                      id="typeFilter"
                      value={selectedTypeFilter}
                      onChange={(e) => setSelectedTypeFilter(e.target.value)}
                    >
                      <option className="select" value="all">
                        Tüm Türler
                      </option>
                      <option value="income">Gelir</option>
                      <option value="expense">Gider</option>
                    </select>
                  </div>
                  <div className="filter">
                    Kategoriye Göre Filtrele <br />
                    <select
                      id="categoryFilter"
                      value={selectedCategoryFilter}
                      onChange={(e) =>
                        setSelectedCategoryFilter(e.target.value)
                      }
                    >
                      <option className="select" value="Select">
                        Seç
                      </option>
                      <option value="all">Tüm Kategoriler</option>
                      <option value="Business">Business</option>
                      <option value="Market">Market</option>
                      <option value="Fatura">Fatura</option>
                      <option value="Borç">Borç</option>
                      <option value="Diğer">Diğer</option>
                    </select>
                  </div>
                </div>
                <button onClick={applyFilter}>Filtreyi güncelle</button>
              </div>

              <ul className="history">
                {filteredHistory.map((element, index) => (
                  <li key={index}>
                    <p
                      className={
                        element.type === "income" ? "dIncome" : "dExpense"
                      }
                    >
                      {element.title} <br />
                      <span>
                        {element.date} &ensp; <b>{element.category}</b>
                      </span>
                    </p>

                    <span>{element.amount.toLocaleString("en-US")} ₺</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
        {activeTab === "income-page" && ( // Render if activeTab is "income-page"
          <section id="income-page">
            <div className="income-content">
              <h1 className="amount">
                Total Income : {totalIncome.toLocaleString("en-US")}₺
              </h1>
              <div className="income-subcontainer">
                <div className="income-input">
                  <select
                    className="category-input"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="Diğer">Diğer</option>
                    <option value="Business">Business</option>
                    <option value="Fatura">Fatura</option>
                    <option value="Borç">Borç</option>
                  </select>
                  <input
                    type="text"
                    id="income-title-input"
                    value={title}
                    placeholder="Başlık"
                    onChange={handleInputChange}
                    className={titleError ? "error" : "valid"}
                  />
                  <input
                    type="date"
                    id="income-date-input"
                    value={date}
                    placeholder="Tarih"
                    onChange={handleInputChange}
                    className={dateError ? "error" : "valid"}
                  />
                  <input
                    type="text"
                    id="income-amount-input"
                    value={amount === 0 ? "" : amount}
                    placeholder="Miktar"
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
                    placeholder="Açıklama (Optional)"
                    maxLength="30"
                    onChange={handleInputChange}
                  ></textarea>
                  <button onClick={addIncome}>Gelir ekle</button>
                </div>
                <div className="income-history">
                  <h2>Recent Incomes</h2>
                  <ul>
                    {incomeHistory.map((income, index) => (
                      <li key={index}>
                        <div className="cell-description">
                          <div className="cell-subdescription">
                            <span className="title" id="income-title">
                              {income.title}
                              &ensp; <b>({income.category}) </b>
                            </span>
                            <div className="money-date">
                              <span
                                className="money"
                                id="income-amount"
                              >{`${income.amount.toLocaleString(
                                "en-US"
                              )} ₺`}</span>
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
              <h1 className="amount">
                Total Expense : {totalExpense.toLocaleString("en-US")}₺
              </h1>
              <div className="expense-subcontainer">
                <div className="expense-input">
                  <select
                    className="category-input"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="Diğer">Diğer</option>
                    <option value="Business">Business</option>
                    <option value="Market">Market</option>
                    <option value="Fatura">Fatura</option>
                    <option value="Borç">Borç</option>
                  </select>
                  <input
                    type="text"
                    id="expense-title-input"
                    value={title}
                    placeholder="Başlık"
                    onChange={handleInputChange}
                    className={titleError ? "error" : "valid"}
                  />
                  <input
                    type="date"
                    id="expense-date-input"
                    value={date}
                    placeholder="Tarih"
                    onChange={handleInputChange}
                    className={dateError ? "error" : "valid"}
                  />
                  <input
                    type="text"
                    id="expense-amount-input"
                    value={amount === 0 ? "" : amount}
                    placeholder="Miktar"
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
                    placeholder="Açıklama (Optional)"
                    maxLength="30"
                    onChange={handleInputChange}
                  ></textarea>
                  <button onClick={addExpense}>Gider ekle</button>
                </div>
                <div className="expense-history">
                  <h2>Recent Expenses</h2>
                  <ul>
                    {expenseHistory.map((expense, index) => (
                      <li key={expense}>
                        <div className="cell-description">
                          <div className="cell-subdescription">
                            <span className="title" id="expense-title">
                              {expense.title}
                              &ensp; ({expense.category})
                            </span>
                            <div className="money-date">
                              <span
                                className="money"
                                id="expense-amount"
                              >{`${expense.amount.toLocaleString(
                                "en-US"
                              )} ₺`}</span>
                              <span
                                className="hdate"
                                id="expense-date"
                              >{`${expense.date}`}</span>
                            </div>
                          </div>
                          <span
                            className="description"
                            id="expense-description"
                          >{`${expense.description}`}</span>
                        </div>

                        <i
                          onClick={(event) => handleDeletion(event, index)}
                          id="expenseTrash"
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
      </main>
    </section>
  );
}

export default Homepage;
