const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 100
const limit = 10
let offset = 0;


// ****** USAR A CRASE EM ALGUNS COMANDOS ATENÇÃO ( ` )******

/* "fetch" FAZ UMA REQUISÇÃO HTTP (RETORNA), BASEADO EM UMA "promise" QUE EH A PROMESSA DE UMA RESPOSTA, 
POREM O PROCESSAMENTO EH ASSICRONO E A RESPOSTA NÃO EH IMEDIATA.

."then" quando dé certo chame a função para manipular a resposta.
"cat" manipular o fracasso / error.

O "json" eh usado para converter o "body" em texto para manipular no js.*/

// pokeApi.getPokemons = REQUISIÇÃO PARA BUSCAR A LISTA DE POKEMONS
// (pokemons = []) = RECEBEMOS A LISTA 
// pokemons.map(convertPokemonToLi) = POKEMONS TRANSFORMADOS EM LISTA HTML
// join('') = JUNTOU TUDO EM UMA STRING E VIROU UM HTML, SEM SEPARADOR

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) =>
            ` <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
        
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    
                </ol>
        
                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
        
            </div>
        </li>  
            
        `).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {

        //CALCULA UM NOVO LIMITE SE O QTD FOR MAIOR Q MAXRECORDS
        const newLimit = maxRecords - offset

        //PESQUISA COM NOVO LIMITE
        loadPokemonItens(offset, newLimit)

        //  BUSCA O PAI COM (PARENTELEMENT) E DA O COMANDO DE REMOVER FILHO (LOADMOREBUTTON)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})