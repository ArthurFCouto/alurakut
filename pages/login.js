import React from 'react';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';
import nookies from 'nookies'; //Biblioteca para utilizar cookies

async function message(githubUser){
  const { message } = await fetch(`https://api.github.com/users/${githubUser}`)
  .then((response) => response.json());
  return message;
}

export default function LoginScreen() {
  const router = useRouter(); //Biblioteca do next para gerenciar rotas (URL)
  const [ gitHubUser, setGitHubUser ] = React.useState("");

  const cookies = nookies.get(null, 'USER_TOKEN');
  const token = cookies.USER_TOKEN; 
  const decodedToken = jwt.decode(token); 
  const githubUser = decodedToken?.githubUser;
  let alert = "";

  if (!githubUser || message(githubUser) === "Not Found") {
    alert = "Digite um usuário válido!";
  }

  return (
    <main style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <div className="loginScreen">
        <section className="logoArea">
          <img src="https://alurakut.vercel.app/logo.svg" />

          <p><strong>Conecte-se</strong> aos seus amigos e familiares usando recados e mensagens instantâneas</p>
          <p><strong>Conheça</strong> novas pessoas através de amigos de seus amigos e comunidades</p>
          <p><strong>Compartilhe</strong> seus vídeos, fotos e paixões em um só lugar</p>
        </section>

        <section className="formArea">
          <form className="box" onSubmit={(infosDoEvento) => {
                infosDoEvento.preventDefault(); //Evitando recarregar a página após o onSubmit
                alert = "Validando usuário";

                //Função para verificar se o usuário existe
                fetch('https://alurakut.vercel.app/api/login', {
                    method: 'POST',
                    headers: {
                       'Content-Type': 'application/json'  
                    },
                    body: JSON.stringify({ githubUser: gitHubUser })
                })
                .then(async (respostaDoServer) => {
                    const dadosDaResposta = await respostaDoServer.json()
                    const token = dadosDaResposta.token;
                    nookies.set(null, 'USER_TOKEN', token, {
                        path: '/',
                        maxAge: 86400 * 7 
                    }) //Primeiro atributo é o contexto (em navegadores é null), o segundo é a descrição e o terceiro é a informação de fato
                    //Nas opções, o primeiro parametro é o local onde estará disponível o cookie (URL) e o segundo é o tempo de validade deste cookie (expiração) em segundos
                    router.push('/') //Ao chamar este método da função, somos redirecionados a URL definida.
                })
          }}>
            <p>
              Acesse agora mesmo com seu usuário do <strong>GitHub</strong>!
          </p>
            <input
                placeholder="Usuário"
                value={gitHubUser}
                onChange={(evento) => {
                    setGitHubUser(evento.target.value) //Estamos setando no gitHubUser os valores digitados pelo usuário
                }}
            />
            <button onclick={
              gitHubUser.length === 0
                ? null
                : true
            } type="submit">
              Login
            </button>
            <p>
              <strong >{alert}</strong>
          </p>
          </form>

          <footer className="box">
            <p>
              Ainda não é membro? <br />
              <a href="/login">
                <strong>
                  ENTRAR JÁ
              </strong>
              </a>
            </p>
          </footer>
        </section>

        <footer className="footerArea">
          <p>
            © 2021 alura.com.br - <a href="/">Sobre o Orkut.br</a> - <a href="/">Centro de segurança</a> - <a href="/">Privacidade</a> - <a href="/">Termos</a> - <a href="/">Contato</a>
          </p>
        </footer>
      </div>
    </main>
  )
} 