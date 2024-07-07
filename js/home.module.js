import { Details } from "./details.module.js";
import { Ui } from "./ui.module.js"

export class Home {
    constructor() {
        this.ui = new Ui();
        const links = document.querySelectorAll(".menu a");
        for (let i = 0; i < links.length; i++) {
            links[i].addEventListener("click", (e) => {
                document.querySelector(".menu .active").classList.remove("active");
                e.target.classList.add("active");
                this.getGames(e.target.dataset.category);
            });
        }
        this.loading = document.querySelector('.loading')
        this.details = document.getElementById('details')
        this.home = document.getElementById('home')
    
        this.getGames("mmorpg");
    }

    async getGames(category) {

        this.loading.classList.remove('d-none')

        const options = {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": "761b8a3226msh868f0d927cb6ea4p117ef0jsn46d63d281712",
                "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        };
        const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`, options)
        const response = await api.json();
        this.loading.classList.add('d-none')

        this.ui.displayGames(response);
        document.querySelectorAll('.card').forEach((card) => {
            card.addEventListener("click", () => {
                this.details.classList.remove('d-none')
                this.home.classList.add('d-none')
                 new Details(card.dataset.id)
            })
        })
    }
}