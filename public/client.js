let degel = 0
let res = []
function handleEventChange() {
    const eventSelect = document.getElementById('event');
    const ageInputDiv = document.getElementById('ageInput');
    const ageInput = document.getElementById('age');
  
    if (eventSelect.value === 'birthday') {
      ageInputDiv.style.display = 'block';
    } else {
      ageInputDiv.style.display = 'none';
      ageInput.value = '';
    }
  }
  function rel(){
    location.reload();
    degel = 0
    res = []
    }
  function submitChoices() {
    const responseContainer = document.getElementById('responseContainer')
    const category = document.getElementById('category').value;
    const event = document.getElementById('event').value;
    const age = document.getElementById('age').value;
    const type = document.getElementById('type').value
    const obj = {
      category:category,
      type:type,
      event:event,
      age:age
    }

    responseContainer.style.display = 'block';
    responseContainer.innerHTML = `<p>please wait</p>`;
    const ageInput = document.getElementById('age');
    const categorySelect = document.getElementById('category');
    const eventSelect = document.getElementById('event');
    const typeSelect = document.getElementById('type');
    const reButton = document.getElementById("rel")
    
    categorySelect.style.display = 'none'
    eventSelect.style.display = 'none'
    typeSelect.style.display = 'none'
    ageInput.style.display = 'none';
    document.querySelector('label[for="category"]').style.display = 'none';    
    document.querySelector('label[for="event"]').style.display = 'none';    
    document.querySelector('label[for="age"]').style.display = 'none';    
    document.querySelector('label[for="type"]').style.display = 'none';   
    
    reButton.style.display = 'block'
    reButton.textContent = " emotional type: "+type+" congratulations type:"+category + ' event: '+event;
    if (age!='')
    reButton.textContent += ' age ' + age;

    document.getElementById("submitButton").innerText = "else wish"

    // Send a request to the server with the choices
    if (!degel){
      const queryString = Object.keys(obj).map(key => key + '=' + obj[key]).join('&'); 
    const finalUrl = `/get` + '?' + queryString;  
    fetch(finalUrl)
      .then(response =>response.text()
         )
      .then(data => {
        degel = 3
        res[0] = data
        res = res[0].split(degel+".")
        const responseContainer = document.getElementById('responseContainer');
        responseContainer.innerHTML = `<p>${res[1]}</p>`;
        degel-=1
      })
      .catch(error => {
        console.error('Error:', error);
      });

    }
    else{
      res = res[0].split(degel+".")
      responseContainer.innerHTML = `<p>${res[1]}</p>`;
      degel-=1;
    }
  }

  