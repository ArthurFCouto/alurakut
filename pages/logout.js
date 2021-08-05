import nookies from 'nookies';

export default function logout() { 
  nookies.destroy(null, 'USER_TOKEN');
  return(
    <div>
      Você deslogou!<br />
      <a href="/">Clique aqui</a>
    </div>
  )
}