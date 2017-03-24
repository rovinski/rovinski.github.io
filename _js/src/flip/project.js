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
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/timer';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/zip';

import { animate } from '../common';
import Flip from './flip';

export default class ProjectFlip extends Flip {
  start(currentTarget) {
    const img = currentTarget.querySelector('.img');

    this.shadowMain.querySelector('.page').innerHTML = `
      <h1 class="page-title" style="opacity:0">|</h1>
      <div class="post-date heading" style="opacity:0">|</div>
    `;

    const placeholder = document.createElement('div');
    placeholder.classList.add('sixteen-nine');
    img.parentNode.insertBefore(placeholder, img);
    img.classList.add('lead');
    img.style.transformOrigin = 'left top';
    this.shadowMain.querySelector('.page').appendChild(img);
    this.shadowMain.style.position = 'fixed';
    this.shadowMain.style.opacity = 1;

    const first = placeholder.getBoundingClientRect();
    const last = img.getBoundingClientRect();

    const invertX = first.left - last.left;
    const invertY = first.top - last.top;
    const invertScale = first.width / last.width;

    return animate(img, [
      { transform: `translate3d(${invertX}px, ${invertY}px, 0) scale(${invertScale})` },
      { transform: 'translate3d(0, 0, 0) scale(1)' },
    ], {
      duration: this.duration,
      easing: 'cubic-bezier(0,0,0.32,1)',
    })
      .do(() => { this.shadowMain.style.position = 'absolute'; });
  }

  ready(main) {
    this.shadowMain.style.willChange = 'opacity';

    const img = main.querySelector('.img');

    if (img != null) {
      img.style.opacity = 0;
      img.style.willChange = 'opacity';
    }

    const realImg = img.querySelector('img');
    return (realImg == null ?
      Observable.of(true) :
      Observable.fromEvent(realImg, 'load')
    )
      // HACK: add some extra time to prevent hiccups
      .zip(Observable.timer(this.duration + 100))
      .do(() => {
        if (img != null) {
          img.style.opacity = 1;
          img.style.willChange = '';
        }

        this.shadowMain.style.opacity = 0;
        this.shadowMain.style.willChange = '';
      });
  }
}

Flip.types.project = ProjectFlip;
