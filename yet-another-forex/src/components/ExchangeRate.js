import React from "react";
import styles from "../App.module.css";

const ExchangeRate = ({ symbol, exchangeRate }) => {
  return (
    <div className={styles.rate_box}>
      <div className={styles.symbol_box}>
        <h1 className={styles.symbol}>{symbol.substring(3)}</h1>
      </div>
      <div className={styles.rate}>{exchangeRate.toPrecision(5)}</div>
    </div>
  );
};

export default ExchangeRate;
