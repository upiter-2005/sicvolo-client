import {useEffect} from 'react'
import styles from "./RingSizeModal.module.scss"

export default function RingSizeModal({active, closeModal}) {


  useEffect(() => {
    if(active){
      document.body.style.overflow = "hidden";
    }else{
      document.body.style.overflow = "scroll";
    }
    // document.body.style.overflow = "hidden";
    // return () => {
    //     document.body.style.overflow = "scroll"
    // };
}, [active]);

  return (
    <div className={ active ? `${styles.modal}  ${styles.active}` :`${styles.modal}` } onClick={closeModal}>
      <div className={styles.modal__content} onClick={(e)=> e.stopPropagation()}>
        <h2>Ring size</h2>
        <img src="/img/closeModal.svg" className={styles.closeModal} onClick={closeModal} alt="" />
     
        <div className={styles.titles}>
          <span>US size</span>
          <span>EU size</span>
          <span>Diametr (mm)</span>
        </div>
        <div className={styles.sizesWrapper}>

          <div className={styles.sizesRow}>
            <span>1 3/4</span>
            <span>41</span>
            <span>13.06</span>
          </div>
          <div className={styles.sizesRow}>
            <span>2 1/4</span>
            <span>42</span>
            <span>13.38</span>
          </div>
          <div className={styles.sizesRow}>
            <span>2 1/2</span>
            <span>43</span>
            <span>13.69</span>
          </div>
          <div className={styles.sizesRow}>
            <span>3</span>
            <span>44</span>
            <span>14.01</span>
          </div>
          <div className={styles.sizesRow}>
            <span>3 1/4</span>
            <span>45</span>
            <span>14.33</span>
          </div>
          <div className={styles.sizesRow}>
            <span>3 3/4</span>
            <span>46</span>
            <span>14.65</span>
          </div>
          <div className={styles.sizesRow}>
            <span>4</span>
            <span>47</span>
            <span>14.97</span>
          </div>
          <div className={styles.sizesRow}>
            <span>4 1/2</span>
            <span>48</span>
            <span>15.29</span>
          </div>
          <div className={styles.sizesRow}>
            <span>4 3/4</span>
            <span>49</span>
            <span>15.61</span>
          </div>
          <div className={styles.sizesRow}>
            <span>5 1/4</span>
            <span>50</span>
            <span>15.92</span>
          </div>
          <div className={styles.sizesRow}>
            <span>5 3/4</span>
            <span>51</span>
            <span>16.24</span>
          </div>
          <div className={styles.sizesRow}>
            <span>6</span>
            <span>52</span>
            <span>16.56</span>
          </div>
          <div className={styles.sizesRow}>
            <span>6 1/4</span>
            <span>53</span>
            <span>16.88</span>
          </div>
          <div className={styles.sizesRow}>
            <span>6 3/4</span>
            <span>54</span>
            <span>17.20</span>
          </div>
          <div className={styles.sizesRow}>
            <span>7 1/4</span>
            <span>55</span>
            <span>17.52</span>
          </div>
          <div className={styles.sizesRow}>
            <span>7 1/2</span>
            <span>56</span>
            <span>17.83</span>
          </div>
          <div className={styles.sizesRow}>
            <span>8</span>
            <span>57</span>
            <span>18.15</span>
          </div>
          <div className={styles.sizesRow}>
            <span>8 1/4</span>
            <span>58</span>
            <span>18.47</span>
          </div>
          <div className={styles.sizesRow}>
            <span>8 3/4</span>
            <span>59</span>
            <span>18.79</span>
          </div>
          <div className={styles.sizesRow}>
            <span>9</span>
            <span>60</span>
            <span>19.11</span>
          </div>
          <div className={styles.sizesRow}>
            <span>9 1/2</span>
            <span>61</span>
            <span>19.43</span>
          </div>
          <div className={styles.sizesRow}>
            <span>10</span>
            <span>62</span>
            <span>19.75</span>
          </div>
          <div className={styles.sizesRow}>
            <span>10 1/4</span>
            <span>63</span>
            <span>20.06</span>
          </div>
          <div className={styles.sizesRow}>
            <span>10 3/4</span>
            <span>64</span>
            <span>20.38</span>
          </div>
          <div className={styles.sizesRow}>
            <span>11</span>
            <span>65</span>
            <span>20.70</span>
          </div>
          <div className={styles.sizesRow}>
            <span>11 1/2</span>
            <span>66</span>
            <span>21.02</span>
          </div>
          <div className={styles.sizesRow}>
            <span>11 3/4</span>
            <span>67</span>
            <span>21.34</span>
          </div>
          <div className={styles.sizesRow}>
            <span>12 1/4</span>
            <span>68</span>
            <span>21.66</span>
          </div>
          <div className={styles.sizesRow}>
            <span>12 1/2</span>
            <span>69</span>
            <span>21.97</span>
          </div>
          <div className={styles.sizesRow}>
            <span>13</span>
            <span>70</span>
            <span>22.29</span>
          </div>
          <div className={styles.sizesRow}>
            <span>13 1/4</span>
            <span>71</span>
            <span>22.61</span>
          </div>
          <div className={styles.sizesRow}>
            <span>13 3/4</span>
            <span>72</span>
            <span>22.93</span>
          </div>

        </div>
        
        
      </div>
    </div>
  )
}
