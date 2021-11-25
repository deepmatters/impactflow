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
const teamWrapper = document.getElementById('teamWrapper')
const published = document.getElementById('published')

// Load existing form data
const projectId = document.getElementById('projectId').innerHTML
const dataJson = document.getElementById('data').innerHTML
const data = JSON.parse(dataJson)

// Prefill team data
if (data.team.length < 1) {  // If no team, create a blank team group
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
} else {
    for (let i=1; i <= data.team.length; i++) {
        const childNodeName = document.createElement('input')
        const childNodePosition = document.createElement('input')
        const childNodeClear = document.createElement('div')

        childNodeName.setAttribute('id', `team${i}Name`)
        childNodeName.setAttribute('type', `text`)
        childNodeName.setAttribute('placeholder', `ชื่อ Name`)
        childNodeName.setAttribute('value', data.team[i-1].teamName)
        childNodePosition.setAttribute('id', `team${i}Position`)
        childNodePosition.setAttribute('type', `text`)
        childNodePosition.setAttribute('placeholder', `ตำแหน่ง Position`)
        childNodePosition.setAttribute('value', data.team[i-1].teamPosition)
        childNodeClear.setAttribute('id', `team${i}Clear`)
        childNodeClear.setAttribute('class', 'clear')

        teamWrapper.append(childNodeName)
        teamWrapper.append(childNodePosition)
        teamWrapper.append(childNodeClear)
    }
}

// Pre-select published checkbox
if (data.published === true) {
    published.checked = true
} else {
    published.checked = false
}

// team add/minus functions
let teamNum = data.team.length  // Initial number of team from existing data

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

        fetch('/project/' + projectId + '/edit', {
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
            window.location.replace('/project/' + projectId)
        })
        .catch((error) => {
            console.error('Error: ', error);
        })
    }
}