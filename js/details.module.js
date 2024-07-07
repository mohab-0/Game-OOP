import { Ui } from "./ui.module.js";

export class Details {
    constructor(id) {
        this.closeButton = document.getElementById('btnClose')
        this.closeButton.addEventListener("click", () => {
            document.getElementById('details').classList.add('d-none')
            document.getElementById('home').classList.remove('d-none')
        })

        this.loading = document.querySelector('.loading')

        this.getdetails(id);
    }

    async getdetails(id) {
        this.loading.classList.remove('d-none')
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '0ddd4dd425mshd79f88c5d3ebe65p1f3190jsnab85a638a0ba',
                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
            },
        };

        const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id} `,options )
        const response = await api.json();
        new Ui().displayDetails(response)
        this.loading.classList.add('d-none')
    }

}