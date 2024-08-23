// Add in all of the base pre-loaded files.
let active_filesystem = {};
const BASE_DIRECTORY = new directory(true, "/");

async function setupDirectories() {
    // Creating the base dirs, where everything is going to go.
    const RU_32_DIRECTORY = new directory(true, "/RU32");

    RU_32_DIRECTORY.addPath("index.js", new RubyFile("ruby.js", true, await getFileContent("./js/ruby.js")));

    const BASE_SYTEM_DIR = new directory(true, "/RU32/base_system");

    // Load the file system, into the file system?
    const FILE_SYSTEM_DIR = new directory(true, "/RU32/base_system/file_system");
    FILE_SYSTEM_DIR.addPath("file.js", new RubyFile("file.js", true, await getFileContent("./js/base_system/file_system/file.js")));
    FILE_SYSTEM_DIR.addPath("directory.js", new RubyFile("directory.js", true, await getFileContent("./js/base_system/file_system/directory.js")));

    const TERMINAL_DIR = new directory(true, "/RU32/base_system/terminal");
    TERMINAL_DIR.addPath("index.js", new RubyFile("index.js", true, await getFileContent("./js/base_system/terminal/index.js")));
    TERMINAL_DIR.addPath("commands.js", new RubyFile("commands.js", true, await getFileContent("./js/base_system/terminal/commands.js")));

    let PACKAGE_MANAGER_DIR = new directory(true, "/RU32/base_system/package_manager");
    PACKAGE_MANAGER_DIR.addPath("rpm.js", new RubyFile("rpm.js", true, await getFileContent("./js/base_system/package_manager/rpm.js")));

    const CONTROLLER_INPUT_API_DIR = new directory(true, "/RU32/base_system/controller_input_api");
    CONTROLLER_INPUT_API_DIR.addPath("controllers.js", new RubyFile("controllers.js", true, await getFileContent("./js/base_system/controller_input_api/controllers.js")));

    
    BASE_SYTEM_DIR.addPath("controller_input_api", CONTROLLER_INPUT_API_DIR);
    BASE_SYTEM_DIR.addPath("file_system", FILE_SYSTEM_DIR);
    BASE_SYTEM_DIR.addPath("terminal", TERMINAL_DIR);
    BASE_SYTEM_DIR.addPath("package_manager", PACKAGE_MANAGER_DIR);

    RU_32_DIRECTORY.addPath("base_system", RU_32_DIRECTORY);

    BASE_DIRECTORY.addPath("RU32", RU_32_DIRECTORY);

    BASE_DIRECTORY.addPath("testing.js", new RubyFile("testing.js", true, "console.log(\"This works through eval!\");"));
}

async function getFileContent(url) {
    return await(await fetch(url)).text();
}

setupDirectories();

//* Shiro - 12/22/23
setup();
