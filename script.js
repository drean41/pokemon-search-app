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

const pokemonApi = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon`

const searchForPokemon = () => {
  if (searchInput.value === '') {
    alert('Preencha esse campo')
  }

  pokemonTypes.innerHTML = ''
  
  const searchNameOrId = searchInput.value.toLowerCase()

  fetchData(searchNameOrId)
}

const fetchData = async (nameOrId) => {
  try {
    // const data = await (await fetch(pokemonApi)).json()
    // console.log(data)
    // const pokemonObj = data.results.filter((obj) => {
    //   if (obj.id == nameOrId || obj.name === nameOrId) {
    //     return obj
    //   }
    // })[nameOrId - 1]

    // const dataPokemon = await (await fetch(pokemonObj.url)).json()
    // console.log(dataPokemon)

    const data = await (await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${nameOrId}/`)).json()
    console.log(data)

    showPokemon(data)

  } catch (err) {
    console.log(err)
    alert('Pokémon not found')
  }
}

const showPokemon = (obj) => {
  const {name, id, height, weight, types, stats} = obj
  console.log(weight)

  const typesArr = []
  types.forEach(el => {
    typesArr.push(el.type.name)
  })

  console.log(typesArr)

  const statsArr = []
  stats.forEach(el => {
    statsArr.push(el.base_stat)
  })
  console.log(statsArr)

  pokemon.style.display = 'block'
  pokemonName.textContent = name.toUpperCase()
  pokemonId.textContent = `#${id}`
  pokemonWeight.innerText = `Weight: ${weight}`
  pokemonHeight.textContent = `Height: ${height}`
  pokemonImg.src = obj.sprites.front_default

  typesArr.forEach(type => pokemonTypes.innerHTML += `<span>${type}</span>`)

  hp.textContent = statsArr[0]
  attack.textContent = statsArr[1]
  defense.textContent  = statsArr[2]
  specialAttack.textContent  = statsArr[3]
  specialDefense.textContent  = statsArr[4]
  speed.textContent  = statsArr[5]
}

searchBtn.addEventListener('click', searchForPokemon)