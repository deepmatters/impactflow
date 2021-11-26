// INDICATOR SEARCH PART

const searchInput = document.getElementById('searchBox')

// // Add Enter key listener
// searchInput.addEventListener('keyup', e => {
//     if (e.key == "Enter") {
//         e.preventDefault()
//         searchSubmit()
//     }
// })

let searchObj = []

// Fetch search content
function fetchSearch() {
    fetch('/indicator/api')
    .then(response => response.json())
    .then(data => {
        searchObj = data
        console.log('Get Object: ', searchObj)
    })
    .catch((error) => {
        console.error('Error: ', error);
    })
}

fetchSearch()

// A function to use the search result to fill the outcome form
function searchFill(category, outcome) {
    document.getElementById(`outcomeCategory`).value = category
    document.getElementById(`outcome`).value = outcome
    searchClear()
}

// The main search function
function searchSubmit() {
    // Clear search result DOM first
    document.getElementById('searchResultNumWrapper').style.display = 'none'

    const searchResult = document.getElementById('searchResult')
    searchResult.innerHTML = ''

    // Proceed if input length > 1 only
    if (searchInput.value.length > 1) {
        // Sanitise search term
        const searchTermRaw = searchInput.value
        let searchTermAnd = ''
        let searchTermOr = ''
        const searchTermCleanupRegex = /\s/g;  // All whitespace

        searchTermAnd = searchTermRaw.replace(searchTermCleanupRegex, '.*')
        searchTermOr = searchTermRaw.replace(searchTermCleanupRegex, '|')

        console.log(`Search term strict mode (AND): ${searchTermAnd}`)
        console.log(`Search term loose mode (OR): ${searchTermOr}`)

        // Build search RegEx
        let searchRegexAnd = new RegExp(searchTermAnd, 'gi')
        let searchRegexOr = new RegExp(searchTermOr, 'gi')

        console.log(`Search Regex strict mode (AND): ${searchRegexAnd}`)
        console.log(`Search Regex loose mode (OR): ${searchRegexOr}`)

        // Create search array which is the result array of target objects
        // First, iterate over objects in searchObj array
        let searchArray = []

        // Search using strict mode first
        searchObj.forEach((obj, i) => {
            // Then iterate over each object and test regex match
            for (const [key, value] of Object.entries(obj)) {
                if (key == 'content') {
                    if (String(value).match(searchRegexAnd) != null) {
                        // Calculate search ranking (num of combined occurrences of search term)
                        let termMatchNum = 0

                        termMatchNum = String(value).match(searchRegexAnd).length

                        // Create search result array of objects
                        searchArray.push({
                            obj: searchObj[i], 
                            matchNum: termMatchNum, 
                            mode: 'strict'
                        })
                    }
                }   
            }
        })

        // If strict mode doesn't return any value, reapply using loose mode
        if (searchArray.length == 0) {
            searchObj.forEach((obj, i) => {
                // Then iterate over each object and test regex match
                for (const [key, value] of Object.entries(obj)) {
                    if (key == 'content') {
                        if (String(value).match(searchRegexOr) != null) {
                            // Calculate search ranking (num of combined occurrences of search term)
                            let termMatchNum = 0
        
                            termMatchNum = String(value).match(searchRegexOr).length
        
                            // Create search result array of objects
                            searchArray.push({
                                obj: searchObj[i], 
                                matchNum: termMatchNum, 
                                mode: 'loose'
                            })
                        }
                    }   
                }
            })
        }

        // Sort the search result array by matchNum
        // We want results with high occurrences to appear first
        searchArray.sort((a, b) => b.matchNum - a.matchNum)

        console.log(searchArray)
        
        // Update and reveal searchResultNum
        const searchResultNum = document.getElementById('searchResultNum')
        searchResultNum.innerHTML = String(searchArray.length)
        document.getElementById('searchResultNumWrapper').style.display = 'block'

        console.log(searchArray.length)

        // // If using loose mode, reveal loose mode notice
        // if (searchArray[0].mode == 'loose') {
        //     document.getElementById('searchLooseModeNotice').style.display = 'inline-block'
        // } else {
        //     document.getElementById('searchLooseModeNotice').style.display = 'none'
        // }

        // Append each result to DOM
        let count = 0

        searchArray.forEach(result => {
            // Truncate long content string
            const contentLen = 300
            let subContent = ''

            if (result.obj.content.length > contentLen) {
                subContent = result.obj.content.substring(0, contentLen) + ' ...'
            } else {
                subContent = result.obj.content
            }

            // Append each result to DOM
            const searchResultItemDiv = document.createElement('div')

            searchResultItemDiv.setAttribute('id', `searchResult${count}`)
            searchResultItemDiv.setAttribute('class', 'search-result-item')
            searchResult.appendChild(searchResultItemDiv)

            const searchResultItem = document.getElementById(`searchResult${count}`)
            searchResultItem.innerHTML = `
                <span class="gray-small">${result.matchNum} matches</span>
                <div class="spacer-big"></div>
                <div class="black-small">
                    <div class="spacer-big"></div>
                    <span class="blue-em">${result.obj.category}</span><br>
                    ${result.obj.subcategory}<br>
                    <ul>
                        <li>ENG: <strong>${result.obj.indicator_en}</strong> (${result.obj.source_en})</li>
                        <li>TH: <strong>${result.obj.indicator_th}</strong> (${result.obj.source_th})</li>
                    </ul>
                </div>
                <button class="button" onclick="searchFill('${result.obj.category}', '${result.obj.indicator_en} (${result.obj.source_en}) ${result.obj.indicator_th} (${result.obj.source_th})')">เลือกใช้ตัวชี้วัดนี้ Use this indicator</button>
                <div class="spacer-small"></div>
            `

            count += 1
        })

        // // Optionally clear search box
        // searchInput.value = ''

        // Refocus the search box
        searchInput.focus()
    } else {  // If search input length < 1
        // Clear search result num
        searchResultNum.innerHTML = '0'
    }
}

function searchClear() {
    // Clear search input value
    searchInput.value = ''

    // Clear search result num
    searchResultNum.innerHTML = '0'

    // Call searchSubmit with empty search input
    searchSubmit()
}

//=================================//

// FORM EDIT PART

// Get csrf token from Flask backend
const csrfToken = document.getElementById('csrf').firstChild.value

// Get route id
const projectId = document.getElementById('projectId').innerHTML
const stakeholderId = document.getElementById('stakeholderId').innerHTML
const activityId = document.getElementById('activityId').innerHTML
const dataJson = document.getElementById('data').innerHTML
const data = JSON.parse(dataJson)

// Define blank form data to be used later by fetch function
let formData = {}

// Define form elements by id
const activity = document.getElementById('activity')
const output = document.getElementById('output')
const outputAmount = document.getElementById('outputAmount')
const outputUnit = document.getElementById('outputUnit')
const outcomeCategory = document.getElementById('outcomeCategory')
const outcome = document.getElementById('outcome')
const outcomeAmount = document.getElementById('outcomeAmount')
const outcomeUnit = document.getElementById('outcomeUnit')
const impact = document.getElementById('impact')

// Form submission
function fetchSubmit() {
    // Build final formData
    formData = {
        activity: activity.value, 
        output: output.value, 
        outputAmount: outputAmount.value, 
        outputUnit: outputUnit.value, 
        outcomeCategory: outcomeCategory.value, 
        outcome: outcome.value, 
        outcomeAmount: outcomeAmount.value, 
        outcomeUnit: outcomeUnit.value, 
        impact: impact.value, 
        published: true
    }

    fetch('/project/' + projectId + '/' + stakeholderId + '/' + activityId +'/edit', {
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