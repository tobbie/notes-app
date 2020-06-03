const yargs = require('yargs');
const chalk = require('chalk');
const notes = require('./notes.js')

yargs.version('1.0.0')
const log = console.log;

//create add command
yargs.command({
    command : 'add',
    describe: 'Add a new note',
    builder:{
        title:{
            describe:'Note title',
            demandOption:true,
            type:'string'
        },
        body:{
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.addNote(argv.title, argv.body);
    }
});

//create remove command
yargs.command({
    command : 'remove',
    describe: 'Removing a note',
    builder: {
        title:{
            describe:'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.removeNote(argv.title);
    }
});

//create list command
yargs.command({
    command : 'list',
    describe: 'Lists all notes',
    handler(){
        log(chalk.blue.bold.inverse('-----Your notes-----'))
        notes.listNotes();
    }
});

//create read command
yargs.command({
    command : 'read',
    describe: 'Read a note',
    builder:{
        title:{
            describe:'Note title',
            demandOption: true,
            type:'string'
        }
    },
    handler(argv){
        notes.readNote(argv.title)
    }
});

yargs.parse();

//console.log(yargs.argv);





// console.log(getNotes());

// const log = console.log;

// log(chalk.blue("Success!!!"));

// log(chalk.bold(`I'm bold!!!`));

// log(chalk.inverse(`I'm inverse`));



// const fs = require('fs');

//fs.writeFileSync('notes.txt', 'My name is Oluwatobi');
// const wife = 'Temitope'
// try{
//     fs.appendFileSync('notes.txt',`\nI'm married to ${wife} and I'm a node js developer`);
//     console.log('data has been appended to file')
// }
// catch(err){
//    console.log(err);
// }
