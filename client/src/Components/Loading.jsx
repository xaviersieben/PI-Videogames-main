import React from "react"
import loading from "../Images/loading.gif"
import styles from "../Components/Loading.module.css"


export default function Loading(){
    return(
        <div className={styles.loading1}>
            <img className={styles.loading2} src={loading} alt="Loading" />
        </div>
    )
}