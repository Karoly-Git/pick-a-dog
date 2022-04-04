/*
document.querySelector("form").addEventListener(
    'submit', (event) => {
        event.preventDefault();
    });
    */

const languages = {
    languageOptions: ['ENG', 'HUN', 'PL'],
    h1: {
        eng: 'Pick a dog',
        hun: 'Kutya képtár',
        pol: 'Wybierz psa'
    },
    lebel1: {
        eng: 'Choose a breed:',
        hun: 'Válassz egy fajtát:',
        pol: 'Wybierz rasę psa:'
    },
    lebel2: {
        eng: 'Number of photos:',
        hun: 'Fotók száma:',
        pol: 'Liczba zdjęć:'
    },
    getPhotos_btn: {
        eng: 'Show',
        hun: 'Mutasd',
        pol: 'Pokaż zdjęcia'
    },
    h2: {
        eng: 'Photos will appear in this box:',
        hun: 'A fényképek itt fognak megjelenni:',
        pol: 'Zdjęcia pojawią się w tym polu:'
    },
    alert_whenNoNumber: {
        eng: "Please specify how many photos you would like to display!",
        hun: 'Add meg a megjeleníteni kívánt fotók számát!',
        pol: 'Wybierz, ile zdjęć chcesz wyświetlić!'
    },
    alert_whenOutOfRange: {
        eng: "Selected number must be between 1 and 10!",
        hun: 'Fotók száma 1 és 10 közé kell essen!',
        pol: 'Wybrana liczba musi wynosić od 1 do 10!'
    },
    bottom_link: {
        eng: "This site is maintained by Karoly Hornyak",
        hun: 'Ezt az oldalt Hornyák Károly fejleszti',
        pol: 'Ta strona jest prowadzona przez Karoly Hornyak'
    }
}

document.querySelector('.logo').addEventListener('mouseenter', (event) => {
    document.querySelector('.logo').src = './img_p3/img2.png';
});
document.querySelector('.logo').addEventListener('mouseleave', (event) => {
    document.querySelector('.logo').src = './img_p3/img1.png';
});

let alert_whenNoNumber = languages.alert_whenNoNumber.eng;
let alert_whenOutOfRange = languages.alert_whenOutOfRange.eng;

document.querySelector('.English').addEventListener("click", function () {
    alert_whenNoNumber = languages.alert_whenNoNumber.eng;
    alert_whenOutOfRange = languages.alert_whenOutOfRange.eng;
    document.querySelector('.arrowHun').style.visibility = "hidden";
    document.querySelector('.arrowPol').style.visibility = "hidden";
    document.querySelector('.arrowEng').style.visibility = "visible";
    document.querySelector('h1').innerHTML = languages.h1.eng;
    document.getElementById('lebel1').innerHTML = languages.lebel1.eng;
    document.getElementById('lebel2').innerHTML = languages.lebel2.eng;
    document.getElementById('getPhotos-btn').innerHTML = languages.getPhotos_btn.eng;
    document.querySelector('h2').innerHTML = languages.h2.eng;
    document.querySelector('.link').innerHTML = languages.bottom_link.eng;
});
document.querySelector('.Hungarian').addEventListener("click", function () {
    alert_whenNoNumber = languages.alert_whenNoNumber.hun;
    alert_whenOutOfRange = languages.alert_whenOutOfRange.hun;
    document.querySelector('.arrowHun').style.visibility = "visible";
    document.querySelector('.arrowPol').style.visibility = "hidden";
    document.querySelector('.arrowEng').style.visibility = "hidden";
    document.querySelector('h1').innerHTML = languages.h1.hun;
    document.getElementById('lebel1').innerHTML = languages.lebel1.hun;
    document.getElementById('lebel2').innerHTML = languages.lebel2.hun;
    document.getElementById('getPhotos-btn').innerHTML = languages.getPhotos_btn.hun;
    document.querySelector('h2').innerHTML = languages.h2.hun;
    document.querySelector('.link').innerHTML = languages.bottom_link.hun;
});
document.querySelector('.Polish').addEventListener("click", function () {
    alert_whenNoNumber = languages.alert_whenNoNumber.pol;
    alert_whenOutOfRange = languages.alert_whenOutOfRange.pol;
    document.querySelector('.arrowHun').style.visibility = "hidden";
    document.querySelector('.arrowPol').style.visibility = "visible";
    document.querySelector('.arrowEng').style.visibility = "hidden";
    document.querySelector('h1').innerHTML = languages.h1.pol;
    document.getElementById('lebel1').innerHTML = languages.lebel1.pol;
    document.getElementById('lebel2').innerHTML = languages.lebel2.pol;
    document.getElementById('getPhotos-btn').innerHTML = languages.getPhotos_btn.pol;
    document.querySelector('h2').innerHTML = languages.h2.pol;
    document.querySelector('.link').innerHTML = languages.bottom_link.pol;
});

const url_all = 'https://dog.ceo/api/breeds/list/all';
fetch(url_all)
    .then(result => result.json())
    .then(data => {
        const allList = data.message;
        const Keys = Object.keys(allList);
        for (i of Keys) {
            if (allList[i] == 0) {
                document.getElementById('breeds').innerHTML += `<option id="${i}">${i}</option>`;
            } else {
                document.getElementById('breeds').innerHTML += `<option class="opt-text" id="${i}">${i}</option>`;
                document.getElementById(`${i}`).innerHTML += allList[i].map(x => `<option class="opt-sub">${i}/${x}</option>`);
            }
        }
    });

document.getElementById('getPhotos-btn').addEventListener("click", function () {
    document.getElementById('picture-container').innerHTML = ``;
    const chosenNum = document.getElementById('number').value;
    const chosenBreed = document.getElementById('breeds').value;
    let url_rand = `https://dog.ceo/api/breed/${chosenBreed}/images/random/${chosenNum}`;
    if (chosenNum === '') {
        alert(alert_whenNoNumber);
        document.getElementById('number').focus();
    } else if (chosenNum < 1 || chosenNum > 10) {
        alert(alert_whenOutOfRange);
        document.getElementById('number').focus();
    }
    else {
        fetch(url_rand)
            .then(response => response.json())
            .then(data => {
                const rList = data.message;
                const photos = Object.values(rList);
                photos.map(x => document.getElementById('picture-container').innerHTML += `
            <div class="picture-box">
                <img src="${x}" alt="Breed is ${chosenBreed}"></img>
            </div>
            `);
            });
        if (chosenNum !== '') {
            document.querySelector(".container-title").innerHTML = `<span class="capital">${chosenBreed}</span>:`;
        }
    }
});

