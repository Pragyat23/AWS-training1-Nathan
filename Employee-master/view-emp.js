fetch(''https://f1uosf84o4.execute-api.us-east-2.amazonaws.com/default/EmpAPI'')
  .then(response => response.json())
  .then(data => displayData(data));

const EmpContainer = document.getElementById('EmpContainer');

const displayData = data => {
  const items = data.Items;
  items.sort((a, b) => a.EmpId.S > b.EmpId.S);
  items.forEach(Emp => {
    const EmpId = Emp.EmpId.S;
    const Name = Emp.Name.S;
    const Gender = Emp.Gender.S;
    const Email = Emp.Email.S;
    bookContainer.insertAdjacentHTML('beforeend', `
      <tr>
        <th>${EmpId}</th>
        <td>${Name}</td>
        <td>${Gender}</td>
	<td>${Email}</td>
      </tr>
    `);
  });
}

function sortTable() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("myTable");
  switching = true;
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TH")[0];
      y = rows[i + 1].getElementsByTagName("TH")[0];
      //check if the two rows should switch place:
      if (Number(x.innerHTML) > Number(y.innerHTML)) {
        //if so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}