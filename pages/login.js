import React from 'react';
import { useRouter } from 'next/router';
import nookies from 'nookies'; //Biblioteca para utilizar cookies

export default function LoginScreen() {
  const router = useRouter(); //Biblioteca do next para gerenciar rotas (URL)
  const [ gitHubUser, setGitHubUser ] = React.useState("");

  const [ alert, setAlert ] = React.useState("");
  const [ color, setColor ] = React.useState("black");

  nookies.destroy(null, 'USER_TOKEN');

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
          <form className="box" onSubmit={ async (infosDoEvento) => {
                infosDoEvento.preventDefault(); //Evitando recarregar a página após o onSubmit
                setColor("black");
                //Um alerta para o usuário, irá aparecer abaixo do campo de login
                setAlert("Validando usuário...");
                //Validando se o usuário não deixou o campo em branco
                if(gitHubUser.trim().length === 0) {
                  setColor("red");
                  setAlert("Digite um usuário!");
                  return
                }

                //Verificando se o usuário existe
                const { message } = await fetch(`https://api.github.com/users/${gitHubUser}`)
                .then((response) => response.json());
                //Caso o usuário não exista, informaremos ao usuário *O return é para já encerrarmos a função por aqui
                if(message === "Not Found") {
                  setColor("red");
                  setAlert("Digite um usuário válido!");
                  setGitHubUser("");
                  return
                } else {
                  setColor("black");
                  setAlert("Redirecionando...");
                }

                //Função para logar o usuário, salvar as informações em cookies e redirecionar
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
            <button type="submit">
              Login
            </button>
            <p>
              <strong style={{color: color}}>{alert}</strong>
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