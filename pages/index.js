import MainGrid from './../src/components/MainGrid';
import Box from './../src/components/Box';
import { AlurakutMenu, OrkutNostalgicIconSet } from './../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from './../src/components/ProfileRelations';

export default function Home() {
  const gitHubUser = 'arthurfcouto';
  const pessoasFavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho',
  ]

  function ProfileSlideBar(props) {
    console.log(props);
    return (
      <Box>
        <img src={`https://github.com/${props.gitHubUser}.png`} style={{borderRadius: '8px'}}/>
      </Box>
    )
  }

  return (
    <>
      <AlurakutMenu />
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
        </div>
        <div className="profileRelationArea" style={{gridArea: 'profileRelationArea'}}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da área ({pessoasFavoritas.length}) 
            </h2>
            <ul>
            {pessoasFavoritas.map((itemAtual) => {
              return (
                <li>
                  <a href={`/users/${itemAtual}`} key={itemAtual}>
                    <img src={`https://github.com/${itemAtual}.png`} />
                    <span>{itemAtual}</span>
                  </a>
                </li>
              )}) /*Usa-se o método map porque ele transforma uma Array, enquanto o foreach apenas percorre. O método map sempre vai retornar a mesma quantidade de objetos do array */ }
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}
