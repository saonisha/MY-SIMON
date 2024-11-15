    // const cards=document.querySelectorAll(".btn");
    // const observer=new IntersectionObserver(object =>{
    //     console.log(object);
    //     object.forEach(item=>{
    //         item.target.classList.toggle('show',item.isIntersecting)
    //     })
    // }, {threshold:1}
    // );  

    // observer.observe(cards[0]);

    // cards.forEach(card=>{
    //     observer.observe(card);
    // })

    
    const hiddenLeft=document.querySelectorAll('.hidden');
    const observerL= new IntersectionObserver(
        (entries)=>{
            entries.forEach(
                (entry)=>{
                    console.log(entry);
                    // if(entry.isIntersecting){
                    //     entry.target.classList.add('show');
                    // }
                    // else{
                    //     entry.target.classList.remove('show');
                    // }

                    entry.target.classList.toggle('show', entry.isIntersecting)
                });
        } );

    
        hiddenLeft.forEach(
            (el)=>observerL.observe(el) );


     const hiddenElements=document.querySelectorAll('.hiddenRight');
     const observer= new IntersectionObserver(
        (entries)=>{
            entries.forEach(
                 (entry)=>{
                     console.log(entry);
                        // if(entry.isIntersecting){
                        //     entry.target.classList.add('showRight');
                        //     }
                        //     else{
                        //     entry.target.classList.remove('showRight');
                        //     }
                        entry.target.classList.toggle('showRight', entry.isIntersecting)

                });
          } );
    
           
        hiddenElements.forEach(
            (el)=>observer.observe(el) );





                
    let gamePattern=[];
    let buttonColors=["pink","blue","green","yellow"];
    let userClickedPattern=[];
    var level=0; 
    let started=false

    $(document).keypress(function(){
        if(!started){
            nextSequence();
            $("h3").text("LEVEL : "+level);
        }
    });
    

    function nextSequence(){
   
        userClickedPattern=[];
        level++;
        $("h3").text("LEVEL : "+level);

        let randomNumber=Math.floor(Math.random()*4); 
        let randomChosenColor=buttonColors[randomNumber];

        gamePattern.push(randomChosenColor);

        console.log(randomNumber);
        console.log(randomChosenColor);
        console.log("Gamer Pattern array has: ");
        console.log(gamePattern);
    
        $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
        setTimeout(function(){
            $(pink).fadeOut();
        },2000);

       

        
      
        playSound(randomChosenColor);
        
    }

   
    $(".btn").click(function(){
        let userChosenColor=$(this).attr('id');
            console.log(userChosenColor);
            userClickedPattern.push(userChosenColor);
            console.log("User Clicked Pattern Array has: ");
            console.log(userClickedPattern);

               playSound(userChosenColor);
               animatePress(userChosenColor);

               console.log("LEVEL:"+level)

      
             checkanswer(userClickedPattern.length-1);

             
        });

    function playSound(name){
        var audio=new Audio(name+".mp3"); 
        audio.play();

    }

    function animatePress(currentColor){
            $("#"+currentColor).addClass("pressed");
            setTimeout(()=>{
                $("#"+currentColor).removeClass("pressed")},100)
     
    }


    function checkanswer(currentlevel){

        if(gamePattern[currentlevel]==userClickedPattern[currentlevel]){
            console.log("right");
           
                if(userClickedPattern.length==gamePattern.length){
                    setTimeout(function(){
                        nextSequence();
                    },100);

                }
            }

            else{
                console.log("wrong");
                $('body').addClass("game-over");

                setTimeout(function(){
                    $('body').removeClass("game-over");
                },200);

                $("h1").text("Game Over, Press Any Key to Restart ");
                startover();
               
            }
     }



    function startover(){
            started=false;
            gamePattern=[];
            level=0;

        }

