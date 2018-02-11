import React from 'react'
import Backpack from '../../../../icons/backpack.svg';


const description = 'Application logo';
const metadata = {
  width: 50,
  height: 50,
  src: Backpack
};

export default () => <img {...metadata} alt={description}/>
