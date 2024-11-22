import React, { useEffect, useRef, useState } from "react";

import styles from "./Accordion.module.scss";

function Accordion(props) {
  const [active, setActive] = useState(false);
  const content = useRef(null);
  const [height, setHeight] = useState("0px");

  useEffect(() => {
  
  }, [height]);

  function toggleAccordion() {
    setActive(!active);
    setHeight(active ? "0px" : `${content.current.scrollHeight}px`);
  }

  return (
    <div className={styles.accordion__section}>
      <div
        className={active ? 
        `${styles.active} ${styles.accordion}` 
            : 
        `${styles.accordion}`}

        onClick={toggleAccordion}>
        <p className={styles.accordion__title}>{props.title}</p>
        <span style={{ marginLeft: "20px" }}>
          {active ? (
            <img
              src="/img/closeFaq.svg"
              className={`${styles.accordion__icon} ${styles.rotate}`}
              alt="FAQ - close icon"
              title="FAQ - close icon"
            />
          ) : (
            <img src="/img/openFaq.svg" className={`${styles.accordion__icon}`} 
              alt="FAQ - open icon"
              title="FAQ - open icon" 
            />
          )}
        </span>
      </div>
      <div ref={content} style={{ maxHeight: `${height}` }} className={styles.accordion__content}>
        <div
          className={styles.accordion__text}
          dangerouslySetInnerHTML={{ __html: props.content }}
        />
      </div>
    </div>
  );
}

export default Accordion;
