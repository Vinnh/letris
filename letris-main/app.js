const tileDisplay = document.querySelector('.tile-container')

const keyboard = document.querySelector('.key-container')

const messageDisplay = document.querySelector('.message-container')


const palavras = ['SAGAZ', 'NEGRO', 'MEXER', 'TERMO', 'SENSO', 'NOBRE', 'ALGOZ', 'AFETO', 'PLENA',
'SUTIL', 'VIGOR', 'FAZER', 'AUDAZ', 'SANAR', 'ASSIM', 'INATO', 'CERNE', 'IDEIA', 'FOSSE', 'DESDE',
'PODER', 'MORAL', 'TORPE', 'MUITO', 'HONRA', 'JUSTO', 'ANEXO', 'ETNIA', 'SOBRE', 'SONHO', 'TANGE',
'LAPSO', 'EXPOR', 'HAVER', 'AMIGO', 'COSER', 'ARDIL', 'CORJA', 'CAUSA', 'PROLE', 'DIZER', 'TENAZ',
'DEVER', 'DIGNO', 'SABER', 'CRIVO', 'BRADO', 'CEDER', 'COMUM', 'GLEBA', 'SENDO', 'TEMOR', 'ASSAZ',
'CULTO', 'ATROZ', 'MUNDO', 'PAUTA', 'CENSO', 'FUGAZ', 'AINDA', 'COZER', 'DENSO', 'VALHA', 'FORTE']

var num = Math.floor(Math.random() * palavras.length);

const wordle = palavras[num]

const keys = [
    'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'ENTER',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
    '<<',
]


keys.forEach(key => {
    const buttonElement = document.createElement('button')
    buttonElement.textContent = key
    buttonElement.setAttribute('id', key)
    buttonElement.addEventListener('click', () => handleClick(key))
    keyboard.append(buttonElement)
})

const rows= [

    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
    
    ]
    
    let currentRow = 0
    let currentTile = 0
    let isGameOver = false
    
    rows.forEach((row, rowIndex) => {
        const rowElement = document.createElement('div')
        rowElement.setAttribute('id', 'row-' + rowIndex )
    
        row.forEach((guess, guessIndex) => {
            const tileElement = document.createElement('div')
            tileElement.setAttribute('id', 'row-' + rowIndex + '-tile-' + guessIndex)
            tileElement.classList.add('tile')
            rowElement.append(tileElement)
    
        })
    
        tileDisplay.append(rowElement)
    })

const handleClick = (letter) => {

    if(letter === '<<') {
        deleteLetter()
        console.log('rows', rows)
        return
    }

    if(letter === "ENTER"){
        checkRow()
        console.log('rows', rows)
        return
    }

    addLetter(letter)
    console.log('rows', rows)
}

const addLetter = (letter) => {

    if(currentTile < 5 && currentRow < 6){

        const tile = document.getElementById('row-' + currentRow + '-tile-' + currentTile)
        tile.textContent = letter
        tile.setAttribute('data', letter)
        rows[currentRow][currentTile] = letter
        currentTile++

    }
}

const deleteLetter = () => {

    if (currentTile > 0) {
        currentTile--
        const tile = document.getElementById('row-' + currentRow + '-tile-' + currentTile)
        tile.textContent = ''
        rows[currentRow][currentTile] = ''
        tile.setAttribute('data', '')
    }
}

const checkRow = () => {
    const guess = rows[currentRow].join('')

    if (currentTile > 4) {
        flipTile()

        if(wordle == guess) {
            showMessage('Magnifico! Você acertou. A palavra era ' + wordle)
            isGameOver = true
            return
        } else {
            if (currentRow >= 5) {
                isGameOver = false
                showMessage('game over! Você não acertou, a palavra era ' + wordle)
                return
            }
            if(currentRow < 5) {
                currentRow++
                currentTile = 0
            }
        }
    }
}

const showMessage = (message) => {
    const messageElement = document.createElement('p')
    messageElement.textContent = message
    messageDisplay.append(messageElement)
    setTimeout(() => messageDisplay.removeChild(messageElement), 4000)
}

const addColorToKey = (keyLetter, color) => {
    const key = document.getElementById(keyLetter)
    key.classList.add(color)
}


const flipTile = () => {
    const rowTiles = document.querySelector('#row-' + currentRow).childNodes

    let checkWordle = wordle
    const guess = []

    rowTiles.forEach(tile => {
        guess.push({letter: tile.getAttribute('data'), color: 'grey-overlay'})
    })

    guess.forEach((guess, index) => {
        if (guess.letter == wordle[index]) {
            guess.color = 'green-overlay'
            checkWordle = checkWordle.replace(guess.letter, '')
        }
    })

    guess.forEach(guess => {
        if(checkWordle.includes(guess.letter)) {
            guess.color = 'yellow-overlay'
            checkWordle = checkWordle.replace(guess.letter, '')
        }
    })


    rowTiles.forEach((tile, index) => {
        const dataLetter = tile.getAttribute('data')

        setTimeout(() => {
            tile.classList.add('flip')
            tile.classList.add(guess[index].color)
            addColorToKey(guess[index].letter, guess[index].color) 
        }, 500 * index)
    })
}

// dark mode

const $html = document.querySelector('html')
const $checkbox = document.querySelector('#chk')

$checkbox.addEventListener('change', (e) => {
    $html.classList.toggle('dark-mode', e.target.checked)
})