import React from 'react';
import MainGrid from './../src/components/MainGrid';
import Box from './../src/components/Box';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from './../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from './../src/components/ProfileRelations';

export default function Home() {

  const token = '885021727ca3f1b4708b911ec910be'
  const gitHubUser = `arthurfcouto`;

  const [comunidadesFavoritas, setComunidadesFavoritas] = React.useState([]); /*React.useState([{
    id: new Date().toISOString(),
    title: `Eu odeio acordar cedo`,
    image: `https://img10.orkut.br.com/community/52cc4290facd7fa700b897d8a1dc80aa.jpg`
  }]);*/ //Criando uma comunidade padrão com no mínimo este elemento

  const pessoasFavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho',
  ] //Criando um Array com os usuários já pré-definidos

  const [seguidores, setSeguidores] = React.useState([]);

  React.useEffect(function(){
    //fetch com método GET
    fetch(`https://api.github.com/users/${gitHubUser}/followers`)
    .then(function (respostaDoServidor) { //Neste primeiro then recebemos a resposta e convertemos em Json
      return respostaDoServidor.json();
    })
    .then(function (respostaConvertida) { //Neste segundo then, ele será executado depois que o primeiro estiver pronto, dai sim setamos a resposta convertida
      setSeguidores(respostaConvertida);
    })

    //Fazendo requisição em graphql
    fetch(`https://graphql.datocms.com/`, {
      method: 'POST',
      headers: {
        'Authorization' : token,
        'Content-Type' : 'application/json',
        'Accept' : 'application/json'
      },
      body: JSON.stringify({ "query": `query {
        allCommunities {
         id
         title
         imagemUrl
         creatorSlug
       }
       }`})
    })
    .then((response) => response.json())
    .then((responseFull) => {
      const comunidade = responseFull.data.allCommunities;
      setComunidadesFavoritas(comunidade);
    })
  }, []); //O useEffect é um interceptador de mudanças na execução, passamos uma array vazia como parâmetro para que ele seja executado apenas uma vez.

  function ProfileSlideBar(props) { //Esta função esta recebendo propriedades (props)
    return (
      <Box as="aside">
        <img src={`https://github.com/${props.gitHubUser}.png`} style={{borderRadius: '8px'}}/>
        <hr />
        <p>
          <a className="boxLink" href={`https://github.com/${props.gitHubUser}`}>
            @{props.gitHubUser}
          </a>
        </p>
        <br />

        <AlurakutProfileSidebarMenuDefault />
      </Box>
    )
  }

  function ProfileRelationsBox(props) {
    return (
      <ProfileRelationsBoxWrapper>
        <h2 className="smallTitle">
          {props.title} ({props.itens.length}) 
        </h2>
        <ul>
        {/*pessoasFavoritas.map((itemAtual) => {
          return (
            <li key={itemAtual}>
              <a href={`/users/${itemAtual}`}>
                <img src={`https://github.com/${itemAtual}.png`} />
                <span>{itemAtual}</span>
              </a>
            </li>
          )})*/}
        </ul>
      </ProfileRelationsBoxWrapper>
    )
  }

  return (
    <>
      <AlurakutMenu githubUser={gitHubUser} /*Enviando a variável do nome do git hub*/ />
      <MainGrid>
        <div className="profileArea" style={{gridArea: 'profileArea'}}>
          <ProfileSlideBar gitHubUser={gitHubUser} /*Enviando a variável do nome do git hub*/ />
        </div>
        <div className="welcomeArea" style={{gridArea: 'welcomeArea'}}>
          <Box>
            <h1 className="title">
              Bem vindo (a)
            </h1>
            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            
            <form onSubmit={ function handleCriarComunidade(e) {
              e.preventDefault(); //Evita o refresh da página após um submit
              const dadosDoForm = new FormData(e.target); //Cria um objeto para ter acesso aos dados do formulário
              //const comunidade = {
                //id: new Date().toISOString(),
                //title: dadosDoForm.get('title'), //Pegando os dados do formulário
                //imagemUrl: dadosDoForm.get('imagemUrl'), //Pegando os dados do formulário
                //creatorSlug: dadosDoForm.get('creatorSlug') //Pegando os dados do formulário
              //};
              const comunidade = {
                title: dadosDoForm.get('title'),
                imagemUrl: dadosDoForm.get('imagemUrl'),
                creatorSlug: dadosDoForm.get('creatorSlug')
              }
              console.log(comunidade); //Exibindo o objeto criado a partir dos dados do formulário
              fetch('/api/comunidades', {
                method: 'POST',
                headers: {
                  'Content-Type' : 'application/json',
                },
                body: JSON.stringify(comunidade)
              })
              .then(async (response) => {
                const dados = await response.json();
                const comunidadeAux = dados.registroCreate;
                console.log(comunidadeAux);
                const comunidadesAtualizadas = [... comunidadesFavoritas, comunidadeAux]; //Criando uma nova constante onde, adiciono dos dados do array antigo e somo com o novo
                setComunidadesFavoritas(comunidadesAtualizadas);
              })
            }}>
              <div>
                <input
                  autoComplete="off"
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  area-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                  required/>
              </div>
              <div>
                <input
                  placeholder="Coloque uma url para usar como capa."
                  name="imagemUrl"
                  area-label="Coloque uma url para usar como capa."
                  required/>
              </div>
              <div>
                <input
                  placeholder="Usuário"
                  name="creatorSlug"
                  value={gitHubUser}
                  area-label={gitHubUser}
                  type="hidden"/>
              </div>
              <button>
                Criar Comunidade
              </button>
            </form>
          </Box>
        </div>
        <div className="profileRelationArea" style={{gridArea: 'profileRelationArea'}}>
          <ProfileRelationsBox title="Seguidores" itens={seguidores}/>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({comunidadesFavoritas.length}) {/*Quantidade de comunidades salvas no array*/}
            </h2>
            <ul>
            {comunidadesFavoritas.slice(0,6).map((itemAtual) => { //Percorrendo todas as comunidades e passando uma a uma no map
              return (
                <li  key={itemAtual.id}> {/*Chave para identificar em qual comunidade estou (deve ser única)*/}
                  <a href={`#/users/${itemAtual.id}`}>
                    <img src={`${itemAtual.imagemUrl}`} />
                    <span>{itemAtual.title}</span>
                  </a>
                </li>
              )}) /*Usa-se o método map porque ele transforma uma Array, enquanto o foreach apenas percorre. O método map sempre vai retornar a mesma quantidade de objetos do array */ }
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da área ({pessoasFavoritas.length}) 
            </h2>
            <ul>
            {pessoasFavoritas.slice(0,6).map((itemAtual) => {
              return (
                <li key={itemAtual}>
                  <a href={`https://github.com/${itemAtual}`}>
                    <img src={`https://github.com/${itemAtual}.png`} />
                    <span>{itemAtual}</span>
                  </a>
                </li>
              )})}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}
