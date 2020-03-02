let movies= document.getElementsByClassName("card");

function toogleTitle(card, pDisplay )
{

    let num= card.id.split('-')[1];
        let idTitle= "title-"+num
        let title= document.getElementById(idTitle);
        title.style.opacity=pDisplay;
}

function titles(path, opa)
{  
        
        let filtro=path.filter((i)=>{
            return i.id && i.id.includes("contenedor");
        });
        
        let card= filtro[0];
         
        toogleTitle(card, opa);
        
        
    
}

for( var movie of movies)
{
    movie.onmouseover = (e)=>{
        /*titles(e.path,'0');*/
        toogleTitle(e.target,'0');
    }
    movie.onmouseout = (e)=>{
        /*titles(e.path,'1');*/
        toogleTitle(e.target,'1');
    }
}