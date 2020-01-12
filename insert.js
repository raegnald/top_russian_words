
// Insertar json en base de datos.

const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./words.db', (err) =>
	err ? console.log(err) : console.log('[i] DB OK'));




const json = JSON.parse(fs.readFileSync(`./word.json`, 'utf8'));


//console.log(json[5])

// SYNTAX:
// WORD,MEANING,TYPE
// [ 'я', 'I', 'pronoun' ]
// AND WE ALSO HAVE TO HAVE A `top`, BUT THAT'S EASY.


/*for (i in json) {

	let word = json[i][0];
	let type = json[i][2];
	let meaning = json[i][1];

	db.run(
		"INSERT INTO words (word, type, meaning) VALUES ('"+ word + "', '" + type + "', '" + meaning + "')",
		(err) => {
		if (err) {
			console.log("!!! ERROR INSERTANDO", word);
			console.log(err)
		} else {
			console.log("se ha hañadido", word);
		}
	});

}*/



db.all(
	`SELECT * FROM words`,
	(err, rows) => {
	if (err) {
		console.log("\n[!] hay un error pillando la tabla:", err);
	} else {
		
		var stream = fs.createWriteStream("formated.txt");

		stream.once('open', function(fd) {

			for (row in rows) {
				stream.write(
					`<small>#${rows[row].top}</small> <b>${rows[row].word}</b>. <i>${rows[row].type}</i> — ${rows[row].meaning}.\n`
				);
			}
		  stream.end();
		});

	}
});

// rows[row].word.charAt(0).toUpperCase()  						// out => Abc.. instead of abc..
// rows[row].top.toString().padStart(4, '0')