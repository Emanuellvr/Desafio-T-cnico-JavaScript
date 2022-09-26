$( document ).ready(
    function generateTable() {

        var table = document.getElementById("tbody");        

        url = 'https://jsonplaceholder.typicode.com/albums';
        fetch(url)
            .then(response => response.json())
            .then(gallery => {
                //order gallery by id
                gallery.sort((a, b) => {
                    return a.id - b.id;
                });
                
                gallery.forEach(album => {
                    const row = document.createElement("tr");                
                    const column0 = document.createElement("td");
                    column0.innerHTML = album.id;
                    column0.className = "id_column";
                    const column1 = document.createElement("td");
                    column1.innerHTML = album.title;
                    column1.className = "title_column";
                    const column2 = document.createElement("td");
                    column2.innerHTML = `<a type="button" href="album.html?id=${album.id}" class="btn btn-sm btn-outline-dark px-3 py-2 border-rounded" role="button">SEE PHOTOS</a>`;
                    column2.className = "button_column";

                    table.appendChild(row);
                    row.appendChild(column0);
                    row.appendChild(column1);
                    row.appendChild(column2);
                    //console.log(element)
                });                
            })    
    }
);

function SearchFunction() {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("search_input");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");   
  console.log(table) 

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];            
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

