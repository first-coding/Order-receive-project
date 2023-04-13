let first = document.getElementById('first')
let second = document.getElementById('second')
let right = document.getElementById('recommendations')
let strcookie = document.cookie
send_data = strcookie.split("=")[2]
let search = document.getElementById('search-input')
let tables = document.getElementById('tables')
let left = document.getElementById('left')
let buttons = document.getElementsByTagName('button')
let tbody = document.getElementById('tbody')
async function requestData(urls) {
    let data;
    await axios.post(urls)
        .then(function (response) {
            data = response.data
        })
        .catch(function (error) {
            data = error.data
        });
    return data;
}

function elements() {
    let arrays = new Array(6)
    arrays[0] = document.createElement('th')
    arrays[1] = document.createElement('img')
    arrays[2] = document.createElement('p')
    arrays[3] = document.createElement('a')
    arrays[4] = document.createElement('p')
    arrays[5] = document.createElement('p')
    return arrays
}

function allelements() {
    let arrays = new Array(9)
    arrays[0] = document.createElement('th')
    arrays[1] = document.createElement('img')
    arrays[2] = document.createElement('p')
    arrays[3] = document.createElement('a')
    arrays[4] = document.createElement('p')
    arrays[5] = document.createElement('p')
    arrays[6] = document.createElement('p')
    arrays[7] = document.createElement('p')
    arrays[8] = document.createElement('table')
    return arrays

}

requestData("http://127.0.0.1:8000/recommand/ShowData").then(res => {
    let flag = 0
    for (let j = 0; j < res.length / 2; j++) {
        var arrays = elements();
        first.appendChild(arrays[0])
        if (flag == 0) {
            for (let k = 1; k < arrays.length; k++) {
                if (k != 3) {
                    arrays[0].appendChild(arrays[k])
                }
            }
        }
        for (let z = 0; z < res[j].length; z++) {
            if (z == 0) {
                arrays[2].appendChild(arrays[3])
                arrays[3].innerText = res[j][z]
            }
            if (z == 1)
                arrays[3].href = res[j][z]
            if (z == 2)
                arrays[1].src = res[j][z]
            if (z == 3)
                arrays[4].innerText = res[j][z]
            else
                arrays[5].innerText = res[j][z]
        }
    }

    for (let j = 3; j < res.length; j++) {
        var arrays = elements();
        second.appendChild(arrays[0])
        if (flag == 0) {
            for (let k = 1; k < arrays.length; k++) {
                if (k != 3) {
                    arrays[0].appendChild(arrays[k])
                }
            }
        }
        for (let z = 0; z < res[j].length; z++) {
            if (z == 0) {
                arrays[2].appendChild(arrays[3])
                arrays[3].innerText = res[j][z]
            }
            if (z == 1)
                arrays[3].href = res[j][z]
            if (z == 2)
                arrays[1].src = res[j][z]
            if (z == 3)
                arrays[4].innerText = res[j][z]
            else
                arrays[5].innerText = res[j][z]
        }
    }
})


axios.get("http://127.0.0.1:8000/recommand/Suggest?user_name=" + send_data)
    .then(response => {
        for (let s = 0; s < response.data.length; s++) {
            li = document.createElement('li')
            li.innerText = response.data[s][0]
            right.appendChild(li)
        }
    })

function submits() {
    axios.post("http://127.0.0.1:8000/recommand/Search?movie_name=" + search.value)
        .then(response => {
            console.log(response.data)
            left.innerHTML = ""
            var arrays = allelements()
            left.appendChild(arrays[8])
            arrays[8].appendChild(arrays[0])
            for (let j = 1; j < arrays.length - 1; j++) {
                if (j != 3) {
                    arrays[0].appendChild(arrays[j])
                }
                else {
                    arrays[2].appendChild(arrays[3])
                }
            }
            arrays[1].src = response.data[0][7]
            arrays[3].innerText = response.data[0][1]
            arrays[3].href = response.data[0][0]
            arrays[4].innerText = response.data[0][2]
            arrays[5].innerText = response.data[0][3]
            arrays[6].innerText = response.data[0][4]
            arrays[7].innerText = response.data[0][5]
        })
}

function Insert() {
    axios.get("http://127.0.0.1:8000/recommand/Insert?movie_name=" + search.value + "&user_name=" + send_data)
        .then(response => {
            if (response.data == 'ok') {
                submits()
            }
        })
}

search.onkeydown = function (event) {
    if (event.keyCode == 13) {
        Insert()
    }
}

function typedata(data) {
    tbody.innerHTML = ""
    if (data.length % 3 == 0) {
        var arrays = new Array(Math.floor(data.length / 3))
        for (let i = 0; i < arrays.length; i++) {
            arrays[i] = document.createElement('tr')
        }
    }
    else {
        var arrays = new Array(Math.floor(data.length / 3) + 1)
        for (let j = 0; j < arrays.length; j++) {
            arrays[j] = document.createElement('tr')
        }
    }
    let flags = 0
    let k = 0
    for (let q = 0; q < data.length; q++) {
        var In_arrays = elements()
        In_arrays[1].src = data[q][2]
        In_arrays[3].href = data[q][1]
        In_arrays[3].innerHTML = data[q][0]
        In_arrays[4].innerHTML = data[q][3]
        In_arrays[5].innerHTML = data[q][4]
        for (let z = 1; z < In_arrays.length; z++) {
            if (z != 3) {
                In_arrays[0].appendChild(In_arrays[z])
            }
            else {
                In_arrays[2].appendChild(In_arrays[3])
            }
        }
        if (flags % 3 == 0) {
            tbody.append(arrays[k])
        }
        arrays[k].appendChild(In_arrays[0])
        flags++
        if (flags % 3 == 0) {
            k++
        }
    }
}

function buttonclick(data) {
    if (data == "全部") {
        window.location.reload()
    }
    axios.post("http://127.0.0.1:8000/recommand/select?type=" + data).
        then(response => {
            console.log(response.data)
            typedata(response.data)
        })
}


window.onload = function () {
    for (let i = 0; i <buttons.length; i++)
        buttons[i].onclick = function () {
            buttonclick(buttons[i].innerHTML)
        }
}
