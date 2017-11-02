import { Component, Element, Event, EventEmitter, Method, Prop, PropDidChange, State } from '@stencil/core';
import { HTMLIonNavElement } from '../../index';

/**
 * @name Tab
 * @description
 * The Tab component, written `<ion-tab>`, is styled based on the mode and should
 * be used in conjunction with the [Tabs](../Tabs/) component.
 *
 * Each `ion-tab` is a declarative component for a [NavController](../../../navigation/NavController/).
 * Basically, each tab is a `NavController`. For more information on using
 * navigation controllers take a look at the [NavController API Docs](../../../navigation/NavController/).
 *
 * See the [Tabs API Docs](../Tabs/) for more details on configuring Tabs.
 *
 * @usage
 *
 * To add a basic tab, you can use the following markup where the `root` property
 * is the page you want to load for that tab, `tabTitle` is the optional text to
 * display on the tab, and `tabIcon` is the optional [icon](../../icon/Icon/).
 *
 * ```html
 * <ion-tabs>
 *  <ion-tab [root]="chatRoot" tabTitle="Chat" tabIcon="chat"></ion-tab>
 * </ion-tabs>
 * ```
 *
 * Then, in your class you can set `chatRoot` to an imported class:
 *
 * ```ts
 * import { ChatPage } from '../chat/chat';
 *
 * export class Tabs {
 *   // here we'll set the property of chatRoot to
 *   // the imported class of ChatPage
 *   chatRoot = ChatPage;
 *
 *   constructor() {
 *
 *   }
 * }
 * ```
 *
 * You can also pass some parameters to the root page of the tab through
 * `rootParams`. Below we pass `chatParams` to the Chat tab:
 *
 * ```html
 * <ion-tabs>
 *  <ion-tab [root]="chatRoot" [rootParams]="chatParams" tabTitle="Chat" tabIcon="chat"></ion-tab>
 * </ion-tabs>
 * ```
 *
 * ```ts
 * export class Tabs {
 *   chatRoot = ChatPage;
 *
 *   // set some user information on chatParams
 *   chatParams = {
 *     user1: 'admin',
 *     user2: 'ionic'
 *   };
 *
 *   constructor() {
 *
 *   }
 * }
 * ```
 *
 * And in `ChatPage` you can get the data from `NavParams`:
 *
 * ```ts
 * export class ChatPage {
 *   constructor(navParams: NavParams) {
 *     console.log('Passed params', navParams.data);
 *   }
 * }
 * ```
 *
 * Sometimes you may want to call a method instead of navigating to a new
 * page. You can use the `(ionSelect)` event to call a method on your class when
 * the tab is selected. Below is an example of presenting a modal from one of
 * the tabs.
 *
 * ```html
 * <ion-tabs>
 *   <ion-tab (ionSelect)="chat()" tabTitle="Show Modal"></ion-tab>
 * </ion-tabs>pop
 * ```
 *
 * ```ts
 * export class Tabs {
 *   constructor(public modalCtrl: ModalController) {
 *
 *   }
 *
 *   chat() {
 *     let modal = this.modalCtrl.create(ChatPage);
 *     modal.present();
 *   }
 * }
 * ```
 *
 *
 * @demo /docs/demos/src/tabs/
 * @see {@link /docs/components#tabs Tabs Component Docs}
 * @see {@link ../../tabs/Tabs Tabs API Docs}
 * @see {@link ../../nav/Nav Nav API Docs}
 * @see {@link ../../nav/NavController NavController API Docs}
 */
@Component({
  tag: 'ion-tab',
})
export class Tab {

  // private loaded: boolean;
  // private _segment: NavSegment;
  private nav: HTMLIonNavElement;

  @Element() el: HTMLElement;

  @State() tabId: string;
  @State() btnId: string;
  @State() init = false;

  /**
   * @input {Page} Set the root page for this tab.
   */
  @Prop() root: any;

  /**
   * @input {object} Any nav-params to pass to the root page of this tab.
   */
  @Prop() rootParams: any;

  /**
   * @input {string} The URL path name to represent this tab within the URL.
   */
  @Prop() tabUrlPath: string;

  /**
   * @input {string} The title of the tab button.
   */
  @Prop() title: string;

  /**
   * @input {string} The icon for the tab button.
   */
  @Prop() icon: string;

  /**
   * @input {string} The badge for the tab button.
   */
  @Prop() badge: string;

  /**
   * @input {string} The badge color for the tab button.
   */
  @Prop() badgeStyle: string = 'default';

  /**
   * @input {boolean} If true, enable the tab. If false,
   * the user cannot interact with this element.
   * Default: `true`.
   */
  @Prop() enabled = true;

  /**
   * @input {boolean} If true, the tab button is visible within the
   * tabbar. Default: `true`.
   */
  @Prop() show = true;

  /**
   * @input {boolean} If true, hide the tabs on child pages.
   */
  @Prop() tabsHideOnSubPages = false;


  @Prop({ mutable: true }) selected = false;
  @PropDidChange('selected')
  selectedChanged(selected: boolean) {
    if (selected) {
      this.init = true;
      this.ionSelect.emit(this.el);
    }
  }

  /**
   * @output {Tab} Emitted when the current tab is selected.
   */
  @Event() ionSelect: EventEmitter;
  @Event() ionTabDidLoad: EventEmitter;
  @Event() ionTabDidUnload: EventEmitter;


  protected ionViewDidLoad() {
    this.nav = this.el.querySelector('ion-nav');
    if (this.selected) {
      this.init = true;
    }
    this.ionTabDidLoad.emit(this.el);
  }

  protected ionViewDidUnload() {
    this.ionTabDidUnload.emit(this.el);
  }

  /**
   * @hidden
   */
  // load(opts: NavOptions): Promise<any> {
    // const segment = this._segment;
    // if (segment || (!this._loaded && this.root)) {
    //   this.setElementClass('show-tab', true);
    //   // okay, first thing we need to do if check if the view already exists
    //   const nameToUse = segment && segment.name ? segment.name : this.root;
    //   const dataToUse = segment ? segment.data : this.rootParams;
    //   const numViews = this.length() - 1;
    //   for (let i = numViews; i >= 0; i--) {
    //     const viewController = this.getByIndex(i);
    //     if (viewController && (viewController.id === nameToUse || viewController.component === nameToUse)) {
    //       if (i === numViews) {
    //         // this is the last view in the stack and it's the same
    //         // as the segment so there's no change needed
    //         return Promise.resolve();
    //       } else {
    //         // it's not the exact view as the end
    //         // let's have this nav go back to this exact view
    //         return this.popTo(viewController, {
    //           animate: false,
    //           updateUrl: false,
    //         });
    //       }
    //     }
    //   }

    //   let promise: Promise<any> = null;
    //   if (segment && segment.defaultHistory && segment.defaultHistory.length && this._views.length === 0) {
    //     promise = this.linker.initViews(segment).then((views: ViewController[]) => {
    //       return this.setPages(views, opts);
    //     });
    //   } else {
    //     promise = this.push(nameToUse, dataToUse, opts);
    //   }

    //   return promise.then(() => {
    //     this._segment = null;
    //     this._loaded = true;
    //   });

    // } else {
    //   // if this is not the Tab's initial load then we need
    //   // to refresh the tabbar and content dimensions to be sure
    //   // they're lined up correctly
    //   this._dom.read(() => {
    //     this.resize();
    //   });
    //   return Promise.resolve();
    // }
  // }

  @Method()
  setId(id: string) {
    this.tabId = 'tabpanel-' + id;
    this.btnId = 'tab-' + id;
  }

  @Method()
  resize() {
    this.nav.resize();
  }

  /**
   * @hidden
   */
  // get index(): number {
  //   return this.parent.getIndex(this);
  // }

  /**
   * @hidden
   */
  // updateHref(component: any, data: any) {
  //   if (this.btn && this.linker) {
  //     let href = this.linker.createUrl(this.parent, component, data) || '#';
  //     this.btn.updateHref(href);
  //   }
  // }

  @Method()
  goToRoot(opts: any) {
    return this.nav.setRoot(this.root, this.rootParams, opts);
  }

  protected hostData() {
    return {
      'id': this.tabId,
      'aria-hidden': (!this.selected).toString(),
      'aria-labelledby': this.btnId,
      'role': 'tabpanel',
      class: {
        'show-tab': this.selected
      }
    };
  }

  protected render() {
    if (this.init) {
      return <ion-nav root={this.root}></ion-nav>;
    }
    return null;
  }
}
