
const form = document.getElementById('color-form-setting')
const footer = document.getElementById('footer-section')
const main =document.getElementById('main-section')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const colorHex = document.getElementById('color-picker').value.slice(1)
    const mode =  document.getElementById('scheme-mode').value.toLowerCase()

    fetch(`https://www.thecolorapi.com/scheme?hex=${colorHex}&format=jaon&mode=${mode}&count=5`)
    .then(res => res.json())
    .then(data => {
        const colorArr= data.colors
        render(colorArr)
    })
})

function render(colorsArr) {
        let colorBarHtml=''
        let colorHexHtml=''
    
        for (let color of colorsArr){
            const hex = color.hex.value
            colorBarHtml+=`<div role="img" 
            aria-label="" 
            class="color-preview" 
            data-colorhex="${hex}"
            style= "background-color:${hex};"></div> `
            colorHexHtml+=`<h3 
            class="color-hex" 
            id="first-hex"
            data-colorhex="${hex}">${hex}</h3>`    
       }
    main.innerHTML=colorBarHtml
    footer.innerHTML=colorHexHtml
}

document.addEventListener('click', (e)=>{
    const hex = e.target.dataset.colorhex
    if(hex){
        navigator.clipboard.writeText(`${hex}`)
        alert("Hex color copied")
    }
})