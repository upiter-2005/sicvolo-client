import CookieConsent from "react-cookie-consent";
import styles from "./Cookie.module.css";

export default function Cookie() {
  return (
   
      <CookieConsent declineButtonText="I decline" enableDeclineButton={true} containerClasses={styles.Cookie_wraper} buttonClasses={styles.btn}
      declineButtonClasses={styles.btn_decline}
      style={{ background: "#323232", fontSize: "12px", zIndex: 99999999 }}

      >
      <h3> We Use Cookies</h3>
      <p className={styles.Cookie_text}>In addition to the cookies that are strictly necessary for the operation of this website, Sicvolo uses cookies and other tracking tools. You can find more details <a href="/terms">here</a> </p>

      </CookieConsent>
    
  )
}
