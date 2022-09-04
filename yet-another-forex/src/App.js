import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./App.module.css";
import ExchangeRate from "./components/ExchangeRate";
import { fetchLatestExchangeRates } from "./api/exchangeRate";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import EventTwoToneIcon from "@mui/icons-material/EventTwoTone";

function App() {
  const [exchangeRates, setExchangeRates] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [error, setError] = useState("");
  let componentIsMounted;

  useEffect(() => {
    componentIsMounted = true;
    if (
      selectedDate === null ||
      moment(selectedDate).format("DD-MM-YYYY") ===
        moment(new Date()).format("DD-MM-YYYY")
    ) {
      getLatestExchangeRateData();
    } else {
      getHistoricalExchangeRateData();
    }

    return () => {
      componentIsMounted = false;
    };
  }, [selectedDate]);

  const getLatestExchangeRateData = () => {
    fetchLatestExchangeRates()
      .then((data) => {
        console.log("Latest Exchange Rate Data:", data);
        console.log(data.error?.info);
        if (componentIsMounted) {
          setExchangeRates(data.quotes);
          if (data.error?.code === 104) {
            setError("Monthly usage limit reached.");
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getHistoricalExchangeRateData = async () => {
    const response = await axios.get(
      `http://api.currencylayer.com/historical?date=${moment(
        selectedDate
      ).format("YYYY-MM-DD")}&access_key=${process.env.REACT_APP_API_KEY}`
    );
    const data = response.data;
    console.log(
      `${moment(selectedDate).format("DD-MM-YYYY")} Exchange Rate Data:`,
      data
    );
    console.log(data.error?.info);
    if (componentIsMounted) {
      setExchangeRates(data.quotes);
      if (data.error?.code === 104) {
        setError("Monthly usage limit reached.");
      }
    }
  };

  return (
    <>
      <div className={styles.box}>
        <div className={styles.yet_another_forex_box}>
          <h3 className={styles.yet_another_forex}>Yet Another Forex</h3>
        </div>
        <div className={styles.date_box}>
          {selectedDate === null ||
          moment(selectedDate).format("DD-MM-YYYY") ===
            moment(new Date()).format("DD-MM-YYYY") ? (
            <div className={styles.rates_date_box}>
              <h2 className={styles.rates_date}>
                Rates as of {moment(new Date()).format("DD-MM-YYYY")}
              </h2>
            </div>
          ) : (
            <div className={styles.rates_date_box}>
              <h2 className={styles.rates_date}>
                Rates on {moment(selectedDate).format("DD-MM-YYYY")}
              </h2>
            </div>
          )}
          <div className={styles.datepicker_box}>
            <div className={styles.datepicker_icon}>
              <EventTwoToneIcon />
            </div>
            <div className={styles.datepicker}>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="dd-MM-yyyy"
                minDate={new Date("01-01-1999")}
                maxDate={new Date()}
                showYearDropdown
                scrollableMonthYearDropdown
              />
            </div>
          </div>
        </div>
        <div className={styles.rates_box}>
          {exchangeRates
            ? Object.keys(exchangeRates).map((key) => (
                <ExchangeRate
                  key={key}
                  symbol={key}
                  exchangeRate={exchangeRates[key]}
                />
              ))
            : [error]}
        </div>
      </div>
    </>
  );
}

export default App;
