
const pokeApi = {} 


function convertPokeApiDetailToPokemon(pokeDetail) {

    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types


    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon

}

pokeApi.getPokemonDetail = (pokemon) => {

    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)        
}

// ****** USAR A CRASE EM ALGUNS COMANDOS ATENÇÃO ******
pokeApi.getPokemons = (offset = 0, limit = 5) => {
    
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url) // BUSCANDO A LISTA
        .then((response) => response.json()) // NOS DEVELVE UM (HTTP RESPONSE) RESPOSTA CONVERTIDA EM JSON 
        .then((jsonBody) => jsonBody.results) // JSON DEVOLVIDO COM MUITA INFORMAÇÃO, FILTRADO APENAS O (RESULTS) RESULTADO
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) // LISTA DE POKEMONS MAPEADA EM LISTA DE REQUISIÇÃO DO DETALHE DOS POKEMONS,Q TBM EH CONVERTIDA EM JSON CONFORME LINHA 8. 
        .then((detailRequests) => Promise.all(detailRequests)) // AGUARDANDO TODAS AS REQUISIÇÕES TERMINAREM
        .then((pokemonsDetails) => pokemonsDetails) // DEVOLVENDO A LISTA DE DETALHE DOS POKEMONS
}
