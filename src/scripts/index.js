import { getUser } from "/src/scripts/services/user.js";
import { getRepositories } from "/src/scripts/services/repositories.js";

import {user} from "/src/scripts/objetcs/user.js";
import { screen } from "/src/scripts/objetcs/screen.js";

document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value;
    getUserData(userName);
})

document.getElementById('input-search').addEventListener('keyup', (e) => {
  const userName = e.target.value;
    // Verifica se a tecla pressionada é 'Enter' e se o campo de entrada não está vazio
  if (e.key === 'Enter' && userName) {  
    getUserData(userName);
  }
})

async function getUserData(userName){  

    const userResponse = await getUser(userName)
    const repositoriesResponse = await getRepositories(userName)
    
    user.setInfo(userResponse);
    user.setRepositories(repositoriesResponse)
    

    screen.renderUser(user);
          
    
}

