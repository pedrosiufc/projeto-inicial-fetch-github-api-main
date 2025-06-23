document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value;
    getUserProfile(userName);
})

document.getElementById('input-search').addEventListener('keyup', (e) => {
  const userName = e.target.value;
    // Verifica se a tecla pressionada é 'Enter' e se o campo de entrada não está vazio
  if (e.key === 'Enter' && userName) {  
    getUserProfile(userName);
  }
})

async function user(userName){
    const response = await fetch(`https://api.github.com/users/${userName}`)
    return await response.json();
}

async function repos(userName){
    const response = await fetch(`https://api.github.com/users/${userName}/repos`)
    return await response.json();
}

// function getUserProfile() {
//     user().then(data => {
//         const profile = document.querySelector('.profile-data');
//         profile.innerHTML = `
//             <img src="${data.avatar_url}" alt="${data.name}">
//             <h1>${data.name}</h1>
//             <p>${data.bio}</p>            
//         `;
//     }).catch(error => { 
//         console.error('Error fetching user data:', error);
//         const profile = document.querySelector('.profile-data');
//         profile.innerHTML = `<p>Error loading profile.</p>`;
//     });
// }


function getUserProfile(userName){  
          
    user(userName).then(userData => {
        let userInfo = `<img src="${userData.avatar_url}" alt="Foto do perfil do usuário"/>
            <div class="data">
                <h1>${userData.name ?? 'Não possui nome cadastrado '}</h1>
                <p>${userData.bio ?? 'Não possui bio cadastrada'}</p>
            </div>`

            document.querySelector('.profile-data').innerHTML = userInfo;
         
            getUserRepositories(userName);
    })
 }


function getUserRepositories(userName) {
 repos(userName).then(reposData => {
        let repositoriesItens = "";
        reposData.forEach(repo => {
            
            repositoriesItens += `<li> <a href="${repo.html_url}" target="_blank"> ${repo.name}</a></li>`;
        })
        document.querySelector('.profile-data').innerHTML += 
                                                            `<div class="repositories section">
                                                                 <h2>Repositórios</h2>
                                                                 <ul>${repositoriesItens}</ul>
                                                            </div>`;
   })
}


