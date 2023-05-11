
// FEEDBACK TAGS

//global variables
let feedback_type = '';
let feedback_text = '';
let src = '';
let selectedTag;
let selectedTagText;
const formAction = 'https://script.google.com/macros/s/AKfycbwD5KOI82xbHICcU8E_tWWCjNNCQtrrqJaDSMddhGUT3NxEaIdWqPP49gp0UnG8PwDN/exec';

const titleText = "Tell us about your rating";
const positivePromptText = "What made this a good video?"; 
const negativePromptText = "What could have made this video better?";
const altButtonText = "Submit without comment";
const primaryButtonText = "Submit";
const placeholderText = "Your feedback will help us improve this video."
const feedbackSentText = "Thank you for your feedback.";

// add tags to all videos
const videos = document.querySelectorAll('.video-wrapper');
videos.forEach((node) => {
    //get src from the iframe
    const nodeSrc = node.firstElementChild.src;
    //create feedback tag els
    const tag = document.createElement('div')
    node.insertAdjacentElement('afterend',tag);
    tag.classList.add("feedback-tag")
    //add thumb buttons and add scr data attribute
    const tagButtonsSpan = document.createElement('span');
    tag.appendChild(tagButtonsSpan);
    tagButtonsSpan.classList.add("tag-buttons");
    tagButtonsSpan.dataset.src = nodeSrc;
    const thumbUp = document.createElement('button');
    const thumbDown = document.createElement('button')
    tagButtonsSpan.appendChild(thumbUp);
    tagButtonsSpan.appendChild(thumbDown);
    thumbUp.classList.add('thumb', 'far', 'fa-thumbs-up');
    thumbUp.setAttribute('value', 'positive');
    thumbDown.classList.add('thumb','far', 'fa-thumbs-down');
    thumbDown.setAttribute('value','negative');
    //create tag text
    const tagText = document.createElement('span');
    tag.appendChild(tagText);
    tagText.classList.add("tag-text");
    tagText.innerHTML = "";
    //add event listeners to thumb buttons
    const thumbButtons = document.querySelectorAll('.tag-buttons button');
    thumbButtons.forEach(node => node.addEventListener("click", thumbTagSelect));
    thumbButtons.forEach(node => node.addEventListener('click', toggleModal));
});

// Create the modal
//modal main component
const body = document.querySelector('body');
const modal = document.createElement('div');
const overlay = document.createElement('div')
modal.classList.add('feedback-modal');
overlay.classList.add('modal-overlay');
modal.classList.add('closed');
overlay.classList.add('closed');
body.appendChild(overlay);
body.appendChild(modal);
//modal header - non scrolling content
const modalHeader = document.createElement('div');
modalHeader.classList.add('feedback-modal-header');
modalHeader.innerHTML = '<div class="close-modal"><i class="fas fa-times"></i></div>';
modal.appendChild(modalHeader);
modalHeader.addEventListener('click', toggleModal);
//modal content - will scroll
const modalContent = document.createElement('div');
modalContent.classList.add('feedback-modal-content');
modal.appendChild(modalContent);

//form
const form = document.createElement('form');
form.action = formAction;
form.method = "POST"
modalContent.appendChild(form);
form.innerHTML = `<span class="modal-title">${titleText}</span>`;
//form thumb buttons
const formButtons = document.createElement('span');
form.appendChild(formButtons);
formButtons.classList.add("form-buttons");
const thumbUp = document.createElement('button');
const thumbDown = document.createElement('button')
formButtons.appendChild(thumbUp);
formButtons.appendChild(thumbDown);
thumbUp.classList.add('thumb', 'far', 'fa-thumbs-up');
thumbUp.setAttribute('value', 'positive');
thumbDown.classList.add('thumb','far', 'fa-thumbs-down');
thumbDown.setAttribute('value','negative');
thumbUp.addEventListener('click', thumbFormSelect);
thumbDown.addEventListener('click', thumbFormSelect);
//submission area
const submissionArea = document.createElement('div');
submissionArea.classList.add('submission-area');
form.appendChild(submissionArea);

// prompt text in submission area
const prompt = document.createElement('label');
prompt.classList.add('prompt');
prompt.setAttribute('for','user-feedback-text')
updatePrompt();

submissionArea.appendChild(prompt);

// text area in submission area
const textArea = document.createElement('textarea');
textArea.classList.add('feedback-text');
textArea.setAttribute('name','feedback-text');
textArea.setAttribute('id','user-feedback-text');
textArea.setAttribute('type','text');
textArea.setAttribute('style','display: block;');
submissionArea.appendChild(textArea);
textArea.addEventListener('keyup', buttonEnabler);

// submission buttons

// const altButton = document.createElement('button');
// altButton.classList.add('btn', 'secondary');
// altButton.setAttribute('type', 'submit');
// altButton.innerHTML = 'Submit without comment';
// submissionArea.appendChild(altButton);
// altButton.addEventListener('click', submitForm);

const submitButton = document.createElement('button');
submitButton.classList.add('btn');
submitButton.setAttribute('type', 'submit');
submitButton.classList.add('secondary');
//submitButton.disabled = true;
submitButton.innerHTML = altButtonText;
submissionArea.appendChild(submitButton);
submitButton.addEventListener('click', submitForm);


// Event handling

function thumbTagSelect(event) {
    
    //reset both tag buttons
    const parent = event.target.parentElement;
    const buttons = parent.children;
    selectedTag = event.target.parentElement;
    selectedTagText = selectedTag.nextSibling;
    
    for (i=0; i<buttons.length; i++ ) {
        buttons[i].classList.remove('selected');
        buttons[i].classList.replace('fas','far');
    }
    // select the clicked button
    event.target.classList.add('selected');
    event.target.classList.replace('far','fas');
    // set the feedback_type and src data variables
    feedback_type = event.currentTarget.value;
    src = event.target.parentElement.dataset.src;
    // set the form based on tag selection
    if (feedback_type === 'positive') {
        thumbUp.classList.add('selected');
        thumbUp.classList.replace('far', 'fas');
        thumbDown.classList.remove('selected');
        thumbDown.classList.replace('fas', 'far');
    } else if (feedback_type === 'negative') {
        thumbDown.classList.add('selected');
        thumbDown.classList.replace('far', 'fas');
        thumbUp.classList.remove('selected');
        thumbUp.classList.replace('fas', 'far');
    } else {
        console.log('did nothing');
    }
    updatePrompt();  
}

function thumbFormSelect(event) {
    event.preventDefault();
    //reset both buttons
    const parent = event.target.parentElement;
    const buttons = parent.children;
    for (i=0; i<buttons.length; i++) {
        buttons[i].classList.remove('selected');
        buttons[i].classList.replace('fas', 'far');
    }
    //select the clicked button
    event.target.classList.add('selected');
    event.target.classList.replace('far', 'fas');
    //set the feedback_type
    feedback_type = event.currentTarget.value;
    updatePrompt();
    // make tag buttons match form selection
    const tagButtons = selectedTag.children;
    for (i=0; i<tagButtons.length; i++) {
        tagButtons[i].classList.remove('selected');
        tagButtons[i].classList.replace('fas', 'far');
    }
    
    if (feedback_type === 'positive') {
        tagButtons[0].classList.add('selected');
        tagButtons[0].classList.replace('far', 'fas');
    } else if (feedback_type === 'negative') {
        tagButtons[1].classList.add('selected');
        tagButtons[1].classList.replace('far', 'fas');
    } else {
        console.log('did not update a button');
    }
}

function updatePrompt() {
   
    if (feedback_type === 'positive') {
        prompt.innerHTML = positivePromptText;
        
    } else if (feedback_type === 'negative') {
        prompt.innerHTML = negativePromptText;
    } else {
        prompt.innerHTML = 'Please select a rating above.'
    }
    
} 
    
// function updateFormThumbs() {
//     thumbUp.classList.remove('selected');
//     thumbUp.classList.replace('fas', 'far');
//     thumbDown.classList.remove('selected');
//     thumbUp.classList.replace('fas', 'far');
    
    
    
//     if (feedback_type === 'positive') {
//         thumbUp.classList.add('selected');
//         thumbUp.classList.replace('far', 'fas');
//     } else if (feedback_type === 'negative') {
//         thumbDown.classList.add('selected');
//         thumbDown.classList.replace('far', 'fas');
//     } else {
//         console.log("didnt update the buttons");
//     }
// }

function buttonEnabler() {
   if (textArea.value) {
    submitButton.classList.remove('secondary');
    submitButton.innerHTML = primaryButtonText
   } else {
    submitButton.classList.add('secondary');
    submitButton.innerHTML = altButtonText;
   }

}

function toggleModal() {
    modal.classList.toggle('closed');
    overlay.classList.toggle('closed');
}





function submitForm(event) {
    event.preventDefault();
     
    feedback_text = textArea.value;
         
    // prepare form data for post 
    const data = new FormData(form);
    
    
    let date = new Date()
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    date = mm + '/' + dd + '/' + yyyy;
    const url = window.location.href;
    
    //add data to the data object
    data.append("url", url);
    data.append("src", src);
    data.append("date", date);
    data.append("feedback_type", feedback_type);
    data.append("feedback_text", feedback_text);
    
    fetch(formAction, {
      method: 'post',
      body: data,
    })
    .then((response) => console.log(response))
    .catch(error => console.error(error))

    toggleModal();
    textArea.value = "";
    feedback_type = "";
    //disable the tag buttons for the selected video
    const tagButtons = selectedTag.children;
    for (i=0; i<tagButtons.length; i++) {
        tagButtons[i].disabled = true;
    }
    //show user feedback sent text for selected tag
    selectedTagText.innerHTML = feedbackSentText;
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