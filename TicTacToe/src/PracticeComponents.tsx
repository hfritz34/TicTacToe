//import React, { useState } from 'react';


type WelcomeProps = {
    name: string;
  };
  
  export const Welcome: React.FC<WelcomeProps> = (props) => {
    return <h1>Hello, {props.name}!</h1>;
  };
  
  // Use the component
  <Welcome name="World" /> // This will render: <h1>Hello, World!</h1>


  /*
  function App(){

    const [count, setCount] = useState(4);
  
  function decrementCount(){
    setCount(prevCount => prevCount - 1);
  }
  
  function incrementCount(){
    setCount(prevCount => prevCount + 1);
  }
  
  
  
    return(
      <>
      <button onClick={decrementCount}>-</button>
      <span>{count}</span>
      <button onClick={incrementCount}>+</button>  
      </>
    )
  }
  */