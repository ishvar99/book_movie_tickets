const container=document.querySelector('.container');
const seats=document.querySelectorAll('.row .seat:not(.occupied)')

const movieSelect=document.getElementById('movie');

let ticketPrice=+movieSelect.value; // '+' converts string to number;

const count= document.getElementById('count');
const total =document.getElementById('total');

function updateSelectedCount(){
    const bookedSeats=container.querySelectorAll('.row .seat.selected');
    count.innerText=bookedSeats.length;
    total.innerText=bookedSeats.length*ticketPrice;
    const seatsIndex=[...bookedSeats].map((seat)=>{
        return [...seats].indexOf(seat);
    })
    localStorage.setItem('selectedSeats',JSON.stringify(seatsIndex));
}


movieSelect.addEventListener('change',(e)=>{
    ticketPrice=+e.target.value;
    updateSelectedCount();
})

container.addEventListener('click',(e)=>{
    if(e.target.classList.contains('seat')&& !e.target.classList.contains('occupied'))
    {
        e.target.classList.toggle('selected');
       updateSelectedCount();
    }
})


