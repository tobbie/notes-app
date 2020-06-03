const fs = require('fs');
const chalk = require('chalk');
const log = console.log;

const getNotes = () => {
    return `Here are the notes at ${new Date()}`
}

const addNote = (title, body) => {
  const notes = loadNotes()
  const duplicateNotes = notes.filter((note) => note.title === title)
  const duplicateNote = notes.find((note) => note.title === title)

  if(duplicateNote === undefined){
    notes.push({
        title: title,
        body:body
     })
    saveNotes(notes);
    log(chalk.green.inverse('New note added!'))
  }
  else{
      log(chalk.red.inverse('Note title taken!'))
  }
  
}

const saveNotes = (notes) => {
    const notesJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', notesJSON)
}

const loadNotes = () => {
    try{
         const notesBuffer =  fs.readFileSync('notes.json');
         const notesString = notesBuffer.toString();
         return JSON.parse(notesString);
    }
    catch(error){
         return [];
    }
  }


const removeNote = (title)=> {
    log(`Removing note with title ${title}`);
    const notes = loadNotes();
    const notesToKeep = notes.filter((note) => {
       return note.title !== title
    })
    if(notesToKeep.length === notes.length){
        log(chalk.bgRed('No note found!'))
        return;
    }else{
        saveNotes(notesToKeep);
        log(chalk.bgGreen('Note removed!'))
    }  
}

const listNotes = () => {
    const notes = loadNotes();
    notes.forEach((note) =>{
        log(chalk.yellow('-----------------------'));
        return log(chalk.green(`Title:  ${note.title}`))  
    })
}

module.exports = {
    getNotes,
    addNote,
    removeNote,
    listNotes
}