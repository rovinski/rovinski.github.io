/*
eslint-disable
no-param-reassign,
import/no-extraneous-dependencies,
import/no-unresolved,
import/extensions,
class-methods-use-this,
*/

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/timer';

import { animationFrame } from 'rxjs/scheduler/animationFrame';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/observeOn';
import 'rxjs/add/operator/zip';

import { animate } from '../common';
import Flip from './flip';

export default class ProjectFlip extends Flip {
  start(currentTarget) {
    // FLIP
    // Get the first position.
    const img = currentTarget.querySelector('.img');
    const first = img.getBoundingClientRect();
    // const x = currentTarget.querySelector('.name');
    // const firstTitle = x.getBoundingClientRect();
    // const firstFontSize = parseInt(getComputedStyle(x).fontSize, 10);

    // const realImg = img.querySelector('img');
    // realImg.src = realImg.currentSrc;
    // realImg.removeAttribute('srcset');
    // realImg.removeAttribute('sizes');

    // Move it to the end.
    // const imgEl = img.cloneNode(true);
    img.classList.add('lead');
    // img.removeAttribute('srcset');

    img.style.transformOrigin = 'left top';
    this.shadowMain.querySelector('.page').innerHTML = `
      <h1 class="page-title" style="opacity:0">|</h1>
      <div class="post-date heading" style="opacity:0">|</div>
    `;

    img.insertAdjacentHTML('beforebegin', '<div class="sixteen-nine"></div>');
    this.shadowMain.querySelector('.page').appendChild(img);
    this.shadowMain.style.position = 'fixed';
    this.shadowMain.style.display = 'block';

    // Get the last position.
    const last = img.getBoundingClientRect();
    // const y = shadowMain.querySelector('.page-title');
    // const lastTitle = y.getBoundingClientRect();
    // const lastFontSize = parseInt(getComputedStyle(y).fontSize, 10);

    // Invert.
    const invertX = first.left - last.left;
    const invertY = first.top - last.top;
    const invertScale = first.width / last.width;

    // const titleInvertX = firstTitle.left - lastTitle.left;
    // const titleInvertY = firstTitle.top - lastTitle.top;
    // const titleInvertScale = firstFontSize / lastFontSize;

    // animate(y, [
    //   { transform:
    //     `translate3d(${titleInvertX}px, ${titleInvertY}px, 0) scale(${titleInvertScale})` },
    //   { transform: 'translate3d(0, 0, 0) scale(1)' },
    // ], {
    //   duration: this.duration,
    //   easing: 'cubic-bezier(0,0,0.32,1)',
    //   fill: 'forwards',
    // }).subscribe();

    return animate(img, [
      { transform: `translate3d(${invertX}px, ${invertY}px, 0) scale(${invertScale})` },
      { transform: 'translate3d(0, 0, 0) scale(1)' },
    ], {
      duration: this.duration,
      easing: 'cubic-bezier(0,0,0.32,1)',
      // fill: 'forwards',
    });
  }

  ready(main) {
    this.shadowMain.style.position = 'absolute';
    // main.querySelector(TITLE_SELECTOR).style.opacity = 0;

    // TODO: use id?
    const img = main.querySelector('.img');
    img.style.opacity = 0;

    return Observable.fromEvent(img.querySelector('img'), 'load')
      .zip(Observable.timer(this.duration + 100)) // HACK: add some extra time to preven hiccups
      .observeOn(animationFrame)
      .do(() => {
        img.style.opacity = 1;
        this.shadowMain.style.display = 'none';
      });
  }

  after() {
    // shadowMain.style.display = 'none';
    // main.querySelector(TITLE_SELECTOR).style.opacity = 1;
  }
}

Flip.types.project = ProjectFlip;
