import React, { useState } from 'react';

import style from './AppWrapper.module.css';

// CUSTOM COMPONENTS
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

function AppWrapper(props) {
  const [count, setCount] = useState(0);

  return (
    <div className={style.site}>
      <header className={style['site-hd']}>
        <Nav />
      </header>
      <main className={style['site-bd']}>{props.children}</main>
      <footer className={style['site-ft']}>
        <Footer />
      </footer>
    </div>
  );
}

export default AppWrapper;
