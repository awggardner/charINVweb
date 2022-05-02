(function() {
    const dataTable = document.querySelector('#data-table');
    const dataForm = document.querySelector('#data-form');

    function createCharacterFromFormObj(dataObject) {
        const character = new Character(dataObject.name, dataObject.age, dataObject.genderIdentity, dataObject.species);
        return character;
    }

    function create() {
        const formData = new FormData(dataForm);
        const formDataObject = Object.fromEntries(formData.entries());
        
        fetch('http://localhost:8090/character', {
            method: 'POST',
            body: JSON.stringify(createCharacterFromFormObj(formDataObject), console.log(formDataObject)),
            headers: {
                'Content-type': 'application/json'
            },
            
        }).then(response => {
            setStatus('RECEIVED RESPONSE');
            if (response.ok) return response.json();
            else throw new Error('I WAS AN ADVENTURER ONCE AND THEN...');
        })
          .then(character => {
            setStatus('RENDERING TABLE');
            renderCharacterTable([charcter], dataTable);
            setStatus('RESPONSE RENDERED INTO TABLE');
        })
          .catch(error => {
            handleError(error);
        });
    }
    function handleFormSubmission(event) {
        event.preventDefault(); 
        create();
    }

    dataForm.addEventListener('submit', handleFormSubmission);
})();