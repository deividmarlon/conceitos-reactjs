import React, {useState,useEffect} from "react";

import api from "services/api";

import "./styles.css";

function App() {

  const [repositories,setRepositories] = useState ([]);

  
  useEffect(()=>{
      api.get('/repositories').then(response =>{ 
        setRepositories(response.data); 
      });
  },[])



  async function handleAddRepository() {

    const response = await api.post('/repositories', {
      title : `Conceitos ${Date.now()}`, 
      url:  "teste.com/conceitos-reactnative", 
      techs: ["Node.js", "..."], 
      likes: 0
    })

    if(response.data){
      setRepositories([...repositories,response.data]);
    }

  }

  async function handleRemoveRepository(id) {

    const repositoryIndex = repositories.findIndex(repository=>id===repository.id);

    if(repositoryIndex>= 0){
      let new_repositories = [...repositories];

      new_repositories.splice(repositoryIndex,1);

      console.log(new_repositories);
      await api.delete(`/repositories/${id}`);

      setRepositories(new_repositories);
    }

  }

  return (
    <div>
      <ul data-testid="repository-list">
          {repositories.map(repository=>{
            return (
              <li key={repository.id}>
                {repository.title}
                <button onClick={() => handleRemoveRepository(repository.id)}>
                  Remover
                </button>
              </li>
            )
          })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
