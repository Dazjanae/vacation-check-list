/*1:59:00 on class 41 cann help with this. 
pseudo code for deleting a task. First, I need to add a trashcan after each li (ESJ?). 
user will click on the trashcan. when user click on the trashcan, we want to delete the
document (todotask taskassignee taskduedate) from the database, which would also delete it from the client's view.*/

//Grouping all trashcans based on the common selector
const collectingAllTrash = document.querySelectorAll('.fa-trash')

//Adding event listener to ALL of the trashcans, so when they are clicked it tells the deleteTask function to start
Array.from(collectingAllTrash).forEach(element => {
    element.addEventListener('click', deleteThisTask)
})

/*function that will delete the RESPECTIVE document (todotask taskasssignee taskduedate) based on the exact 
trash can clicked... */

async function deleteThisTask() {
    const theTask = this.parentNode.childNodes[1].innerText
    const thePerson = this.parentNode.childNodes[3].innerText
    const theDate = this.parentNode.childNodes[5].innerText
    try{
        const response = await fetch('deletetask', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'todotaskS' : theTask,
                'taskassigneeS' : thePerson,
                'taskduedateS' : theDate
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}
