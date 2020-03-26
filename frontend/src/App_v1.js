import React, { useState } from 'react';

import Header  from './Header';
import Logon  from './pages/Logon';

//App() = é um componente no React é uma funcao que retorna HTML (JSX), javascript, css...
//JSX = é um HTML dentro do javascript
function App() {

  //conceito de ESTADO
  const [counter, setCounter] = useState(0); //retorna um Array [ valor , funcaoDeAtualizacaoDoValor ]

  function increment(){
    setCounter(counter + 1);
    console.log(counter);
  }

  return (
        //TRES formas de exibir o texto : 
        
        //1) texto direto numa tag de HTML = <h1>texto</h1> : 
        //<h1>Hello OmniStack !!!</h1>
        
        //2) texto na propriedade "title" do componente : 
        // <Header title="Semana OmniStack !!!"/>
        
        //3) texto dentro do componente :
        //<Header>
        //      Semana OmniStack !!!
        //</Header>

        //sobre conceito de ESTADO de variaveis :
        <div>
          <Header>Contador : {counter}</Header>        
          <button onClick={increment}>Incrementar</button>

          <Logon />
          
        </div>
  );
}

export default App;
