
//search button
document.querySelector("#add-time")

//when you click the button
.addEventListener('click',cloneField);


//perform an action
function cloneField(){

    //duplicate the fields. What fields?

   const newFieldContainer = document.querySelector(".schedule-item").cloneNode(true)


   //pick up the fields. Which fields?

   const fields = newFieldContainer.querySelectorAll("input")

   //for each field, clear


    fields.forEach(element => {
        //take the field of the moment and clean it

        element.value=""    
    });

    //put on the page: where?

    document.querySelector("#schedule-items").appendChild(newFieldContainer)

}