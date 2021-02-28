import Document, { Head, Main, Html, NextScript } from "next/document";

// o Document só carrega uma vez
// assim é recomendado usalo para abrigar 
// conteúdos que só é necessário uma vez o carregamento
// como fontes, estilos, icones etc.
// a documentação recomenda o uso de componente baseado em classe para este caso
export default class MyDocument extends Document {
  public render() {
    return (
      <Html>
      {
        /* o head do next é o que vai ser colocado head transpilado do html onde deve ser 
           colocado coisas como fontes, icones, css etc.
        */
      }
        <Head>
          {/* é jsx, entao é preciso fechar a tag /> */}
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@500;600&family=Rajdhani:wght@600&display=swap" rel="stylesheet" /> 
          <link rel="shortcut icon" href="favicon.png" type="image/png"/>
        </Head>
        <body>
          {/* onde vai ficar a aplicação */}
          <Main />
          {/* scripts injetados do next */}
          <NextScript />
        </body>
      </Html>
    );
  }
}