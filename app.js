button.disabled = true;


const renderFromBase = () => {
    fetch('https://question-b2243.firebaseio.com/questions.json', {})
    .then(response =>response.json())
    .then(response => {
        
            while (quest.firstChild) {
                quest.removeChild(quest.firstChild);
            } 
          
          
          
            for (var key in response) {
                console.log(response[key].text)
                const hol = `
                    <div class = 'question'>
                        <span>
                            ${response[key].text} <br/>
                            ${new Date(response[key].date).toLocaleDateString()}
                            ${new Date(response[key].date).toLocaleTimeString()}
                        </span>
                    </div>
                    ${response[key].answer ? 
                        `
                        <hr>
                        <div class = 'answer'>
                            ${response[key].answer}
                        </div>
                        ` : ''
                    }
                `
                const div = document.createElement("DIV");
                div.className = 'inquiry';
                div.innerHTML = hol;
                quest.appendChild(div)
              }
          

      
        
        
          
    })
} 

renderFromBase();
    



class Questions {
    static create(question) {
        console.log('question', question)
        console.log('JSON-question', JSON.stringify(question))
        return fetch('https://question-b2243.firebaseio.com/questions.json', {
            method: 'POST',
            body: JSON.stringify(question),
            headers: {
                'Content-Type': 'application.json'
            }
        })
            .then(response => response.json())
            .then(response => {
                console.log('response.json' , response );
                question.id = response.name
                console.log('question', question)
                return question
            })
            // .then(addLocalStorage)
            // .then(Questions.renderList)
            .then(renderFromBase)
            // .then(() => window.location.reload())
    }

    // static renderList() {
    //     // const a = await fetch('https://question-b2243.firebaseio.com/questions')

    //     const question = getQuestionFromLocalStorage();

    //     const html = question.length ? question.map(toCard).join(' ') : 
    //         `<div>НЕт вопросов</div>`
        
    //     quest.innerHTML = html
    // }

    
}

// const addLocalStorage = (question) => {
//     const all = getQuestionFromLocalStorage();
//     all.push(question);
//     localStorage.setItem('question', JSON.stringify(all))
// }

// const getQuestionFromLocalStorage = () => {
//     return JSON.parse(localStorage.getItem('question') || '[]' )
// }

const toCard = (question) => {
    return `
    <div class = 'inquiry'>
        <div class = 'question'>
            <span>
                ${question.text} <br/>
                ${new Date(question.date).toLocaleDateString()}
                ${new Date(question.date).toLocaleTimeString()}
            </span>
        </div>
        ${question.answer ? 
            `
            <hr>
            <div class = 'answer'>
                ${question.answer}
            </div>
            ` : ''
        }
    </div>
    `
}

const submitFormHandler = (event) => {
    event.preventDefault();


    if(isValid(input.value)) {
        const question = {
            text: input.value,
            answer: false,
            date: new Date().toJSON()
        }

        Questions.create(question)
            .then(() => {
                button.disabled = true;
                input.value = '';
            
            })
               
    }
}

// window.addEventListener('load', renderFromBase)
form.addEventListener('submit', submitFormHandler)
input.addEventListener('input', () => {
    button.disabled = !isValid(input.value);
})

const isValid = (value) => {
    return value.length >= 10;
} 






