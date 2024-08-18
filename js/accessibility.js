(function () {
  // Manage focus rings on the playing board
  let styleEl = document.querySelector('#a11y-styles');
  document.addEventListener('mousedown', () => styleEl.innerHTML = '');
  document.addEventListener('keydown', () => styleEl.innerHTML = '.board button:focus{border:5px solid #999}');

  // Add arrow-key navigation to the playing board
  document.onkeydown = function(e) {
    e = e || window.event;

    let arrowKeyCodes = [37, 38, 39, 40];
    let isKeypressArrowKey = (arrowKeyCodes.indexOf(e.keyCode) >= 0);
    let isBoardButtonActive = (document.activeElement.tagName == 'BUTTON');
    let isContentEditableActive = (document.activeElement.isContentEditable)

    if (!isKeypressArrowKey || isContentEditableActive) {
      return;
    }

    if (!isBoardButtonActive) {
      // Focus on the first board location (top-left).
      document.querySelector('#board button').focus();
    } else {
      let activeCell = document.activeElement.parentElement;
      let activeRow = activeCell.parentElement;
      let activeRowCells = [...activeRow.children];
      let activeCellIndex = activeRowCells.indexOf(activeCell);

      if (e.keyCode === 38) {
        let rowBefore = activeRow.previousElementSibling;
        if (rowBefore) rowBefore.children[activeCellIndex].firstElementChild.focus();
      }
      else if (e.keyCode === 40) {
        let rowAfter = activeRow.nextElementSibling;
        if (rowAfter) rowAfter.children[activeCellIndex].firstElementChild.focus();
      }
      else if (e.keyCode === 37) {
        let cellBefore = activeCell.previousElementSibling;
        if (cellBefore) cellBefore.firstElementChild.focus();
      }
      else if (e.keyCode === 39) {
        let cellAfter = activeCell.nextElementSibling;
        if (cellAfter) cellAfter.firstElementChild.focus();
      }
    };
  }
})();
