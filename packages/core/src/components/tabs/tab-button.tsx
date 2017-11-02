import { Component, Prop } from '@stencil/core';
import { HTMLIonTabElement } from '../../index';

@Component({
  tag: 'ion-tab-button',
  host: {
    theme: 'tab-button'
  }
})
export class TabButton {

  @Prop() selected: boolean = false;
  @Prop() tab: HTMLIonTabElement;

  protected hostData() {
    const tab = this.tab;
    const hasTitle = !!tab.title;
    const hasIcon = !! tab.icon;
    const hasTitleOnly = (hasTitle && !hasIcon);
    const hasIconOnly = (hasIcon && !hasTitle);
    const hasBadge = !!tab.badge;
    return {
      'role': 'tab',
      'aria-selected': this.selected,
      class: {
        'has-title': hasTitle,
        'has-icon': hasIcon,
        'has-title-only': hasTitleOnly,
        'has-icon-only': hasIconOnly,
        'has-badge': hasBadge,
        'tab-disabled': !tab.enabled,
        'tab-hidden': tab.hidden,
      }
    };
  }

  protected render() {
    const items = [];
    const tab = this.tab;

    if (tab.icon) {
      items.push(<ion-icon class='tab-button-icon' name={tab.icon}></ion-icon>);
    }
    if (tab.title) {
      items.push(<span class='tab-button-text'>{tab.title}</span>);
    }
    if (tab.badge) {
      items.push(<ion-badge class='tab-badge' color={tab.badgeStyle}>{tab.badge}</ion-badge>);
    }
    items.push(<div class='button-effect'></div>);

    return items;
  }
}
