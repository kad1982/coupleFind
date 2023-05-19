const button = document.getElementById('btn__start');
const div_button_reset = document.getElementById('div__btn--reset');
const container = document.querySelector('.container');

div_button_reset.addEventListener('click', function () {
  button.disabled = false;
  div_button_reset.style.visibility = 'hidden';
  container.innerHTML = '';
});


button.addEventListener('click', function () {
  button.disabled = true;

  let countVericalVal = document.getElementById('countVertical').value;
  let countHorizontVal = document.getElementById('countHorizont').value;
  if ((!(countHorizontVal % 2 === 0)) || (!(countVericalVal % 2 === 0)) || (countVericalVal < 2) || (countHorizontVal < 2) || (countVericalVal > 10) || (countHorizontVal > 10)) {
    document.getElementById('countVertical').value = 4;
    document.getElementById('countHorizont').value = 4;
  }
  const arrMaxNumber = document.getElementById('countVertical').value * document.getElementById('countHorizont').value / 2;
  const arrCard = [];
  for (let i = 1; i <= arrMaxNumber; i++) {
    arrCard.push(i);
    arrCard.push(i);
  }
  const cardsSort = arrCard.sort(function () {
    return Math.random() - 0.5;
  });

  let firstCard = null;
  let secondCard = null;
  let thirdCard = null;


  let intervalGameOver = null;

  for (let i = 0; i < cardsSort.length; i++) {
    divContainer = document.querySelector('.container');
    divCard = document.createElement('div');
    divCard.classList.add('card');

    imgTop = document.createElement('img');
    imgTop.alt = 'рубашка';
    imgTop.src = './img/top.jpg'
    imgTop.classList.add('top');
    imgTop.style.zIndex = 2;
    divCard.append(imgTop);

    divText = document.createElement('div');
    divText.style.position = 'absolute';
    divText.style.right = '10px';
    divText.style.bottom = '10px';
    divText.style.fontSize = '18px';
    divText.style.fontWeight = 'bold';
    divText.textContent = `${cardsSort[i]}`;
    divText.id = `id_${cardsSort[i]}`;
    divText.style.color = 'red';
    divText.style.zIndex = 1;
    divCard.append(divText);

    imgBottom = document.createElement('img');
    imgBottom.alt = 'спрятанное изображение';

    imgBottom.src =`./img/${cardsSort[i]}.jpg`;
    imgBottom.classList.add('bottom');
    imgBottom.style.position = 'relative'
    imgBottom.style.zIndex = 0;
    divCard.append(imgBottom);

    divContainer.append(divCard);
  }

  const cards = document.querySelectorAll('.card');
  const widthCard = `calc(100% / ${document.getElementById('countHorizont').value} - 5px)`;
  const heightCard = `calc((100% / ${document.getElementById('countHorizont').value} - 5px) * 1.4)`;

  for (const item of cards) {
    item.style.width = widthCard;
    item.style.height = heightCard;
  }

  function checkEqualCard() {
    if (splitTest(firstCard.querySelector('.bottom').src) !== splitTest(secondCard.querySelector('.bottom').src)) {
      firstCard.querySelector('.top').style.zIndex = 2;
      secondCard.querySelector('.top').style.zIndex = 2;
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
    }
    firstCard = thirdCard;
    secondCard = null;
    thirdCard = null;
    intervalGameOver = null;
    checkOpenAllCard();
  }

  function splitTest(str) {
    return str.split('\\').pop().split('/').pop().split('.')[0];
  }

  function checkOpenAllCard() {
    let countOpenCard = 0;
    for (const item of cards) {
      if (item.classList.contains('flip')) countOpenCard += 1;
    }
    if (countOpenCard === document.getElementById('countVertical').value * document.getElementById('countHorizont').value) {
      div_button_reset.style.visibility = 'visible';
    }
  }

  function gameOver() {
    container.innerHTML = '<p style="font-size: 38px; color: red; text-align: center;">Игра закончилась!!!</p>';
    clearInterval(intervalGameOver);
    div_button_reset.style.visibility = 'visible';
    intervalGameOver = null;
  }

  for (const item of cards) {
    item.addEventListener('click', function () {
      item.querySelector('.top').style.zIndex = -1;
      item.classList.toggle('flip');

      if (firstCard === null) {
        if (!this.classList.contains('flip')) return;
        firstCard = this;
        return;
      }
      if (secondCard === null) {
        if (!this.classList.contains('flip')) return;
        secondCard = this;
        checkOpenAllCard();
        return;
      }
      if (thirdCard === null) {
        if (!this.classList.contains('flip')) return;
        thirdCard = this;
      }
      if (thirdCard !== null) {
        checkEqualCard();
        intervalGameOver = setInterval(gameOver, 60000);
      }

    });
  }
});
