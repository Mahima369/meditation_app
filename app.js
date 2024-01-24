const app = () => {
    //we need a song
    const song = document.querySelector(".song");
    //this is an ssvg
    const play = document.querySelector(".play");
    //we need to select the path of  circle inside svg

    // see circle tag inside the svg
    const outline = document.querySelector(".moving-outline circle");
    const video = document.querySelector(".vid-container video");

    // selecting all sounds
    const sounds = document.querySelectorAll(".sound-select button");
    // time display(the h3 tag)
    const timeDisplay = document.querySelector(".time-display");
    // for
    const timeSelect = document.querySelectorAll(".time-select button");
    // to get length of svg outline to animate later
    // we get the outline length
    const outlineLength = outline.getTotalLength();
   

    let fakeDuration = 600;

    sounds.forEach((button)=>{
button.addEventListener("click" , function(){
song.src=this.getAttribute("data-sound");
video.src=this.getAttribute("data-video");
play.src="./svg/play.svg";

});



    });







    // duration of meditation
    // its fake as we are not corealting it with sound its just a simple bitch timer which 
    // will stop sound on completion of time



    // we creat dashes in the outline of circle of 100px
    // outline.style.strokeDasharray=100
    // logic here is to animate the offset and animate offset to make it move like a timer line
    // blue line
    outline.style.strokeDasharray = outlineLength;
    // the offset is kind of opposite to dashed array wherein it adds
    // white line on each 200 or anyspeiced lengh
    //white line
    // white line decrease using length- 
    outline.style.strokeDashoffset = outlineLength;



    // to pick different sounds

    //play sound
    play.addEventListener("click", () => {
        checkplaying(song);
    });



    timeSelect.forEach(option=>{
        option.addEventListener("click",function(){
            fakeDuration = this.getAttribute('data-time');
            timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`;


        });

    });


    const checkplaying = (song) => {
        if (song.paused) {
            song.play();
            video.play();
            play.src = "./svg/pause.svg";

        }
        else {
            song.pause();
            video.pause();
            play.src = "./svg/play.svg";
        }
    }



    song.ontimeupdate = () => {
        let currenttime = song.currentTime;
        let timeleft = fakeDuration - currenttime;
        let minutes = Math.floor(timeleft / 60);
        let seconds = Math.floor(timeleft % 60);

        let progress = outlineLength - (currenttime / fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;

        timeDisplay.textContent = `${minutes}:${seconds}`;


        if (currenttime>=fakeDuration){
            song.pause();
           
            song.currentTime=0;
            play.src="./svg/play.svg";
            video.pause();
        }


    }




}





app();