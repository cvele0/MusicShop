function init() {

  const cookies = document.cookie.split('=');
  const token = cookies[cookies.length - 1];

  const btn1 = document.getElementById('msgBtn1');
  const btn2 = document.getElementById('msgBtn2');

  btn1.addEventListener("click", function() { // post
    input1 = document.getElementById("country1").value;
    if (input1 === "") {
        window.alert("Please input country name.");
        return;
    }
    const data = {
        country: input1
    };

    document.getElementById('country1').value = '';

    fetch('http://127.0.0.1:8000/admin/countries', {
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
                document.getElementById('usrLst').innerHTML += `<li>Country: ${el.country}</li>`;
            }
        });
  })

  fetch('http://127.0.0.1:8000/admin/countries', { // get
      headers: {
          'Authorization': `Bearer ${token}`
      }
  })
      .then( res => res.json() )
      .then( data => {
          const lst = document.getElementById('usrLst');

          data.forEach( el => {
              lst.innerHTML += `<li>Country: ${el.country}</li>`;
          });
      });

  /*fetch('http://127.0.0.1:8000/admin/messages', {
      headers: {
          'Authorization': `Bearer ${token}`
      }
  })
      .then( res => res.json() )
      .then( data => {
          const lst = document.getElementById('msgLst');

          data.forEach( el => {
              lst.innerHTML += `<li>ID: ${el.id}, Body: ${el.body}, User: ${el.user.id}</li>`;
          });
      });*/

  /*document.getElementById('msgBtn').addEventListener('click', e => {
      e.preventDefault();

      const data = {
          body: document.getElementById('body').value
      };

      document.getElementById('body').value = '';

      fetch('http://127.0.0.1:8000/api/messages', {
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
                  document.getElementById('msgLst').innerHTML += `<li>ID: ${el.id}, Body: ${el.body}</li>`;
              }
          });
  });*/

  document.getElementById('logout').addEventListener('click', e => {
      document.cookie = `token=;SameSite=Lax`;
      window.location.href = 'login.html';
  });
}