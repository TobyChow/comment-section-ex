import './css/index.scss';
import './css/header.scss';

const img = `<img src="${require('./images/snow.png')}" alt="">`;
const comment = `<div class="media-body">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni ut hic inventore alias porro repudiandae, laudantium, praesentium in sit labore magnam perspiciatis omnis ea voluptatum rem similique debitis minus, unde nobis. Nobis, nisi iure blanditiis, ab minima sapiente esse optio deleniti soluta expedita quaerat! Culpa dolorem consectetur, non eos natus.</p>
        </div>`;
const mediaObject = `<div class="media-obj-container">
${img}${comment}
</div>`;

const addBtn = document.querySelector('.addComment');
const replyTo = document.querySelector('#reply-to');
console.log(replyTo);
addBtn.addEventListener('click', ()=>{
	replyTo.insertAdjacentHTML('beforeend', mediaObject);
})