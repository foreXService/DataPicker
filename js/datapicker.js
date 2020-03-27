let dateNow = new Date();
const dateToday = new Date();

document.addEventListener('DOMContentLoaded',() =>
{
    createCalendar();
});

Date.prototype.toString = function()
{
    const year = this.getFullYear();
    const month = this.getMonth() + 1 < 10 ? '0' + (this.getMonth() + 1) : this.getMonth() + 1;
    const day = this.getDate() < 10 ? '0' + this.getDate() : this.getDate();
    return year + '-' + month + '-' + day;
}

function prevMonth(event)
{
    dateNow = new Date(dateNow.getFullYear(),dateNow.getMonth() - 1,1);
    createCalendar();
}

function nextMonth(event)
{
    dateNow = new Date(dateNow.getFullYear(),dateNow.getMonth() + 1,1);
    createCalendar();
}

function today(event)
{
    dateNow = dateToday;
    createCalendar();
}

function createSingleDay(date)
{
    const ul = document.querySelector('.calendar .calendar-container');
    const li = document.createElement('li');
    li.textContent = date.getDate();
    li.id = date.toString();
    if (date.getMonth() != dateNow.getMonth()) li.classList.add("calendar-another-month");
    if (date.getDay() == 0) li.classList.add("calendar-sunday");
    if (date.getDate() == dateToday.getDate() && date.getMonth() == dateToday.getMonth() && date.getFullYear() == dateToday.getFullYear()) li.classList.add("calendar-today");
    ul.appendChild(li);
}

function createCalendar()
{
    const ul = document.querySelector('.calendar .calendar-container');
    ul.innerHTML = createHeader();

    let begin = new Date(dateNow.getFullYear(),dateNow.getMonth(),1);
    let end = new Date(dateNow.getFullYear(),dateNow.getMonth() + 1,0);
    
    const weeks = Math.ceil((end.getDate() + begin.getDay()) / 7);
    begin.setDate(1 - begin.getDay());
    
    for (i = 1;i <= weeks * 7 ;i++) 
    {
        createSingleDay(begin);
        begin = new Date(begin.getFullYear(),begin.getMonth(),begin.getDate() + 1);
    }

    const span = document.querySelector('.calendar #calendar-show').textContent = dateNow.toString();
}

function createHeader()
{
    return '<li class="calendar-weeks">Sun</li>'
    +'<li class="calendar-weeks">Mon</li>'
    +'<li class="calendar-weeks">Tue</li>'
    +'<li class="calendar-weeks">Wed</li>'
    +'<li class="calendar-weeks">Thu</li>'
    +'<li class="calendar-weeks">Fri</li>'
    +'<li class="calendar-weeks">Sat</li>'
}