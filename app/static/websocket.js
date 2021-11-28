const io = window.io
const socket = io('wss://dmwebsocket.cfapp.org')
const currentPath = document.getElementById('currentPath').innerHTML
const currentAddress = document.getElementById('currentAddress').innerHTML

// Client send part
const wsData = {
    asset: 'ImpactFlow', 
    path: currentPath, 
    address: currentAddress, 
    input: ''
}

socket.emit('web_message', wsData)