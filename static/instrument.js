var token;
function init() {

  const cookies = document.cookie.split('=');
    token = cookies[cookies.length - 1];

  const btn1 = document.getElementById('msgBtn1');
  const btn2 = document.getElementById('msgBtn2');
  const btn3 = document.getElementById('msgBtn3');

  btn1.addEventListener("click", function() { // post
    input1 = document.getElementById("label1").value;
    input2 = document.getElementById("label2").value;

    if (input1 === "" || input2 == "") {
        window.alert("Please fill all fields.");
        return;
    }
    const data = {
        name: input1,
        brand: input2
    };

    document.getElementById('label1').value = '';
    document.getElementById('label2').value = '';

    fetch('http://127.0.0.1:9090/admin/instruments', {
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
                document.getElementById('usrLst').innerHTML += `<li>Name: ${el.name}, Brand: ${el.brand}</li>`;
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

    fetch('http://127.0.0.1:9090/admin/instruments/', {
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
                ucitajInstrumentsUListu();
            }
        });
  })

  fetch('http://127.0.0.1:9090/admin/instruments', { // get for combobox
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then( res => res.json() )
    .then( data => {
        data.forEach( el => {
            var combobox = document.getElementById("combobox");
            let opt = document.createElement("option");
            opt.value = el.name + ";" + el.brand;
            opt.innerHTML = el.name + ";" + el.brand;
            combobox.appendChild(opt);
        });
    });

  btn3.addEventListener("click", function() { // post
    input1 = document.getElementById("modLabel1").value;
    input2 = document.getElementById("modLabel2").value;
    cb = document.getElementById("combobox").value;
    if (input1 === "" || input2 === "") {
        window.alert("Please fill all fields.");
        return;
    }
    const data = {
        name: input1,
        brand: input2,
        combobox: cb
    };

    document.getElementById('modLabel1').value = '';
    document.getElementById('modLabel2').value = '';

    fetch('http://127.0.0.1:9090/admin/instruments/', {
        method: 'PUT',
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
                ucitajInstrumentsUListu();
            }
        });
  });

  ucitajInstrumentsUListu();

  document.getElementById('logout').addEventListener('click', e => {
      document.cookie = `token=;SameSite=Lax`;
      window.location.href = 'login.html';
  });
}

function ucitajInstrumentsUListu() {
    document.getElementById('usrLst').innerHTML = "";
    fetch('http://127.0.0.1:9090/admin/instruments', { // get
      headers: {
          'Authorization': `Bearer ${token}`
      }
  })
      .then( res => res.json() )
      .then( data => {
          const lst = document.getElementById('usrLst');

          data.forEach( el => {
              lst.innerHTML += `<li>Name: ${el.name}, Brand: ${el.brand}</li>`;
          });
      });
}