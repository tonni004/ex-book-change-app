import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import s from './HomePage.module.scss';
// import Bookcase from '../../images/bookcase1-removebg.png';


export default function HomePage() {
  const speed = 35;
  const descriptionText = `Heello, my dear friend! I'm delighted to see you in this wonderful app. I'm willing to bet that fate brought us together. "ex-book change" is a service where you leave the old behind and make new discoveries. Now, let's part ways with your ex-books!`;

  return (
    <div className={s.HomePageField}>
      <motion.div
        className={s.DescriptionField}
        initial={{ opacity: 0, height: 50 }}
        animate={{ opacity: 1, height: 250 }}
        transition={{ duration: 2 }}
      >
        <TypeEffect text={descriptionText} speed={speed} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, translateY: 40 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 1.5, delay: 9 }}
      >
        <h2 className={s.BtnFieldTitle}>Let's start together!</h2>
        <ul className={s.BtnLinkField}>
          <li><a href='/register'>Sign up</a></li>
          <li><a href='/login'>Login</a></li>
        </ul>
      </motion.div>
    </div>
  );
}
const TypeEffect = ({ text, speed }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText((prevText) => prevText + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);
  return <p>{displayText}</p>;
};
