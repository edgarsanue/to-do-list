import React from 'react'

import styles from "./Header.module.scss";

import Frame3 from "../images/Frame3.svg";

export function Header() {
  return (
    <header className={styles.header}>
      <img src={Frame3} alt="checked" />
    </header>
  )
}

