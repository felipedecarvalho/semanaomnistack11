import React from 'react';

export default function Header( props ){
    //OBS acima = ao inves de usar "props", pode usar direto uma propriedade especifica : function Header( {children} )

    return (

        //DUAS formas de usar o parametro "props" : 
        
        //1) se o texto vier na propriedade "title" do componente, usa :  props.title
        //<header>
        //    <h1>{props.title}</h1>
        //</header>
        
        //2) se o texto vier dentro do componente, usa :  props.children
        <header>
            <h1>{props.children}</h1>
        </header>

        //OBS : se o texto vier dentro do componente, e usar uma propriedade específica no metodo , usa apenas :  children
        //<header>
        //    <h1>{children}</h1>
        //</header>

    );
}

