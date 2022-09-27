import React from "react";
import { Check, Trash } from "phosphor-react";
import styles from "./Task.module.scss";

export function Task({ isDone, content, onCheck, onDelete }) {
  const styleIsDone = isDone ? styles.done : styles.unDone;

  return (
    <li className={styles.task}>
      <label>
        <input type="checkbox" checked={isDone} onChange={onCheck} />
        <span>
          <Check />
        </span>
      </label>

      <p className={styleIsDone}>{content}</p>

      <button onClick={onDelete}>
        <Trash />
      </button>
    </li>
  );
}
