// Setup the main game logic.

(function () {
  let prefixEl = document.querySelector('#prefix');
  let primaryTextEl = document.querySelector('.primary');
  let secondaryTextEl = document.querySelector('.secondary');
  let currentPlayerNameEl = document.querySelector('#current-player');
  let otherPlayerNameEl = document.querySelector('#other-player');
  let playAgainEl = document.querySelector('#play-again');
  let playAgainBtnEl = document.querySelector('#play-again-btn');
  let gameBoardEl = document.querySelector('#board');

  playAgainBtnEl.addEventListener('click', () => location.reload());
  gameBoardEl.addEventListener('click', placeGamePiece);
  currentPlayerNameEl.addEventListener("keydown", Game.do.handleNameChange);
  otherPlayerNameEl.addEventListener("keydown", Game.do.handleNameChange);

  function placeGamePiece(e) {
    if (e.target.tagName !== 'BUTTON') return;

    let targetCell = e.target.parentElement;
    let targetRow = targetCell.parentElement;
    let targetRowCells = [...targetRow.children];
    let gameBoardRowsEls = [...document.querySelectorAll('#board tr')];

    // Detect the x and y position of the button clicked.
    let y_pos = gameBoardRowsEls.indexOf(targetRow);
    let x_pos = targetRowCells.indexOf(targetCell);

    // Ensure the piece falls to the bottom of the column.
    y_pos = Game.do.dropToBottom(x_pos, y_pos);

    if (Game.check.isPositionTaken(x_pos, y_pos)) {
      alert(Game.config.takenMsg);
      return;
    }

    // Add the piece to the board.
    Game.do.addDiscToBoard(x_pos, y_pos);
    Game.do.printBoard();

    // Check to see if we have a winner.
    if (Game.check.isVerticalWin() || Game.check.isHorizontalWin() || Game.check.isDiagonalWin()) {
      gameBoardEl.removeEventListener('click', placeGamePiece);
      prefixEl.textContent = Game.config.winMsg;
      currentPlayerNameEl.contentEditable = false;
      secondaryTextEl.remove();
      playAgainEl.classList.add('show');
      return;
    } else if (Game.check.isGameADraw()) {
      gameBoardEl.removeEventListener('click', placeGamePiece);
      primaryTextEl.textContent = Game.config.drawMsg;
      secondaryTextEl.remove();
      playAgainEl.classList.add('show');
      return;
    }

    // Change player.
    Game.do.changePlayer();
  };

})();
