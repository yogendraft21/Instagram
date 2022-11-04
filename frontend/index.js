import {navbar} from './component/navbar.js'

import {append} from './scripts/append.js'

let navbar_div  = document.getElementById("navbar")
navbar_div.innerHTML = navbar();


let posts_div = document.getElementById("posts")
const getData = async()=>{
    let res = await fetch('https://shrouded-tundra-74694.herokuapp.com/posts')

    let data = await res.json()

    append(data,posts_div)
}
getData();