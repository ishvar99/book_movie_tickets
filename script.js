const container=document.querySelector('.container');
const seats=document.querySelectorAll('.row .seat:not(.occupied)')

const movieSelect=document.getElementById('movie');

let ticketPrice=+movieSelect.value; // '+' converts string to number;

const count= document.getElementById('count');
const total =document.getElementById('total');

populateUI();
function populateUI(){
    const selectedSeats= JSON.parse(localStorage.getItem('selectedSeats'));
    console.log(selectedSeats);
    if(selectedSeats!=null && selectedSeats.length>0){
        console.log(seats);
    [...seats].map((seat,i)=>{
        if(selectedSeats.includes(i)){
            seat.classList.add('selected');
        }
    })
}

}

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
    localStorage.setItem('movieIndex',e.target.selectedIndex)
    localStorage.setItem('moviePrice',e.target.value)
    updateSelectedCount();
})

container.addEventListener('click',(e)=>{
    if(e.target.classList.contains('seat')&& !e.target.classList.contains('occupied'))
    {
        e.target.classList.toggle('selected');
       updateSelectedCount();
    }
})


