let cellIndex = 0;
let today = new Date();
// let currentMonth = document.querySelector(`.grid-item:nth-child(${today.getMonth() + 1})`);
// let currentDay = currentMonth.querySelector(`td[data-tag="${today.getDate()}"]`);

const monate = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];
let params = new URLSearchParams(window.location.search);
let year = params.get('year') || new Date().getFullYear(); // Holt das Jahr aus den Query-Parametern oder verwendet das aktuelle Jahr

document.getElementById('selectedYear').textContent = 'Kalender für das Jahr ' + year;
document.title = 'Kalender für das Jahr ' + year;

function getDaysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

function getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    let yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    let weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    return weekNo;
}

document.getElementById('yearForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Verhindert das Neuladen der Seite

    let year = document.getElementById('yearInput').value; // Holt den eingegebenen Wert

    if (year) {
        // Lädt die Seite neu mit dem ausgewählten Jahr als QueryParameter
        window.location.href = window.location.pathname + '?year=' + year;
    }
});


function getDayIndex(year, month, day) {
    let index = 0;
    for (let i = 0; i < month; i++) {
        index += new Date(year, i, 0).getDate();
    }
    index += day;
    return index;
}

function addFeiertage() {
    let tagderarbeitIndex = getDayIndex(2022, 4, 1); // Tag der Arbeit ist am 1. Mai
    let tagderarbeit = document.querySelector(`div.grid-item[data-index="${tagderarbeitIndex}"]`);
    if (tagderarbeit) { 
        tagderarbeit.style.textDecoration = 'underline';
        tagderarbeit.addEventListener('click', function() {
            alert('Tag der Arbeit');
        });
    }
}

// Erstellen Sie hier Ihren Kalender mit dem ausgewählten Jahr
let index = 0;

for (let i = 0; i < monate.length; i++) {
    let dateInstanz = new Date(year, i, 1);
    let ersterTag = (dateInstanz.getDay() + 6) % 7;
    let anzTageMonat = new Date(year, i + 1, 0).getDate();

    let monatsElemente = document.querySelector(`.grid-item:nth-child(${i + 1})`);
    monatsElemente.innerHTML = `<h2>${monate[i]}</h2><table><thead><tr><th>KW</th><th>Mo</th><th>Di</th><th>Mi</th><th>Do</th><th>Fr</th><th>Sa</th><th>Su</th></tr></thead><tbody></tbody></table>`;
    let tabelle = monatsElemente.querySelector('tbody');

    let tag = 1;
    for (let j = 0; j < 6; j++) {
        let row = document.createElement('tr');
        let weekCell = document.createElement('td');
        weekCell.classList.add('weekCell'); // Fügt die Klasse hinzu
        let weekNo = getWeekNumber(new Date(year, i, tag));
        weekCell.textContent = weekNo;
        row.appendChild(weekCell);

        let hasDays = false;
        for (let k = 0; k < 7; k++) {
            let zelle = document.createElement('td');

            if ((j > 0 || k >= ersterTag) && tag <= anzTageMonat) {
                zelle.textContent = tag;
                zelle.dataset.tag = tag;
                zelle.dataset.index = index;
                tag++;
                index++;
                hasDays = true;

                let today = new Date();
                if (year === today.getFullYear() && i === today.getMonth() && tag - 1 === today.getDate()) {
                    zelle.classList.add('currentDay');
                }
            }
            row.appendChild(zelle);
        }
        if (!hasDays) break;
        tabelle.appendChild(row);
    }
}
//---------------------------------------------------Feiertage---------------------------------------------------

let heute = new Date(); // aktuelles Datum, selbes Prinzip wie bei der Erstellung des Kalenders, muss so oder so überprüft werden
if (year == heute.getFullYear()) {

    let currentMonth = heute.getMonth() + 1; 
    let currentDay = heute.getDate();

    let monthElement = document.querySelector(`.grid-item:nth-child(${currentMonth})`);
    let dayElement = monthElement.querySelector(`td[data-tag="${currentDay}"]`);
    dayElement.classList.add('currentDay');
}


let monat = document.querySelector('.grid-item:nth-child(1)');
let tag = monat.querySelector('td[data-tag="1"]'); 

// Style
tag.style.textDecoration = 'underline';
tag.style.textDecoration = 'none';
tag.style.borderBottom = '2px solid green';

tag.addEventListener('click', function() {
    alert('Neujahr');
});



monat = document.querySelector('.grid-item:nth-child(5)');  //Tag der Arbeit
tag = monat.querySelector('td[data-tag="1"]'); 
tag.style.textDecoration = 'underline';
tag.style.textDecoration = 'none';
tag.style.borderBottom = '2px solid green';
//tag.classList.add('currentDay'); // um zu testen ob es auch funktioniert, wenn Tag auch Feiertag ist
tag.addEventListener('click', function() {
    alert('Tag der Arbeit');
});

monat = document.querySelector('.grid-item:nth-child(10)');  //Tag der deutschen Einheit
tag = monat.querySelector('td[data-tag="3"]'); 
tag.style.textDecoration = 'underline';
tag.style.textDecoration = 'none';
tag.style.borderBottom = '2px solid green';
tag.addEventListener('click', function() {
    alert('Tag der deutschen Einheit');
});

monat = document.querySelector('.grid-item:nth-child(10)');  //Reformationstag
tag = monat.querySelector('td[data-tag="31"]'); 
tag.style.textDecoration = 'underline';
tag.style.textDecoration = 'none';
tag.style.borderBottom = '2px solid green';
tag.addEventListener('click', function() {
    alert('Reformationstag');
});

monat = document.querySelector('.grid-item:nth-child(12)');  //Erster Weihnachtstag
tag = monat.querySelector('td[data-tag="25"]'); 
tag.style.textDecoration = 'underline';
tag.style.textDecoration = 'none';
tag.style.borderBottom = '2px solid green';
tag.addEventListener('click', function() {
    alert('Erster Weihnachtstag');
});

monat = document.querySelector('.grid-item:nth-child(12)');  //Zweiter Weihnachtstag
tag = monat.querySelector('td[data-tag="26"]'); 
tag.style.textDecoration = 'underline';
tag.style.textDecoration = 'none';
tag.style.borderBottom = '2px solid green';
tag.addEventListener('click', function() {
    alert('Zweiter Weihnachtstag');
});

//---------------------------------------------------dynamische Feiertage---------------------------------------------------

    //Ostersonntag
    let M=24, N=5;
    let a = year % 19;
    let b = year % 4;
    let c = year % 7;
    let d = (19*a + M) % 30;
    let e = (2*b + 4*c + 6*d + N) % 7;
    let osterDatum = 22 + d + e;
    let osterMonat = 3;
    let osterTag = osterDatum;
    if(osterDatum > 31) {
        osterMonat = 4;
        osterTag = osterDatum - 31;
    }
    
    monat = document.querySelector(`.grid-item:nth-child(${osterMonat})`);
    tag = monat.querySelector(`td[data-tag="${osterTag}"]`);
    tag.style.textDecoration = 'underline';
    tag.style.textDecoration = 'none';
    tag.style.borderBottom = '2px solid green';
    tag.addEventListener('click', function() {
        alert('Ostersonntag');
    });

        //--------------------------------------------------------------------------------------------
    let busUndBettag = new Date(year, 10, 23); 


    while (busUndBettag.getDay() !== 3) { //Ist Mittwoch? [3]
        
        busUndBettag.setDate(busUndBettag.getDate() - 1); // nein dann ein Tag zurück
    }

    let busUndBettagDay = busUndBettag.getDate();

    monat = document.querySelector('.grid-item:nth-child(11)'); 
    tag = monat.querySelector(`td[data-tag="${busUndBettagDay}"]`);
    tag.style.textDecoration = 'underline';
    tag.style.textDecoration = 'none';
    tag.style.borderBottom = '2px solid green';
    tag.addEventListener('click', function() {
        alert('Buß- und Bettag');
    });

        //--------------------------------------------------------------------------------------------

        let osterSonntag = new Date(year, osterMonat - 1, osterTag);

        let karFreitag = new Date(osterSonntag.getTime()); 
        karFreitag.setDate(karFreitag.getDate() - 2); 

        let karFreitagTag = karFreitag.getDate();
        let karFreitagMonat = karFreitag.getMonth() + 1;

        monat = document.querySelector(`.grid-item:nth-child(${karFreitagMonat})`);
        tag = monat.querySelector(`td[data-tag="${karFreitagTag}"]`);
        tag.style.textDecoration = 'underline';
        tag.style.textDecoration = 'none';
        tag.style.borderBottom = '2px solid green';
        tag.addEventListener('click', function() {
            alert('Karfreitag');
        });

         //--------------------------------------------------------------------------------------------
       
        let osterMontag = new Date(osterSonntag.getTime()); 
        osterMontag.setDate(osterMontag.getDate() +1);

        let osterMontagTag = osterMontag.getDate();
        let osterMontagMonat = osterMontag.getMonth() + 1; 

        monat = document.querySelector(`.grid-item:nth-child(${osterMontagMonat})`);
        tag = monat.querySelector(`td[data-tag="${osterMontagTag}"]`);
        tag.style.textDecoration = 'underline';
        tag.style.textDecoration = 'none';
        tag.style.borderBottom = '2px solid green';
        tag.addEventListener('click', function() {
             alert('Oster-Montag');
        });
 

         //--------------------------------------------------------------------------------------------
       
        let himmelfahrt = new Date(osterSonntag.getTime()); 
        himmelfahrt.setDate(himmelfahrt.getDate() +39);

        let himmelfahrtTag = himmelfahrt.getDate();
        let himmelfahrtMonat = himmelfahrt.getMonth() + 1; 
 
        monat = document.querySelector(`.grid-item:nth-child(${himmelfahrtMonat})`);
        tag = monat.querySelector(`td[data-tag="${himmelfahrtTag}"]`);
        tag.style.textDecoration = 'underline';
        tag.style.textDecoration = 'none';
        tag.style.borderBottom = '2px solid green';
        tag.addEventListener('click', function() {
             alert('Himmelfahrt');
        });

        

         //--------------------------------------------------------------------------------------------
       
        let pfingstMontag = new Date(osterSonntag.getTime()); 
        pfingstMontag.setDate(pfingstMontag.getDate() +50);

        let pfingstMontagTag = pfingstMontag.getDate();
        let pfingstMontagMonat = pfingstMontag.getMonth() + 1; 
 
        monat = document.querySelector(`.grid-item:nth-child(${pfingstMontagMonat})`);
        tag = monat.querySelector(`td[data-tag="${pfingstMontagTag}"]`);
        tag.style.textDecoration = 'underline';
        tag.style.textDecoration = 'none';
        tag.style.borderBottom = '2px solid green';
        tag.addEventListener('click', function() {
             alert('Pfingstmontag');
        });

        document.getElementById('aktuellesJahrButton').addEventListener('click', function() {
            let aktuellesJahr = new Date().getFullYear();
            // Lädt die Seite neu mit dem aktuellen Jahr als QueryParameter
            window.location.href = window.location.pathname + '?year=' + aktuellesJahr;
        });

        document.getElementById('toggleTopbarButton').addEventListener('click', function() {
            let topbar = document.getElementById('topbar');
            let button = document.getElementById('toggleTopbarButton');
            button.style.fontWeight = 'bold';
            if (topbar.style.opacity !== '0') {
                topbar.style.opacity = '0'; 
                setTimeout(() => { topbar.style.visibility = 'hidden'; }, 500);
                button.textContent = 'An ▲'; 
            } else {
                topbar.style.visibility = 'visible';
                topbar.style.opacity = '1'; 
                button.textContent = 'Aus ▼'; 
            }
        });