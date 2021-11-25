// Get csrf token from Flask backend
const csrfToken = document.getElementById('csrf').firstChild.value

// Define blank form data to be used later by fetch function
let formData = {}

// Define form elements by id
const title = document.getElementById('title')
const objectives = document.getElementById('objectives')
const summary = document.getElementById('summary')
const duration = document.getElementById('duration')
const durationGuide = document.getElementById('durationGuide')
const budget = document.getElementById('budget')
const budgetGuide = document.getElementById('budgetGuide')
const team1Name = document.getElementById('team1Name')
const team1Position = document.getElementById('team1Position')
const teamWrapper = document.getElementById('teamWrapper')
const published = document.getElementById('published')

// team add/minus functions
let teamNum = 1  // Initial number of team

function teamAdd() {
    const childNodeName = document.createElement('input')
    const childNodePosition = document.createElement('input')
    const childNodeClear = document.createElement('div')

    childNodeName.setAttribute('id', `team${teamNum+1}Name`)
    childNodeName.setAttribute('type', `text`)
    childNodeName.setAttribute('placeholder', `ชื่อ Name`)
    childNodePosition.setAttribute('id', `team${teamNum+1}Position`)
    childNodePosition.setAttribute('type', `text`)
    childNodePosition.setAttribute('placeholder', `ตำแหน่ง Position`)
    childNodeClear.setAttribute('id', `team${teamNum+1}Clear`)
    childNodeClear.setAttribute('class', 'clear')

    teamWrapper.append(childNodeName)
    teamWrapper.append(childNodePosition)
    teamWrapper.append(childNodeClear)

    teamNum += 1
}

function teamMinus() {
    if (teamNum > 1) {
        teamWrapper.removeChild(document.getElementById(`team${teamNum}Name`))
        teamWrapper.removeChild(document.getElementById(`team${teamNum}Position`))
        teamWrapper.removeChild(document.getElementById(`team${teamNum}Clear`))

        teamNum -= 1
    }
}

// Form submission
function fetchSubmit() {
    // Create validation variable
    // Ref: https://stackoverflow.com/a/12643073
    const regexNumber = /^[0-9]+$/;
    const regexFloat = /^([0-9]+([.][0-9]*)?|[.][0-9]+)$/;

    let durationValid = false
    let budgetValid = false

    // Check if duration is an integer
    if (duration.value.match(regexNumber)) {
        console.log('Duration is an interger')
        durationValid = true
        durationGuide.style.display = 'none'
    } else {
        console.log('Duration is NOT an interger')
        durationValid = false
        durationGuide.style.display = 'block'
    }

    // Check if budget is a float
    if (budget.value.match(regexFloat)) {
        console.log('Budget is a float')
        budgetValid = true
        budgetGuide.style.display = 'none'
    } else {
        console.log('Budget is NOT a float')
        budgetValid = false
        budgetGuide.style.display = 'block'
    }

    // Continue of all validations pass
    if (durationValid === true && budgetValid === true) {
        // Create teamArray
        let teamArray = []

        for (let i=1; i <= teamNum; i++) {
            teamArray.push({
                teamName: document.getElementById(`team${i}Name`).value, 
                teamPosition: document.getElementById(`team${i}Position`).value, 
            })
        }

        // Create published boolean
        let publishedBool = false

        if (published.checked === true) {
            publishedBool = true
        } else {
            publishedBool = false
        }

        // Build final formData
        formData = {
            title: title.value, 
            objectives: objectives.value, 
            summary: summary.value, 
            duration: Number(duration.value), 
            budget: Number(budget.value),
            team: teamArray, 
            published: publishedBool
        }

        fetch('/project-create', {
            method: 'post', 
            credentials: 'include',
            cache: "no-cache", 
            headers: {
                'Content-Type': 'application/json', 
                'X-CSRFToken': csrfToken
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            window.location.replace('/')
        })
        .catch((error) => {
            console.error('Error: ', error);
        })
    }
}

// Clear form inputs on load
window.onload = clearInputs()

function clearInputs() {
    title.value = ''
    objectives.value = '' 
    summary.value = ''
    duration.value = ''
    budget.value = ''
    team1Name.value = ''
    team1Position.value = ''
}