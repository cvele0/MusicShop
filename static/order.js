var token;
function init() {

  const cookies = document.cookie.split('=');
  token = cookies[cookies.length - 1];

  const btn1 = document.getElementById('msgBtn1');
  const btn2 = document.getElementById('msgBtn2');

  btn1.addEventListener("click", function() { // post
    input1 = document.getElementById("label1").value;

    if (input1 === "") {
        window.alert("Please fill all fields.");
        return;
    }
    const data = {
        address: input1
    };

    document.getElementById('label1').value = '';

    fetch('http://127.0.0.1:8000/admin/orders', {
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
                document.getElementById('usrLst').innerHTML += `<li>Address: ${el.address}</li>`;
            }
        });
  })

  btn2.addEventListener("click", function() { // post
    input = document.getElementById("idLabel").value;
    if (input === "") {
        window.alert("Please input id.");
        return;
    }
    const data = {
        id: input
    };

    document.getElementById('idLabel').value = '';

    fetch('http://127.0.0.1:8000/admin/orders/', {
        method: 'DELETE',
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
                // document.getElementById('usrLst').innerHTML += `<li>Country: ${el.country}</li>`;
                ucitajOrdersUListu();
            }
        });
  })

  ucitajOrdersUListu();

  document.getElementById('logout').addEventListener('click', e => {
      document.cookie = `token=;SameSite=Lax`;
      window.location.href = 'login.html';
  });
}

function ucitajOrdersUListu() {
    document.getElementById('usrLst').innerHTML = "";
    fetch('http://127.0.0.1:8000/admin/orders', { // get
      headers: {
          'Authorization': `Bearer ${token}`
      }
  })
      .then( res => res.json() )
      .then( data => {
          const lst = document.getElementById('usrLst');

          data.forEach( el => {
              lst.innerHTML += `<li>Address: ${el.address}</li>`;
          });
      });
}