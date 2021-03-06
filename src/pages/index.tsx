// o arquivo index geralmente é a página home do next
// aqui podemos acessar o backend next.js inclusive
import CompletedChalenges from "../components/CompletedChalenges";
import Countdown from "../components/Countdown";
import ExperienceBar from "../components/ExperienceBar";
import Profile from "../components/Profile";
import styles from "../styles/pages/Home.module.css";
import Head from "next/head";
import ChalengeBox from "../components/ChalengeBox";
import { CountdownProvider } from "../contexts/CountdownContext";
import { GetServerSideProps } from "next";
import React from "react";
import { ChalengesProvider } from "../contexts/ChalengesContext";

interface HomeProps {
  level: number;
  currentXp: number;
  chalengesCompleted: number;
};

// as props recebidas aqui são as props retornadas da funcao getServerSideProps
// obs: toda chamada a api externa dentro do componente será feita pelo cliente
export default function Home({ level, chalengesCompleted, currentXp } : HomeProps) {
  console.log("Esta mensagem é exibida no browswer");
  console.log("props rebidas do server next.js");
  console.log("level: ", level);
  console.log("chalengesCompleted: ", chalengesCompleted);
  console.log("currentXp: ", currentXp);
  return (
    <ChalengesProvider 
      level={level} 
      chalengesCompleted={chalengesCompleted} 
      currentXp={currentXp}  
    >
      <div className={styles.container}>
        {/* o Head do next serve para injetarmos coisas dentro do head final do html */}
        {/* isto pode ser feito em qualquer lugar da aplicação */}
        <Head>
          <title>Início | Move.it</title>
        </Head>
        <ExperienceBar />
        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChalenges />
              <Countdown />
            </div>
            <div>
              <ChalengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChalengesProvider>
  );
}

// esta funcao faz o servidor next.js buscar os dados de APIs externas
// antes de mandar a página pro browser, 
// tirando assim do client a responsabilidade de chamar a api externa
// quem chamará vai ser o servidor next.js
// entao antes da página ser renderizada no cliente
// o template html vai vir pronto, pois foram chamados nesta funcao
// esta funcao define quais dados serao passados da camada do 
// next.js para a camada frontend react
// o nome da função tem que ser exatamente esse
// e obrigatoriamente tem de ser uma funcao assincrona
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // os cookies vindos da requisição http para os next server
  const { level, currentXp, chalengesCompleted } = ctx.req.cookies;

  console.log("esta mensagem é exibida no servidor do Next.js");

  return {
    props: {
      // colocando um + antes da string converte em number
      // mas não é tão recomendado por ser dificil de entender pra quem não vem do js
      level: +level,
      currentXp: +currentXp,
      chalengesCompleted: +chalengesCompleted,
    }
  };
}
