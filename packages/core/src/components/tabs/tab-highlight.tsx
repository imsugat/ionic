import { Component, Element, Listen, Prop, PropDidChange, State } from '@stencil/core';
import { getParentElement } from '../../utils/helpers';

@Component({
  tag: 'ion-tab-highlight'
})
export class TabHighlight {

  @Element() el: HTMLElement;

  @State() animated = false;
  @State() transform = '';
  @Prop() selectedIndex: number;
  @PropDidChange('selectedIndex')
  changedSelectedIndex() {
    this.updateTransform();
  }

  protected ionViewDidLoad() {
    this.updateTransform();
  }

  @Listen('window:resize')
  onresize() {
    this.updateTransform();
  }

  private updateTransform() {
    if (this.selectedIndex < 0) {
      return;
    }
    Context.dom.read(() => {
      const btn = getParentElement(this.el).children[this.selectedIndex];
      this.transform = `translate3d(${btn.offsetLeft}px,0,0) scaleX(${btn.offsetWidth})`;
      if (!this.animated) {
        setTimeout(() => this.animated = true, 80);
      }
    });
  }


  protected hostData() {
    return {
      style: {
        'transform': this.transform
      },
      class: {
        'animated': this.animated,
      }
    };
  }

  protected render() {
    return <slot></slot>;
  }
}
