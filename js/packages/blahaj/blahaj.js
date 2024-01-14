let blahaj_ascii = `                                          ,(((/                                 
                                        /(((((                                  
                                       ((((#((                              (// 
                                      (((((((.                           *(((/  
                                    /(######/                          *((((/   
                                 *//%#####((/                         ((#((/    
               ,*/********/////////////////(//*           (%*      ,((##((      
      ,*/((///(//////////((/(///////(/////(////*,(*#((/(/((//////###(###(/(     
   /(((((((//((///((////((((((/(((((((((((((((((/(((##((#%(##(/((///*(&#(##/    
  /#((%(#(((((//#((((((((((((((((((((((((#(((((((((((/##(((((//((//*    ####(/  
   (((###(###(#(#####(###############((#((((((((/((//(((#/(/////            ,,  
     ,(###%####%&%#############(#(#(####(((((((/(((/////*//,                    
         . .....*#(#######(((###(#(##(##(((/(/(/////,                           
          .. ....,..........,..*#%#######/(                                     
               ..  .............,*%%%%#%((((/                                   
                       **,,,****//*(##((###(#(((                                
                                        &#(#/#((((((((#                `.split("\n");

applications.blahaj = (_command, args, TERMINAL) => {
    let colors = [];
    
    if(args[1] == "trans") {
        colors.push("#5BCEFA");
        colors.push("#F5A9B8");
        colors.push("#FFFFFF");
        colors.push("#F5A9B8");
        colors.push("#5BCEFA");
    } else {
        if(!args[1]) colors.push("#0000FF");
        else {
            colors.push(args[1]);
        }
    }


    let color_thing = 0;
    for(let i = 0; i < blahaj_ascii.length; i++) {
        new Line(blahaj_ascii[i], args[1], TERMINAL, {
            color: colors[color_thing],
            margin: "0",
            fontSize: "xx-small"
        }).build();

        color_thing += 1;
        if(color_thing == colors.length) color_thing = 0;

        console.log(colors[color_thing]);
    }
}