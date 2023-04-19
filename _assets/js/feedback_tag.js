// selectors
const allMedia = document.querySelectorAll('.video-wrapper');


allMedia.forEach( (node) => {
    
    //get the media url
    const iframe = node.querySelector('iframe');
    const url = iframe.getAttribute('src');
    
  
    //create some temporary data variables
    let feedback_type = '';
    let feedback_text = '';

    //feedback tag 
    const tag = document.createElement('div')
    node.insertAdjacentElement('afterend',tag);
    tag.classList.add("feedback-tag")

    //form
    const form = document.createElement('form');
    const formAction = 'https://script.google.com/macros/s/AKfycbzDYhT9eNJLXQlDlVZHwegdIuhoOWxRxo8iu_VjLp7RqLY9gim7PKQKk9kUH1W2bowj/exec';
    tag.appendChild(form);

    //selection area (buttons)
    const selectionArea = document.createElement('div');
    selectionArea.classList.add('selectionArea');
    form.appendChild(selectionArea);


    //add text to the selection area
    const tagTextSpan = document.createElement('span');
    const tagText = document.createTextNode("Give feedback")
    selectionArea.appendChild(tagTextSpan);
    tagTextSpan.classList.add("tag-text");
    tagTextSpan.appendChild(tagText);

    //add thumb buttons to selection area
    const tagButtonsSpan = document.createElement('span');
    selectionArea.appendChild(tagButtonsSpan);
    tagButtonsSpan.classList.add("tag-buttons");
    const thumbUp = document.createElement('button');
    const thumbDown = document.createElement('button')
    tagButtonsSpan.appendChild(thumbUp);
    tagButtonsSpan.appendChild(thumbDown);
    thumbUp.classList.add('thumb', 'far', 'fa-thumbs-up');
    thumbUp.setAttribute('value', 'positive');
    thumbDown.classList.add('thumb','far', 'fa-thumbs-down');
    thumbDown.setAttribute('value','negative');

    //submission area (text submissiona and submit button)
    const submissionArea = document.createElement('div');
    submissionArea.classList.add('submissionArea');
    submissionArea.classList.add('hidden');
    form.appendChild(submissionArea);

    //prompt text in submission area
    const prompt = document.createElement('label');
    prompt.classList.add('prompt');
    prompt.setAttribute('for','user-feedback-text')
    const promptText = document.createTextNode('How could this learning media be improved?');
    prompt.appendChild(promptText);
    submissionArea.appendChild(prompt);

    //text area in submission area
    const textArea = document.createElement('textarea');
    textArea.classList.add('feedback-text');
    textArea.setAttribute('name','feedback-text');
    textArea.setAttribute('id','user-feedback-text');
    textArea.setAttribute('type','text');
    textArea.setAttribute('style','display: block;');
    console.log(textArea);
    submissionArea.appendChild(textArea);

    //submit button
    const submitButton = document.createElement('button');
    submitButton.classList.add('btn');
    submitButton.setAttribute('type', 'submit');
    buttonText = document.createTextNode('Submit')
    submitButton.appendChild(buttonText);
    submissionArea.appendChild(submitButton);

    //selecting a thumb button
    const thumbButtons = document.querySelectorAll('.tag-buttons button');
    thumbButtons.forEach(node => node.addEventListener("click", (event) => {
        // prevent form submission
        event.preventDefault();
        
        //reset both buttons classes and icons
        thumbButtons.forEach(button => {
            button.classList.remove('selected'); 
            button.classList.replace('fas','far');
            });    
        
        // change selected button
        event.target.classList.add('selected');
        event.target.classList.replace('far','fas');
        
        // set the feedback_type data variable
        feedback_type = event.currentTarget.value;
        console.log(feedback_type);

        // transition to larger tag
        tag.classList.add('wide');

        //unihde submission area
        submissionArea.classList.remove('hidden');
        })
    );




});

// user submits form
function submitForm() {
    e.preventDefault();

    
    // feedbackSentMessage();
    // feedback_text = feedbackText.value;
    // feedbackButtons.forEach(button => button.setAttribute("disabled", " "));
         
    // // prepare form data for post 
    // const data = new FormData(form);
    // let date = new Date()
    // const dd = String(date.getDate()).padStart(2, '0');
    // const mm = String(date.getMonth() + 1).padStart(2, '0');
    // const yyyy = date.getFullYear();
    // date = mm + '/' + dd + '/' + yyyy;
    // const action = e.target.action;
    // const url = window.location.href;
    
    // data.append("url", url);
    // data.append("date", date);
    // data.append("feedback_type", feedback_type);
    // data.append("feedback_text", feedback_text);
    
    // fetch(action, {
    //   method: 'POST',
    //   body: data,
    // })
    // .then(() => {
    // feedback_type = "";
    
    // })
}






{/* <form id="feedback-form" method="POST" action="https://script.google.com/macros/s/AKfycbzDYhT9eNJLXQlDlVZHwegdIuhoOWxRxo8iu_VjLp7RqLY9gim7PKQKk9kUH1W2bowj/exec">
                     
    <div id="selection-feedback">
    <P>Please take a moment to rate this lesson. Your feedback will be <strong>anonymous</strong>.</p>
    
    <ul class="ratings">
        <li>
            <button class="btn feedback-btn" value="Very bad" type="button">
                <i aria-hidden="true" class="fas fa-tired fa-lg"></i>
            </button>
            <p class="rating-text">Very bad</p>
        </li>

        <li>
            <button class="btn feedback-btn" value="Bad" type="button">
                <i class="fas fa-frown fa-lg" ></i> 
            </button> 
            <p class="rating-text">Bad</p>
        </li>

        <li>
            <button class="btn feedback-btn" value="Okay" type="button">
                <i aria-hidden="true" class="fas fa-meh fa-lg" ></i>
            </button>
            <p class="rating-text">Okay</p>
        </li>
            
        <li>
            <button class="btn feedback-btn" value="Good" type="button">
                <i class="fas fa-smile fa-lg" ></i> 
            </button> 
            <p class="rating-text">Good</p>
        </li>

        <li>
            <button class="btn feedback-btn" value="Very good" type="button">
                <i class="fas fa-laugh-beam fa-lg" ></i> 
            </button>
            <p class="rating-text">Very good</p>
        </li>

    </ul>
    
    </div>
    
    <div class="hidden" id="submission-area">
    <p>What made you choose <span class="variable-text">your selection</span>?</p>
    <textarea style="display: block; width: 100%;" name="feedback-text" id="feedback-text" type="text"></textarea>
    <button class="btn" type="submit">Submit</button>
    </div>
    
</form> */}