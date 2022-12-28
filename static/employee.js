function init() {

  const cookies = document.cookie.split('=');
  const token = cookies[cookies.length - 1];

  const btn1 = document.getElementById('msgBtn1');
  const btn2 = document.getElementById('msgBtn2');

  btn1.addEventListener("click", function() { // post
    input1 = document.getElementById("label1").value;
    input2 = document.getElementById("label2").value;

    if (input1 === "" || input2 == "") {
        window.alert("Please fill all fields.");
        return;
    }
    const data = {
        name: input1,
        surname: input2
    };

    document.getElementById('label1').value = '';
    document.getElementById('label2').value = '';

    fetch('http://127.0.0.1:8000/admin/employees', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
        .then( res => res.json() )
        .then( el => {
            if (el.msg) {
                alert(el.msg);
            } else {
                document.getElementById('usrLst').innerHTML += `<li>Name: ${el.name}, Surname: ${el.surname}</li>`;
            }
        });
  })

  fetch('http://127.0.0.1:8000/admin/employees', { // get
      headers: {
          'Authorization': `Bearer ${token}`
      }
  })
      .then( res => res.json() )
      .then( data => {
          const lst = document.getElementById('usrLst');

          data.forEach( el => {
              lst.innerHTML += `<li>Name: ${el.name}, Surname: ${el.surname}</li>`;
          });
      });

  document.getElementById('logout').addEventListener('click', e => {
      document.cookie = `token=;SameSite=Lax`;
      window.location.href = 'login.html';
  });
}