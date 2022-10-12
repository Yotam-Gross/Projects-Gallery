'use strict'

var gProjects = [
    {
        id: 1,
        name: "Ballon Pop", 
        title: "Pops the Ballons", 
        desc: "lorem ipsum lorem ipsum lorem ipsum", 
        url: "projects/ballon-pop/index.html", 
        publishedAt: 1448693940000, 
        labels: ["Matrixes", "keyboard events"], 
    },
    {
        id: 2,
        name: "Mine Sweeper", 
        title: "Find all Minez", 
        desc: "lorem ipsum lorem ipsum lorem ipsum", 
        url: "projects/mine-sweeper/index.html", 
        publishedAt: 1448693940000, 
        labels: ["Matrixes", "keyboard events"], 
    },
    {
        id: 3,
        name: "Pacmen", 
        title: "Pacmen the Gratest", 
        desc: "lorem ipsum lorem ipsum lorem ipsum", 
        url: "projects/pacmen/index.html", 
        publishedAt: 1448693940000, 
        labels: ["Matrixes", "keyboard events"], 
    },
    ]

function getProjects(){
    return gProjects
}

function getProjectById(projId) {
    var proj = gProjects.find(proj => proj.id === projId)
    return proj
}

function openProject(url){
    window.open(url)
}