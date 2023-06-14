/** Prompt **/

//selectors
 const promptFeedbackButton = document.querySelector('#prompt .btn.reveal');
 const promptResetButton = document.querySelector("#prompt .reset");
 const promptFeedbackText = document.querySelector("#prompt .feedback")
 const promptTextArea = document.querySelector('#prompt textarea');
 const promptResult = document.querySelector('#prompt .result');
 
//listeners
 promptFeedbackButton.addEventListener("click", reveal);
 promptResetButton.addEventListener("click", reset);

//handlers
 function reveal(event) {
   console.log(event);
   promptFeedbackButton.classList.add('hidden');
   promptResetButton.classList.remove('hidden');
   promptFeedbackText.classList.remove('hidden');
   promptTextArea.classList.add('hidden');
   promptResult.innerHTML = 'You answered:<br> ' + promptTextArea.value;
   promptResult.classList.remove('hidden');
 }

 function reset(event) {
   promptFeedbackButton.classList.remove('hidden');
   promptResetButton.classList.add('hidden');
   promptFeedbackText.classList.add('hidden');
   promptTextArea.classList.remove('hidden');
   promptResult.classList.add('hidden');
   promptTextArea.value = '';
 }

 /** Multiple Choice **/




   
 
