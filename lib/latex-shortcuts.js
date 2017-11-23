'use babel';

import LatexShortcutsView from './latex-shortcuts-view';
import { CompositeDisposable } from 'atom';

export default {

  latexShortcutsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'latex-shortcuts:wrap-in-bold': () => this.wrap_in_bold(),
        'latex-shortcuts:wrap-in-emph': () => this.wrap_in_emph(),
        'latex-shortcuts:wrap-in-command': () => this.wrap_in_command(),
        'latex-shortcuts:wrap-in-environment': () => this.wrap_in_environment(),
        'latex-shortcuts:wrap-in-equation': () => this.wrap_in_equation(),
        'latex-shortcuts:insert-environment': () => this.insert_environment()
      })
    );
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  wrap_in_bold() {
	let editor
	if( editor = atom.workspace.getActiveTextEditor() ) {
		let selections = editor.getSelections()
		let cursors = editor.getCursors()

		for(i = selections.length-1; i>=0 ; i--) {
			let selection = selections[i]
			let cursor = cursors[i]
			let selStrPos = selection.getBufferRange().start.toArray()

			if( selection.getText() == "" ) {
				selection.insertText("\\textbf{}")
				cursor.setBufferPosition([selStrPos[0], selStrPos[1]+8])
			}
			else {
				selection.insertText("\\textbf{" + selection.getText() + "}")
			}
		}
	}
  },

  wrap_in_emph() {
    let editor
    if( editor = atom.workspace.getActiveTextEditor() ) {
	    let selections = editor.getSelections()
		let cursors = editor.getCursors()

		for(i = selections.length-1; i>=0 ; i--) {
			let selection = selections[i]
			let cursor = cursors[i]
			let selStrPos = selection.getBufferRange().start.toArray()

			if( selection.getText() == "" ) {
				selection.insertText("\\emph{}")
				cursor.setBufferPosition([selStrPos[0], selStrPos[1]+6])
			}
			else {
				selection.insertText("\\emph{" + selection.getText() + "}")
			}
		}
    }
  },

  insert_environment() {
    let editor
    if( editor = atom.workspace.getActiveTextEditor() ) {
      let curStrPos = editor.getCursorBufferPosition().toArray()
      let pos1 = [curStrPos[0], curStrPos[1] + 7]
      let pos2 = [curStrPos[0] + 2, 5]
      editor.insertText("\\begin{}\n\t\n\\end{}")
      editor.setCursorBufferPosition(pos1)
      editor.addCursorAtBufferPosition(pos2)
    }
  },

  wrap_in_command() {
	  let editor
      if( editor = atom.workspace.getActiveTextEditor() ) {
  	    let selections = editor.getSelections()
  		let cursors = editor.getCursors()

  		for(i = selections.length-1; i>=0 ; i--) {
  			let selection = selections[i]
  			let cursor = cursors[i]
  			let selStrPos = selection.getBufferRange().start.toArray()

			selection.insertText("\\{" + selection.getText() + "}")
			cursor.setBufferPosition([selStrPos[0], selStrPos[1]+1])
  		}
      }
  },

  wrap_in_environment() {
    let editor
    if( editor = atom.workspace.getActiveTextEditor() ) {
		let selections = editor.getSelections()
		let cursors = editor.getCursors()

		for(i = selections.length-1; i>=0 ; i--) {
  			let selection = selections[i]
  			let cursor = cursors[i]
  			let selStrPos = selection.getBufferRange().start.toArray()
	        let rowRange = selection.getBufferRowRange()[1] - selection.getBufferRowRange()[0]
	        let pos1 = [selStrPos[0], selStrPos[1] + 7]
	        let pos2 = [selStrPos[0] + rowRange + 2, 5]
	        let text = selection.getText()

			let newText
			if(text.endsWith("\n")) {
				newText = text.substr(0, text.length-1)
			}
			else {
				newText = text
			}

			selection.insertText("\\begin{}\n\t" + newText + "\n\\end{}")
			cursor.setBufferPosition(pos1)
			editor.addCursorAtBufferPosition(pos2)
  		}
    }
  },

  wrap_in_equation() {
	  let editor
      if( editor = atom.workspace.getActiveTextEditor() ) {
  	    let selections = editor.getSelections()
  		let cursors = editor.getCursors()

  		for(i = selections.length-1; i>=0 ; i--) {
  			let selection = selections[i]
  			let cursor = cursors[i]
  			let selStrPos = selection.getBufferRange().start.toArray()

  			if( selection.getText() == "" ) {
  				selection.insertText("\\(  \\)")
  				cursor.setBufferPosition([selStrPos[0], selStrPos[1]+3])
  			}
  			else {
  				selection.insertText("\\( " + selection.getText() + " \\)")
  			}
  		}
      }
  }


};
