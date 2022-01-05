// Get csrf token from Flask backend
const csrfToken = document.getElementById('csrf').firstChild.value

// Get route id
const projectId = document.getElementById('projectId').innerHTML
const stakeholderId = document.getElementById('stakeholderId').innerHTML
const dataJson = document.getElementById('data').innerHTML
const data = JSON.parse(dataJson)

// Define blank form data to be used later by fetch function
let formData = {}

// Define form elements by id
const stakeholder = document.getElementById('stakeholder')
const degree1 = document.getElementById('degree1')
const degree2 = document.getElementById('degree2')
const degree3 = document.getElementById('degree3')
const importance1 = document.getElementById('importance1')
const importance2 = document.getElementById('importance2')
const importance3 = document.getElementById('importance3')
const description = document.getElementById('description')

// Pre-fill degree and importance radio button groups
if (data.degree === 'ผู้รับประโยชน์ทางตรง Direct beneficiary') {
    degree1.checked = true
} else if (data.degree === 'ผู้รับประโยชน์ทางอ้อม Indirect beneficiary') {
    degree2.checked = true
} else if (data.degree === 'ผู้เป็นปัจจัยความสำเร็จของโครงการ Project success enabler') {
    degree3.checked = true
}

if (data.importance === 'สูง High') {
    importance1.checked = true
} else if (data.importance === 'ปานกลาง Medium') {
    importance2.checked = true
} else if (data.importance === 'น้อย Low') {
    importance3.checked = true
}


// Form submission
function fetchSubmit() {
    // Create degree variable from radio buttons
    let degree = ''

    if (degree1.checked) {
        degree = degree1.value
    } else if (degree2.checked) {
        degree = degree2.value
    } else if (degree3.checked) {
        degree = degree3.value
    }

    // Create importance variable from radio buttons
    let importance = ''

    if (importance1.checked) {
        importance = importance1.value
    } else if (importance2.checked) {
        importance = importance2.value
    } else if (importance3.checked) {
        importance = importance3.value
    }

    // Build final formData
    formData = {
        stakeholder: stakeholder.value, 
        degree: degree, 
        importance: importance, 
        description: description.value, 
        published: true
    }

    fetch('/project/' + projectId + '/' + stakeholderId + '/edit', {
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