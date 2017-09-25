// Copyright (c) 2017 Florian Klampfer <https://qwtel.com/>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

import { PushState } from 'hy-push-state/src/vanilla';

import { Observable } from 'rxjs/Observable';
import { fromEvent } from 'rxjs/observable/fromEvent';

import { _catch as recover } from 'rxjs/operator/catch';
import { _do as effect } from 'rxjs/operator/do';
import { debounceTime } from 'rxjs/operator/debounceTime';
import { exhaustMap } from 'rxjs/operator/exhaustMap';
import { filter } from 'rxjs/operator/filter';
import { map } from 'rxjs/operator/map';
import { mergeMap } from 'rxjs/operator/mergeMap';
import { pairwise } from 'rxjs/operator/pairwise';
import { share } from 'rxjs/operator/share';
import { startWith } from 'rxjs/operator/startWith';
import { switchMap } from 'rxjs/operator/switchMap';
import { takeUntil } from 'rxjs/operator/takeUntil';
import { zipProto as zipWith } from 'rxjs/operator/zip';

import elemDataset from 'elem-dataset';

import { animate, hasFeatures, isSafari } from './common';
import CrossFader from './cross-fader';
import upgradeMathBlocks from './katex';

import Flip from './flip/flip';
import './flip/title';
import './flip/project';

const REQUIREMENTS = [
  'eventlistener',
  'queryselector',
  'requestanimationframe',
  'classlist',
  'documentfragment',
  'history',
  'opacity',
  'cssanimations',
];

const DURATION = 250;
const FADE_DURATION = 600;

// whenever the source observable encounters an error,
// we log it to the console, but continue as if it never happend
function makeUnstoppable() {
  return this::recover((error, caught) => {
    console.error(error); // eslint-disable-line
    return caught;
  });
}

if (!window._noPushState && hasFeatures(REQUIREMENTS)) {
  const crossFader = new CrossFader({ duration: DURATION, fadeDuration: FADE_DURATION });

  const pushStateEl = document.getElementById('_hyPushState');

  const animationMain = document.createElement('div');
  animationMain.classList.add('animation-main');
  animationMain.classList.add('fixed-top');
  animationMain.innerHTML = `
    <div class="content">
      <div class="page"></div>
    </div>`;
  pushStateEl.parentNode.insertBefore(animationMain, pushStateEl);

  const loading = document.createElement('div');
  loading.classList.add('loading');
  loading.innerHTML = `
    <span class="sr-only">Loading...</span>
    <div class="sk-folding-cube">
      <div class="sk-cube1 sk-cube"></div>
      <div class="sk-cube2 sk-cube"></div>
      <div class="sk-cube4 sk-cube"></div>
      <div class="sk-cube3 sk-cube"></div>
    </div>
  `;
  document.querySelector('.navbar .content').appendChild(loading);

  const start$ = Observable::fromEvent(pushStateEl, 'hy-push-state-start')
    ::map(({ detail }) => detail)
    ::map(detail => [detail, document.getElementById('_main')])
    ::effect(() => {
      // If a link on the drawer has been clicked, close it
      if (!window._isDesktop && window._drawer.opened) {
        window._drawer.close();
      }
    })
    ::share();

  const ready$ = Observable::fromEvent(pushStateEl, 'hy-push-state-ready')
    ::map(({ detail }) => detail)
    ::share();

  const progress$ = Observable::fromEvent(pushStateEl, 'hy-push-state-progress')
    ::map(({ detail }) => detail);
    // ::share();

  const after$ = Observable::fromEvent(pushStateEl, 'hy-push-state-after')
    ::map(({ detail }) => detail)
    ::share();

  // const error$ = Observable.fromEvent(pushStateEl, 'hy-push-state-error');

  // HACK
  // if (isSafari()) {
  //   Observable::fromEvent(window, 'popstate')
  //     .subscribe(() => { document.body.style.minHeight = '999999px'; });
  //
  //   after$
  //     .subscribe(() => { document.body.style.minHeight = ''; });
  // }

  // FLIP animation (when applicable)
  start$
    ::switchMap(([detail]) => {
      const { event: { currentTarget } } = detail;

      const flip = Flip.create(
        currentTarget.getAttribute &&
        currentTarget.getAttribute('data-flip'), {
          animationMain,
          currentTarget,
          duration: DURATION,
        });

      // HACK: This assumes knowledge of the internal rx pipeline.
      // Could possibly be replaced with `withLatestFrom` shinanigans,
      // but it's more convenient like that.
      detail.flip = flip;

      return flip.start(currentTarget);
    })
    ::makeUnstoppable()
    .subscribe();

  // Fade main content out
  start$
    ::effect(([, main]) => { main.style.opacity = 0; })
    ::filter(([{ type }]) => type === 'push' || !isSafari())
    ::exhaustMap(([{ type }, main]) =>
      animate(main, [
        { opacity: 1 },
        { opacity: 0 },
      ], {
        duration: DURATION,
        // easing: 'ease',
        easing: 'cubic-bezier(0,0,0.32,1)',
      })
        ::effect(() => { if (type === 'push') window.scroll(0, 0); })
        ::zipWith(after$))
    ::makeUnstoppable()
    .subscribe();

  // Show loading bar when taking longer than expected
  progress$
    ::effect(() => { loading.style.display = 'block'; })
    ::makeUnstoppable()
    .subscribe();

  // TODO: error message!?
  // error$
  //   // .delay(DURATION) // HACK
  //   .do(() => {
  //     loading.style.display = 'none';
  //   })
  //   .subscribe();

  // Prepare showing the new content
  ready$
    ::effect(() => { loading.style.display = 'none'; })
    ::filter(({ type }) => type === 'push' || !isSafari())
    ::switchMap(({ flip, content: [main] }) => flip.ready(main)::takeUntil(start$))
    ::makeUnstoppable()
    .subscribe();

  ready$
    ::switchMap(({ content: [main] }) =>
      crossFader.fetchImage(elemDataset(main))::takeUntil(start$))
    ::startWith(document.querySelector('.sidebar-bg'))
    ::pairwise()
    ::mergeMap(::crossFader.crossFade)
    ::makeUnstoppable()
    .subscribe();

  // Animate the new content
  after$
    ::filter(({ type }) => type === 'push' || !isSafari())
    ::map(kind => [kind, document.querySelector('main')])
    ::switchMap(([, main]) =>
      animate(main, [
        { transform: 'translateY(-2rem)', opacity: 0 },
        { transform: 'translateY(0)', opacity: 1 },
      ], {
        duration: DURATION,
        // easing: 'ease',
        easing: 'cubic-bezier(0,0,0.32,1)',
      }))
    ::makeUnstoppable()
    .subscribe();

  after$
    // Don't send a pageview when the user blasts through the history..
    ::debounceTime(2 * DURATION)
    ::effect(() => {
      // Send google analytics pageview
      if (window.ga) window.ga('send', 'pageview', location.pathname);

      // Upgrade math blocks
      upgradeMathBlocks();
    })
    ::makeUnstoppable()
    .subscribe();

  window._pushState = new PushState(pushStateEl, {
    replaceIds: ['_main'],
    linkSelector: 'a[href^="/"]',
    scriptSelector: 'script:not([type^="math/tex"])',
    duration: DURATION,
    instantPop: isSafari(),
    scrollRestoration: !isSafari(),
  });
}
