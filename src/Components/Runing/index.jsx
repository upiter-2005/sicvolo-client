import {memo} from "react";
import Marquee from "react-double-marquee";
import styles from "./Runing.module.scss";
const Runing = () => {
  return (
    <div className={styles.runing}>
      <Marquee direction="left" speed={0.04} childMargin={15} scrollWhen="always">
        <span>sic volo i want so!</span>
        <span>sic volo i want so!</span>
        <span>sic volo i want so!</span>
        <span>sic volo i want so!</span>
        <span>sic volo i want so!</span>
        <span>sic volo i want so!</span>
        <span>sic volo i want so!</span>
      </Marquee>
    </div>
  );
}
export default memo(Runing)