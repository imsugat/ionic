import { Component, Listen, Prop } from '@stencil/core';
import { HTMLIonTabButtonElement, HTMLIonTabElement } from '../../index';

@Component({
  tag: 'ion-tab-bar',
  host: {
    theme: 'tab-bar'
  }
})
export class TabBar {

  @Prop() placement = 'bottom';
  @Prop() tabs: HTMLIonTabElement[];
  @Prop() selectedTab: HTMLIonTabElement;
  @Prop() layout: string = 'icon-top';
  @Prop() highlight: boolean = false;

  @Listen('click')
  protected onClick(ev: UIEvent) {
    const btn = (ev.target as HTMLElement).closest('ion-tab-button') as HTMLIonTabButtonElement;
    if (btn) {
      btn.tab.selected = true;
    }
  }

  protected hostData() {
    return {
      'role': 'tablist',
      'class': {
        'placement-top': this.placement === 'top',
        'placement-bottom': this.placement === 'bottom',
      }
    };
  }

  protected render() {
    const selectedTab = this.selectedTab;
    let index = -1;
    const dom = this.tabs.map((tab, i) => {
      const selected = selectedTab === tab;
      if (selected) {
        index = i;
      }
      return (<ion-tab-button
        tab={tab}
        selected={selected}>
      </ion-tab-button>);

    });
    if (this.highlight) {
      dom.push(<ion-tab-highlight selectedIndex={index}></ion-tab-highlight>);
    }
    return dom;
  }
}
