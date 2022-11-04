import {navbar} from './component/navbar.js'

let navbar_div  = document.getElementById("navbar")
navbar_div.innerHTML = navbar();


let create_btn = document.getElementById("create_btn")
create_btn.onclick = ()=>{
    createPost();
};


let delete_btn = document.getElementById("delete_btn")
delete_btn.onclick=()=>{
    deletePost();
};
let update_btn = document.getElementById("update_btn")
update_btn.onclick=()=>{
    updatePost();
};

let inp_image = document.getElementById("image")

inp_image.onchange = ()=>{
    handleImage();
}


let image_url;
const handleImage = async()=>{
    let img = document.getElementById("image")
    let act_img = img.files[0]
    // console.log(act_img)

    let form = new FormData();

    form.append('image',act_img)
    let res = await fetch('https://api.imgbb.com/1/upload?key=f30a44ab53139a8e66d20fada6ef9be8',{
        method:'POST',
        body:form,

    });
    let data = await res.json();
    image_url = data.data.display_url;
    console.log(image_url)
}

const createPost = async()=>{
    let id = document.getElementById('id').value
    let caption = document.getElementById('caption').value

    let send_this_data = {
        id,
        caption,
        image_url,
    };

    let res = await fetch('https://shrouded-tundra-74694.herokuapp.com/posts',{
        method:'POST',
        body:JSON.stringify(send_this_data),
        headers:{
            'Content-Type':'application/json',
        }
    });
    let data = await res.json();
    console.log(data)

}

const deletePost = async()=>{

    let delete_id = document.getElementById("delete_id").value

    let res = await fetch(`https://shrouded-tundra-74694.herokuapp.com/posts/${delete_id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json'
        },
    });

    let data = await res.json()

    console.log(data)
}

const updatePost = async()=>{
    try{

        let id = document.getElementById("update_id").value;
        let new_caption = document.getElementById("update_caption").value;

    let send_this_data = {
        caption:new_caption
    }

    let res = await fetch(`https://shrouded-tundra-74694.herokuapp.com/posts/${id}`,{
        method:'PATCH',
        body:JSON.stringify(send_this_data),
        headers:{
            'Content-Type':'application/json'
        },
    })
    
    let data = await res.json()
    console.log(data)
    }
    catch(err){
        console.log(err)
    }
    
};