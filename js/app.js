//hider preloader

//window event listener


eventListeners(); //call function
function eventListeners(){
  const ui = new UI()

  //preloader
  window.addEventListener('load',function(){
    ui.hidePreloader();
  })

  //nav button
  document.querySelector('.navBtn').addEventListener('click', function(){
    ui.showNav();
  })

  //Control video
  document.querySelector('.video_switch').addEventListener('click', function(){
    ui.videoControls();
  })

  //submit
  document.querySelector('.drink-form').addEventListener('submit', function (event){
    event.preventDefault();
    const name = document.querySelector('.input-name').value;
    const lastName = document.querySelector('.input-lastname').value;
    const email = document.querySelector('.input-email').value;
    const password = document.querySelector('.input-password').value;
    const confirmPassword = document.querySelector('.input-confirm-password').value;

    let value = ui.checkEmpty(name, lastName, email, password, confirmPassword);

    if(value){
      let passwordValid = ui.validatePassword(password, confirmPassword);

      if(passwordValid){
      //customer object
      let customer = new Customer(name, lastName, email, password, confirmPassword);
      console.log(customer);
      ui.addCustomer(customer);
      ui.showFeedback('Customer Added to the list', 'success');
      ui.clearFields();
      }
    else{
      ui.showFeedback('Passwords do not match', 'error');
    }  
    }else{
      ui.showFeedback('Form has not been filled out correctly', 'error');
    }

  })
}


function UI() {
  
}

UI.prototype.hidePreloader = function(){
  document.querySelector('.preloader').style.display= "none";
}

UI.prototype.showNav = function(){
  document.querySelector('.nav').classList.toggle('nav--show')
}

//play or pause video
UI.prototype.videoControls = function(){
  let btn = document.querySelector('.video_switch-btn');
  if(!btn.classList.contains('buttonSlide')){
    btn.classList.add('buttonSlide')
    document.querySelector('.video_item').pause()
  }
  else{
    btn.classList.remove('buttonSlide')
    document.querySelector('.video_item').play()
  }
}



//Check for empty values
UI.prototype.checkEmpty = function(name, lastName, email, password, confirmPassword){
  let result; 
  if(name === '' || lastName === '' || email === '' || password === '' || confirmPassword === ''){
    result = false;
  }
  else{
    result = true;
  }
  return result;
}

//Show Feedback
UI.prototype.showFeedback = function(text, type){
  const feedback = document.querySelector('.drink-form_feedback');

  if(type === 'success'){
    
    feedback.classList.add('success');
    feedback.innerText = text;
    this.removeAlert('success');
  }
  else if(type === 'error'){
    
    feedback.classList.add('error');
    feedback.innerText = text;
    this.removeAlert('error');
  }
}

//Remove alert
UI.prototype.removeAlert = function(type) {
  setTimeout(function() {
    document.querySelector('.drink-form_feedback').classList.remove(type);
  }, 3000);
}

// Add customer
UI.prototype.addCustomer = function(customer){
  const images = [1, 2, 3, 4, 5];
  let random = Math.floor(Math.random() * images.length);
  const div = document.createElement('div');
  div.classList.add('person');
  div.innerHTML = `<img src="img/person-${random}.jpeg" alt="person" class="person_thumbnail">
            <h4 class="person_name">${customer.name}</h4>
            <h4 class="person_last-name">${customer.lastName}</h4>`
  document.querySelector('.drink-card_list').appendChild(div)
}

//clear fields
UI.prototype.clearFields = function(){
  document.querySelector('.input-name').value = '';
  document.querySelector('.input-lastname').value = '';
  document.querySelector('.input-email').value = '';
  document.querySelector('.input-password').value = ''; // Clear password field
  document.querySelector('.input-confirm-password').value = ''; // Clear confirm password field
}

//Validate Password
UI.prototype.validatePassword = function (password, confirmPassword){
  return password === confirmPassword;
}

//
function Customer(name, lastName, email, password){
  this.name = name;
  this.lastName = lastName;
  this.email = email;
  this.password = password;
}