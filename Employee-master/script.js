const form = document.getElementById('EmpForm');
form.addEventListener('submit', e => {
  e.preventDefault();
  const EmpId = document.getElementById('EmpId').value;
  const Name = document.getElementById('Name').value;
  const Gender = document.getElementById('Gender').value;
  const Email = document.getElementById('Email').value;
  fetch('https://f1uosf84o4.execute-api.us-east-2.amazonaws.com/default/EmpAPI', {
    headers: { "Content-Type": "application/json; charset=utf-8" },
    method: 'POST',
    body: JSON.stringify({
      "EmpId": EmpId,
      "Name": Name,
      "Gender": Gender,
	"Email": Email
    })
  }).then(() => {
    form.reset();
    alert('data has been submitted!');
  });
});
