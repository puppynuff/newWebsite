//* Shiro - 12/22/23

applications.neofetch = (_command, args, TERMINAL) => {
    let date = new Date();

    let OS = getOS();

    let browser_language = navigator.language;
    let cookie_enabled = navigator.cookieEnabled;
    let screen_width = screen.width;
    let screen_height = screen.height;

    let infoTable = `    ██              ▒▒▒▒                                                                                             OS:               ${OS}
    ██            ▓▓▓▓▓▓▒▒▒▒                                    ▓▓▓▓▓▓▓▓▓▓▓▓                                         Browser Language: ${browser_language}
    ██            ██▓▓▓▓▓▓▓▓████                            ████▓▓▓▓▓▓▓▓▓▓██                                         Cookies Enabled:  ${cookie_enabled}
    ██            ██▓▓▓▓▓▓▓▓▓▓▓▓▓▓                        ▓▓▓▓▓▓▓▓▓▓▓▓██▓▓▓▓▒▒                                       Screen Width:     ${screen_width}
    ██            ██▓▓▓▓▒▒██▓▓▓▓▓▓████    ████████      ██▓▓▓▓▓▓▓▓████▒▒██▓▓▓▓                                       Screen Height:    ${screen_height}
    ██            ██▓▓▓▓▒▒▒▒██▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░▓▓▓▓▓▓░░░░▓▓▓▓██▒▒▒▒▒▒██▓▓▓▓                                        
    ██            ██▓▓▓▓▒▒▒▒▒▒████░░░░░░░░░░░░░░░░░░░░░░░░░░░░▓▓▒▒▒▒▒▒██▓▓▓▓▓▓                                       
    ██            ██▓▓▓▓▒▒▒▒▒▒▓▓██░░░░░░░░░░░░░░░░░░░░░░░░▓▓▓▓▓▓▒▒▒▒▒▒██▓▓██░░                                    
    ██            ██▓▓▓▓▒▒▒▒▒▒▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▓▓▒▒▒▒▒▒██▓▓██                                      
    ██            ██▓▓▓▓▓▓▒▒▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▓▓▒▒██░░░░██                                      
    ██              ██░░████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▓▓░░░░░░██                                      
    ██              ██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▓▓░░      ▓▓▒▒                            
    ██              ██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▓▓          ██  ▒▒                          
    ██                ▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▓▓        ██    ▓▓                        
    ██                ██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▓▓        ██    ░░▒▒                      
    ██                ▓▓░░░░░░██████░░░░░░░░░░░░░░░░░░██████░░░░░░░░░░░░▓▓        ██        ▓▓                    
    ██                ██░░░░░░██████░░░░░░░░░░░░░░░░░░██████░░░░░░░░░░░░░░██      ██          ▓▓                  
    ██                ▓▓░░░░░░████  ░░░░░░░░░░░░░░░░░░████  ░░░░░░░░░░░░░░▓▓      ██          ▓▓                  
    ██              ▒▒░░░░░░░░████▓▓░░░░░░░░░░░░░░░░░░████▓▓░░░░░░░░░░░░░░░░▓▓    ██            ▓▓                
    ██              ▓▓░░░░░░░░████░░░░░░░░░░░░░░░░░░░░██████░░░░░░░░░░░░░░░░██    ██            ██                
    ██            ▓▓░░░░░░░░░░░░░░        ██▓▓      ░░░░░░░░░░░░░░░░░░░░░░░░██    ██              ██              
    ██            ▓▓░░░░░░░░░░            ░░░░          ░░░░░░░░░░░░░░░░░░▓▓░░  ▓▓░░              ██              
    ██              ▓▓░░░░                                        ░░░░░░▓▓██  ▓▓░░                  ▓▓            
    ██                ▓▓                ██    ██                    ░░██      ██░░░░                ██            
    ██                ░░▒▒              ░░▓▓▒▒░░                  ▓▓▓▓░░    ▓▓▒▒░░░░                ██            
    ██                    ▓▓                                  ▓▓▓▓        ▓▓░░░░░░░░░░░░    ░░  ░░░░██            
    ██                      ▒▒▓▓                        ▓▓▓▓▓▓████▓▓▓▓    ██░░░░░░░░░░░░░░░░░░░░░░░░██            
`.split("\n");

    for(let i = 0; i < infoTable.length; i++) {
        new Line(infoTable[i], args[1], TERMINAL, {
            color: args[1],
            margin: "0",
            fontSize: "small"
        }).build();
    }
}


function getOS() {
    if (navigator.appVersion.indexOf("Win")!=-1) return "Windows";
    if (navigator.appVersion.indexOf("Mac")!=-1) return "MacOS";
    if (navigator.appVersion.indexOf("X11")!=-1) return "UNIX";
    if (navigator.appVersion.indexOf("Linux")!=-1) return "Linux";
}