import React from 'react'
import styles from './TextFields.module.css'
export default function TextFields(props) {
  return (
    <div className={styles.TextWrapper}>
      <input {...props} />
      {props.error && <p>{props.errormessage}</p>}
    </div>
  )
}
