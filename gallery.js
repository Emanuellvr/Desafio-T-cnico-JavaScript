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
                    const colum0 = document.createElement("td");
                    colum0.innerHTML = album.id;
                    const colum1 = document.createElement("td");
                    colum1.innerHTML = album.title;
                    const colum2 = document.createElement("td");
                    colum2.innerHTML = `<a type="button" href="album.html?id=${album.id}" class="btn btn-sm btn-outline-dark" role="button">SEE PHOTOS</a>`;

                    table.appendChild(row);
                    row.appendChild(colum0);
                    row.appendChild(colum1);
                    row.appendChild(colum2);
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

