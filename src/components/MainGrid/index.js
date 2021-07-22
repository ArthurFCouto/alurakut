import styled from 'styled-components';
const MainGrid = styled.main`
  width: 100%;
  grid-gap: 10px;
  margin-left: auto;
  margin-right: auto;
  max-width: 500px;
  padding: 15px;

  .profileArea {
    display: none;
    @media(min-width: 860px) {
      display: block;
    }
  }

  grid-gap: 10px;
  padding: 15px;

  //Quando a tela for de no mínimo 860px, faça...
  @media(min-width: 860px) {
    max-width: 1110px;
    display: grid;
    grid-template-areas: "profileArea welcomeArea profileRelationArea"; //Definindo as três colunas do grid
    //grid-template-columns: 160px 618px 312px; //Tamanho das colunas respectivamente, no grid
    grid-template-columns: 160px 1fr 312px; //Ao utilizar 1fr estou utilizando uma fração do que tem disponível
  }
  
`;

export default MainGrid;