const form = document.getElementById('deleteEmpForm');
form.addEventListener('submit', e => {
  e.preventDefault();
  const EmpId = document.getElementById('EmpId').value;
  fetch('https://f1uosf84o4.execute-api.us-east-2.amazonaws.com/default/EmpAPI', {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    method: 'DELETE',
    body: JSON.stringify({
      'EmpId': EmpId
    })
  }).then(() => {
    form.reset();
    alert('Employee has been deleted!');
  });
});