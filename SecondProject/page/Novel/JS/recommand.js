let tbody = document.getElementById('tbody')
let strcookie = document.cookie
var send_data = strcookie.split("=")[2]
let rights = document.getElementById('right')
console.log(send_data)
let button_exit = document.getElementById('exit')
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

function element_node() {
  let other_arrays = new Array(5)
  other_arrays[0] = document.createElement('tr')
  other_arrays[1] = document.createElement('a')
  other_arrays[2] = document.createElement('img')
  other_arrays[3] = document.createElement('p')
  other_arrays[4] = document.createElement('p')
  return other_arrays
}

axios.get("http://127.0.0.1:8000/recommand/Suggest?user_name=" + send_data)
  .then(response => {
    console.log(response.data)
    for (let s = 0; s < response.data.length; s++) {
      li = document.createElement('li')
      li.innerText = response.data[s][0]
      rights.appendChild(li)
    }
  })

requestData("http://127.0.0.1:8000/recommand/ShowData").then(res => {
  console.log(res)
  for (let i = 0; i < res.length; i++) {
    let arrays = element_node()
    let td_arrays = new Array(5)
    for (let i = 0; i < 5; i++) {
      td_arrays[i] = document.createElement('td')
    }
    let data = res[i][3].split('|')
    arrays[1].href = res[i][2]
    arrays[2].src = res[i][0]
    arrays[1].appendChild(arrays[2])
    arrays[3].innerHTML = data[1]
    arrays[4].innerHTML = data[2]
    tbody.appendChild(arrays[0])
    for (let j = 0; j < td_arrays.length; j++) {
      arrays[0].appendChild(td_arrays[j])
      if (j == 0) {
        td_arrays[j].appendChild(arrays[1])
      }
      if (j == 1) {
        td_arrays[j].innerHTML = res[i][1]
      }
      if (j == 2) {
        td_arrays[j].innerHTML = data[0]
      }
      if (j == 3) {
        td_arrays[j].appendChild(arrays[3])
        td_arrays[j].appendChild(arrays[4])
      }
      if (j == 4) {
        td_arrays[j].innerHTML = res[i][4]
      }
    }
  }
})

function showPopup(event) {
  if (event) {
    event.preventDefault(); // 阻止表单提交
    var keyword = event.target.elements["keyword"].value;
  }
  let popup = document.getElementById("popup-container");
  popup.style.display = "flex";
  axios.get("http://127.0.0.1:8000/recommand/Insert?novel_name=" + keyword + "&user_name=" + send_data)
    .then(response => {
      if (response.data == 'ok') {
        axios.get("http://127.0.0.1:8000/recommand/Search?novel_name=" + keyword)
          .then(response => {
            if (response.data == 'error') {
              let welcome = document.getElementById('welcome')
              welcome.innerHTML = "找不到该小说"
            }
            else {
              var novel = {
                title: response.data[0][2],
                author: response.data[0][3],
                summary: response.data[0][5],
                updated: response.data[0][6],
                url: response.data[0][1],
                cover: response.data[0][0],
              };
              // 将小说信息显示在弹窗中
              let title = document.getElementById("title");
              let summary = document.getElementById("summary");
              let updated = document.getElementById("updated");
              let cover = document.getElementById("cover");
              let url = document.getElementById('url')
              url.href = novel.url
              title.textContent = novel.title;
              summary.textContent = novel.summary;
              updated.textContent = "更新时间：" + novel.updated;
              cover.src = novel.cover;
            }
          })
      }
      else{
        let welcome = document.getElementById('welcome')
        welcome.innerHTML = "找不到该小说"
      }
    })
}

function hidePopup() {
  let popup = document.getElementById("popup-container");
  popup.style.display = "none";
}

button_exit.onclick=function(){
  window.location.href="http://127.0.0.1:8000/Page/enter"
}