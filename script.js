//есть ли в диапазоне свободное время javascriptf

let userA = [
    {
      "title": "Встреча А",
      "start": "2019-12-20T13:00:00+03:00",
      "end": "2019-12-20T14:00:00+03:00"
    },
    {
      "title": "Встреча Б",
      "start": "2019-12-20T14:00:00+03:00",
      "end": "2019-12-20T14:45:00+03:00"
    },
    {
      "title": "Встреча В",
      "start": "2019-12-20T17:00:00+03:00",
      "end": "2019-12-20T18:00:00+03:00"
    }
  ]
  
  let userB = [
    {
      "title": "Встреча А",
      "start": "2019-12-20T08:00:00+03:00",
      "end": "2019-12-20T08:30:00+03:00"
    },
    {
      "title": "Встреча Б",
      "start": "2019-12-20T10:00:00+03:00",
      "end": "2019-12-20T11:00:00+03:00"
    },
    {
      "title": "Встреча В",
      "start": "2019-12-20T16:00:00+03:00",
      "end": "2019-12-20T16:30:00+03:00"
    },
    {
      "title": "Встреча Г",
      "start": "2019-12-20T16:30:00+03:00",
      "end": "2019-12-20T17:00:00+03:00"
    }
  ]
  
  let users = [JSON.parse(JSON.stringify(userA)), JSON.parse(JSON.stringify(userB))];
  let fulledSchedule = [];
  let isError = false;
  
  function changeTimeFormat(JSONFile) {
    // new old object date format
    for (let i = 0; i < JSONFile.length; i++) {
  
      let FullEventStart = new Date(JSONFile[i].start);
      let eventStart = FullEventStart.toLocaleTimeString('ru-RU', {hour: '2-digit', minute: '2-digit'});
      let FullEventEnd = new Date(JSONFile[i].end);
      let eventEnd = FullEventEnd.toLocaleTimeString('ru-RU', {hour: '2-digit', minute: '2-digit'});
  
      JSONFile[i].start = eventStart;
      JSONFile[i].end = eventEnd;
    }
  
    fulledSchedule = JSONFile;
  
    // new free time object
    let freeSchedule = {"time": []}
  
    for (let i = 0; i < fulledSchedule.length; i++) {
      if(fulledSchedule[i + 1] != undefined) {
        if(fulledSchedule[i]["end"] != fulledSchedule[i + 1]["start"]) {
          let freetime = {
            "start": fulledSchedule[i]["end"], 
            "end": fulledSchedule[i + 1]["start"]
          }
          freeSchedule["time"].push(freetime);
  
          let componentList = document.getElementById('component_list');
          let minutesInput = document.getElementsByTagName('input')[0].value
  
          componentList.innerHTML += `
            <div id="component_list__time">
              <span>${fulledSchedule[i]["end"]} – ${fulledSchedule[i + 1]["start"]}</span>
            </div>
          `
  
          isError = minutesInput != '' ? false : true
          console.log(minutesInput);
        }
      }
    }
  }
  
  let btn = document.getElementsByTagName('button')[0];
  
  function getFreeTime(usersArray = users) {
    usersArray.forEach(
      function(i) {
        changeTimeFormat(i)
      }
    );
  }
  
  btn.onclick = function () {
    getFreeTime()
  
    let errorMsg = document.getElementById('error');
  
    if (isError) {
      errorMsg.style.display = 'flex';
    }
    else {
      errorMsg.style.display = 'none';
    }
  }