const searchInput = document.getElementById('search-input')
const searchBtn = document.getElementById('search-button')
const pokemon = document.getElementById('pokemon')
const pokemonName = document.getElementById('pokemon-name')
const pokemonId = document.getElementById('pokemon-id')
const pokemonWeight = document.getElementById('weight')
const pokemonHeight = document.getElementById('height')
const pokemonImg = document.getElementById('sprite')
const pokemonTypes = document.getElementById('types')
const hp = document.getElementById('hp')
const attack = document.getElementById('attack')
const defense = document.getElementById('defense')
const specialAttack = document.getElementById('special-attack')
const specialDefense = document.getElementById('special-defense')
const speed = document.getElementById('speed')

const searchForPokemon = () => {
  if (searchInput.value === '') {
    return alert('Preencha esse campo')
  }
  
  const searchNameOrId = searchInput.value.toLowerCase()
  fetchData(searchNameOrId)
}

const fetchData = async (nameOrId) => {
  try {
    const data = await (await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${nameOrId}/`)).json()
    showPokemon(data)

  } catch (err) {
    console.log(err)
    alert('Pokémon not found')
  }
}

const showPokemon = (obj) => {
  pokemonTypes.innerHTML = ''

  const {name, id, height, weight, sprites, types, stats} = obj

  const typesArr = []
  types.forEach(el => {
    typesArr.push(el.type.name)
  })

  const statsArr = []
  stats.forEach(el => {
    statsArr.push(el.base_stat)
  })

  pokemon.style.display = 'block'
  pokemonName.textContent = name.toUpperCase()
  pokemonId.textContent = `#${id}`
  pokemonWeight.innerText = `Weight: ${weight}`
  pokemonHeight.textContent = `Height: ${height}`
  pokemonImg.src = sprites.front_default

  typesArr.forEach(type => pokemonTypes.innerHTML += `<span>${type}</span>`)

  hp.textContent = statsArr[0]
  attack.textContent = statsArr[1]
  defense.textContent  = statsArr[2]
  specialAttack.textContent  = statsArr[3]
  specialDefense.textContent  = statsArr[4]
  speed.textContent  = statsArr[5]
}

window.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    searchForPokemon()
  }
})
searchBtn.addEventListener('click', searchForPokemon)
