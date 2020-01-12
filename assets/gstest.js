


if (!window.AAA_Library) {
    window.AAA_Library = {};
}

window.AAA_Library.callServer = function(data) {

    
    google.script.run
        .withSuccessHandler(AAA_Library.paymentComplete)
        .processPayment(data);

}

window.AAA_Library.paymentComplete = function(r) {
    try {
        var example, exampleName, formClass;

        formClass = '.' + window.AAA_Library.stripeFormClassName;
        example = document.querySelector(formClass);

        
        


        example.classList.add('submitted');      
    } catch (e) {
        

    }
}





var stripe = Stripe(STRIPE_PK); 

function registerElements(elements, exampleName) {
  var formClass = '.' + exampleName;
  var example = document.querySelector(formClass);

  var form = example.querySelector('form');
  var resetButton = example.querySelector('a.reset');
  var error = form.querySelector('.error');
  var errorMessage = error.querySelector('.message');

  function enableInputs() {
    Array.prototype.forEach.call(
      form.querySelectorAll(
        "input[type='text'], input[type='email'], input[type='tel']"
      ),
      function(input) {
        input.removeAttribute('disabled');
      }
    );
  }

  function disableInputs() {
    Array.prototype.forEach.call(
      form.querySelectorAll(
        "input[type='text'], input[type='email'], input[type='tel']"
      ),
      function(input) {
        input.setAttribute('disabled', 'true');
      }
    );
  }

  function triggerBrowserValidation() {
    
    
    var submit = document.createElement('input');
    submit.type = 'submit';
    submit.style.display = 'none';
    form.appendChild(submit);
    submit.click();
    submit.remove();
  }

  
  var savedErrors = {};
  elements.forEach(function(element, idx) {
    element.on('change', function(event) {
      if (event.error) {
        error.classList.add('visible');
        savedErrors[idx] = event.error.message;
        errorMessage.innerText = event.error.message;
      } else {
        savedErrors[idx] = null;

        
        var nextError = Object.keys(savedErrors)
          .sort()
          .reduce(function(maybeFoundError, key) {
            return maybeFoundError || savedErrors[key];
          }, null);

        if (nextError) {
          
          errorMessage.innerText = nextError;
        } else {
          
          error.classList.remove('visible');
        }
      }
    });
  });

  
  form.addEventListener('click', function(e) {
    e.preventDefault();
    

    
    
    var plainInputsValid = true; 

    Array.prototype.forEach.call(form.querySelectorAll('input'), function(
      input
    ) {
      if (input.checkValidity && !input.checkValidity()) {
        plainInputsValid = false;
        return;
      }
    });
    if (!plainInputsValid) {
      triggerBrowserValidation();
      return;
    }

    window.AAA_Library.stripeFormClassName = exampleName; 

    
    example.classList.add('submitting');

    
    disableInputs();

    
    
    
    
    
    
    

    stripe.confirmCardPayment(STRIPE_CLIENT_SECRET, {
      payment_method: {
        card: elements[0],
      }
    }).then(function(result) {
      
      example.classList.remove('submitting');
debugger;
      if (result.error) {
        
        enableInputs();
      } else {
        
        if (result.paymentIntent.status === 'succeeded') {
          AAA_Library.callServer(paymentIntent);
        }
      }
    });


    
    
    























  });

  resetButton.addEventListener('click', function(e) {
    e.preventDefault();
    
    
    form.reset();

    
    elements.forEach(function(element) {
      element.clear();
    });

    
    error.classList.remove('visible');

    
    enableInputs();
    example.classList.remove('submitted');
  });
}


(function() {
  "use strict";

  var elements = stripe.elements({
    locale: 'auto'
  });

  

  var card = elements.create("card", {
    style: {
      base: {
        color: "#32325D",
        fontWeight: 500,
        fontFamily: "Inter UI, Open Sans, Segoe UI, sans-serif",
        fontSize: "16px",
        fontSmoothing: "antialiased",

        "::placeholder": {
          color: "#CFD7DF"
        }
      },
      invalid: {
        color: "#E25950"
      }
    }
  });

  registerElements([card], "example4");
})();

