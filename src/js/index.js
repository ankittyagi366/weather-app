const weatherForm=document.querySelector('form');
const input=document.querySelector('input');
weatherForm.addEventListener('submit',(e)=>{
    //It will prevent the browser to referesh
    e.preventDefault();
    const location=input;
    console.log('location - ' +location);
})