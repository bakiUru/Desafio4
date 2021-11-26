//CAPTURO EL EVENTO 
document.addEventListener('submit', (event=>{
    event.preventDefault();
    //prueba
    let title = document.getElementById('title').value;
    let price = document.getElementById('price').value;
    let category = document.getElementById('category').value;
    let description = document.getElementById('textarea').value;

    console.log(title);
    //fin prueba
    //let form = document.getElementById('form_product');
    //let formData = new FormData(form);
    let data = {
        title: title,
        price: price,
        category: category,
        description: description,
    }
    fetch('/api/products',{
        method: 'POST',
        body: data,

    }).then(result=>{
        console.log(result);
        return result.json();
    }).then(json=>{
        Swal.fire({
            icon: 'success',
            title: 'Se Guardo el Producto' + json.message,
            showConfirmButton: false,
            timer: 3000
          })
    }).then(result=>{
        location.href='/';
    })
}))

