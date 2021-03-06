// o _app.tsx no next é um component que deve conter 
// componentes que se repetem em todas as páginas do site 
// como header, footer, sidebar etc.

import { ChalengesProvider } from "../contexts/ChalengesContext";
import "../styles/global.css";

function MyApp({ Component, pageProps }) {
  return (
    <Component {...pageProps} />
  );
}

export default MyApp
