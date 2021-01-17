import axios from 'axios';

export default class app {
    constructor() {
        this.offset = 0;
        this.apiKey = '07f05d67192c439bf8203269fc153fdd';
        this.hash = 'a2110823d4049282bfbe666bd8e79fff';
        this.ts = '1609890812920';
        this.limit = 100;
        this.allPerson = '';
        this.general = document.getElementById('general')
        this.propriety = document.getElementById('propriety')
        this.logoMarvel = "https://logodownload.org/wp-content/uploads/2017/05/marvel-logo-0-1536x1536.png"
    }

    getCharacters(page = 1) {

        const url = `https://gateway.marvel.com/v1/public/characters?apikey=${this.apiKey}&hash=${this.hash}&ts=${this.ts}&limit=${this.limit}&offset=${this.offset}`;



    axios.get(url)
        .then(response => {
            this.populate(response.data.data.results);
            this.setSearsh(response.data.data);
            this.setPagination(response.data.data.total, page);
            this.setClickCharacter(response.data.data.results)
        })
        .catch(error => console.log(error));
    }

    setSearsh(info){
        this.allPerson = info;
    }
    populate(data) {

        document.querySelector('.pictures').innerHTML = '';

        data.forEach(item => {
            if(!item.thumbnail.path.includes("image_not_available")){
            const tr = `<td>
            <img class="image margin-10" width="140" height="140" src="${item.thumbnail.path}.${item.thumbnail.extension}" class="rounded" title="${item.name}">
            </td>`;

            document.querySelector('.pictures').innerHTML += tr;
            } else {
                const tr = `<td>
                <img class="image margin-10" width="140" height="140" src="${this.logoMarvel}" class="rounded" title="${item.name}">
                </td>`;

                document.querySelector('.pictures').innerHTML += tr;
            }
        });

    };

    setPagination(totalItems, page) {
        const pages = Math.ceil(totalItems / this.limit);

        document.querySelector('.pagination').innerHTML = '';

        for (let i = 1; i <= pages; i++) {
            const li = `<li class="page-item "><a class="page-link" href="#" data-page="${i}" >${i}</a></li>`;
            document.querySelector('.pagination').innerHTML += li;

            for (let link of document.getElementsByClassName('page-link')) {
                link.addEventListener('click', (event) => {
                    event.preventDefault();

                    const page = event.target.dataset.page;
                    this.offset = (page -1) * this.limit;


                    this.getCharacters(page);

                });


            }

        }
        document.querySelector(`.page-link[data-page="${page}"]`).classList.add("yellow-flag")
    }

    setSearsh(value){

        document.getElementById("search").addEventListener("keyup", function() {
            let word = document.getElementById("search").value.toUpperCase()
            let packge = value.results;

            packge.forEach(item => {
                let tester = item.name.toUpperCase()
                if (!tester.includes(word)){

                document.querySelector(`img[title="${item.name}"]`).classList.add("d-none")

                } else {
                    document.querySelector(`img[title="${item.name}"]`).classList.remove("d-none")
                }

            })

        })
    }

    setClickCharacter(input){


    for (let btn of document.getElementsByClassName('image')) {
        btn.addEventListener('click', (event) => {
            const verificator = btn;

            event.preventDefault();

            console.log(verificator.title)

            input.forEach(item => {
                const comic = item.comics.items;
                const picture = ''
                const personDescription = ''

                if(!item.thumbnail.path.includes("image_not_available")){
                    this.picture = `${item.thumbnail.path}.${item.thumbnail.extension}`
                } else {
                    this.picture = this.logoMarvel
                }

                if (item.name === verificator.title){

                if (item.description === '') {
                    this.personDescription = "Não informado"
                } else {
                    this.personDescription = item.description
                }

                propriety.innerHTML = `<div class="row">

                <img class="col-4 img-person" width="140" height="300" src="${this.picture}">

                <div class="col-8">
                    <div class="name-person"> Name:   ${item.name}</div>
                    <div class="description-person"> Description: </div>
                    <div class="text-person"> ${this.personDescription} </div>
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button class="btn btn-primary me-md-2" id="btn-return" type="button">Return</button>
                    </div>

                </div>
            </div>


            <div>
                <b> HQs comic: </b>
                <div class="col-12 d-flex align-content-around flex-wrap" id="comic-item" > </div>
            </div>`


            const comicItem = document.getElementById('comic-item')

            comic.forEach(item =>{

                const comics = `
                <div class="col-1 row d-block">
                    <img class= width:"65" height:"85" src="${item.resourceURI}">
                    <div class="text-hq"> ${item.name} </div>
                </div>
            `

                comicItem.innerHTML += comics


            })

            }



            })

            general.classList.add("d-none")
            propriety.classList.remove("d-none")

            this.return()


        })



/*        input.forEach(item => {
                if (item === verificator) {
                    console.log("aqui")
                } else {
                    console.log('erro')
                }
        })*/




        }
    }

    return(){
        document.getElementById("btn-return").addEventListener('click', (event) => {
            event.preventDefault();

            this.general.classList.remove("d-none")
            this.propriety.classList.add("d-none")

        })
    }


}




//https://gateway.marvel.com/v1/public/characters?apikey=07f05d67192c439bf8203269fc153fdd&hash=a2110823d4049282bfbe666bd8e79fff&ts=1609890812920&limit=100&offset=0
