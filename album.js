/**
 * Request all photos from an album and list in a grid
 */
$( document ).ready(
    function generateTable() {

        albumId = window.location.search.substring(4);0   
        albumDiv = document.getElementById('album');        
        album_name = document.getElementById('album_name');
        album_name.innerHTML = `<strong>Album ${albumId}</strong>`

        url = `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`;
        fetch(url)
            .then(response => response.json())
            .then(album => {                  
                //order gallery by title             
                album.sort((a, b) => {
                    return a.title.localeCompare(b.title);
                });                
                // get the json as an album and insert in html each photo from it
                album.forEach(photo => {

                    const div1 = document.createElement("div");  
                    div1.className = "col-sm-6 col-md-4 col-lg-3 photo";                                      
                    const div2 = document.createElement("div");  
                    div2.className = "card mb-3 box-shadow";
                    div2.id = "container_photo";
                    const img = document.createElement("img");                
                    img.src = photo.url
                    const title = document.createElement("div");                     
                    title.className = "bottom-center";
                    title.innerHTML = photo.title;
                    title.id = "title";
                    
                    albumDiv.appendChild(div1);
                    div1.appendChild(div2);
                    div2.appendChild(img);
                    div2.appendChild(title);
                                        
                }); 
            })  
            .catch((error) => {                              
                const divError = document.createElement("div");  
                divError.className = "col-sm-12 photo";
                divError.innerHTML = 'There has been a problem with your data';
                albumDiv.appendChild(divError);
            });  
    }
);

/**
 * Sort list of photos by name, changing between asc and desc
 */
function sortListDir() {
    var list, i, switching, b, shouldSwitch, dir, switchcount = 0;
    list = document.getElementById("album");
    switching = true;    
    // Set the sorting direction to ascending:
    dir = "asc";
    // Make a loop that will continue until no switching has been done:
    while (switching) {
      // Start by saying: no switching is done:
        switching = false;
        b = list.getElementsByClassName("photo");
        
        // Loop through all list-items:
        for (i = 0; i < (b.length - 1); i++) {
            // Start by saying there should be no switching:
            shouldSwitch = false;
            /* Check if the next item should switch place with the current item,
            based on the sorting direction (asc or desc): */
            if (dir == "asc") {
                if (b[i].firstChild.lastChild.innerHTML.toLowerCase() > b[i + 1].firstChild.lastChild.innerHTML.toLowerCase()) {
                    /* If next item is alphabetically lower than current item,
                    mark as a switch and break the loop: */
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (b[i].firstChild.lastChild.innerHTML.toLowerCase() < b[i + 1].firstChild.lastChild.innerHTML.toLowerCase()) {
                    /* If next item is alphabetically higher than current item,
                    mark as a switch and break the loop: */                    
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            /* If a switch has been marked, make the switch
            and mark that a switch has been done: */
            b[i].parentNode.insertBefore(b[i + 1], b[i]);
            switching = true;
            // Each time a switch is done, increase switchcount by 1:
            switchcount ++;
        } else {
            /* If no switching has been done AND the direction is "asc",
            set the direction to "desc" and run the while loop again. */
            if (switchcount == 0 && dir == "asc") {
            dir = "desc";
            switching = true;
            }
        }
    }
        
    // Add an arrow in the ordering direction
    btn = document.getElementById("arrow");    
    if (dir == "asc") {       
        btn.className = ""; 
        btn.classList.add("ps-2", "fa", "fa-caret-down");        
    }
    else {                
        btn.className = "";
        btn.classList.add("ps-2", "fa", "fa-caret-up");
    }
}