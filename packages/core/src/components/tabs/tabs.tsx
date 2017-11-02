import { Component, Element, Event, EventEmitter, Listen, Method, Prop, State } from '@stencil/core';
import { Config, HTMLIonTabElement } from '../../index';

export interface NavOptions { }
// import { isPresent } from '../../utils/helpers';
/**
 * @name Tabs
 * @description
 * Tabs make it easy to navigate between different pages or functional
 * aspects of an app. The Tabs component, written as `<ion-tabs>`, is
 * a container of individual [Tab](../Tab/) components. Each individual `ion-tab`
 * is a declarative component for a [NavController](../../../navigation/NavController/)
 *
 * For more information on using nav controllers like Tab or [Nav](../../nav/Nav/),
 * take a look at the [NavController API Docs](../../../navigation/NavController/).
 *
 * ### Placement
 *
 * The position of the tabs relative to the content varies based on
 * the mode. The tabs are placed at the bottom of the screen
 * for iOS and Android, and at the top for Windows by default. The position can
 * be configured using the `tabsPlacement` attribute on the `<ion-tabs>` component,
 * or in an app's [config](../../config/Config/).
 * See the [Input Properties](#input-properties) below for the available
 * values of `tabsPlacement`.
 *
 * ### Layout
 *
 * The layout for all of the tabs can be defined using the `tabsLayout`
 * property. If the individual tab has a title and icon, the icons will
 * show on top of the title by default. All tabs can be changed by setting
 * the value of `tabsLayout` on the `<ion-tabs>` element, or in your
 * app's [config](../../config/Config/). For example, this is useful if
 * you want to show tabs with a title only on Android, but show icons
 * and a title for iOS. See the [Input Properties](#input-properties)
 * below for the available values of `tabsLayout`.
 *
 * ### Selecting a Tab
 *
 * There are different ways you can select a specific tab from the tabs
 * component. You can use the `selectedIndex` property to set the index
 * on the `<ion-tabs>` element, or you can call `select()` from the `Tabs`
 * instance after creation. See [usage](#usage) below for more information.
 *
 * @usage
 *
 * You can add a basic tabs template to a `@Component` using the following
 * template:
 *
 * ```html
 * <ion-tabs>
 *   <ion-tab [root]="tab1Root"></ion-tab>
 *   <ion-tab [root]="tab2Root"></ion-tab>
 *   <ion-tab [root]="tab3Root"></ion-tab>
 * </ion-tabs>
 * ```
 *
 * Where `tab1Root`, `tab2Root`, and `tab3Root` are each a page:
 *
 *```ts
 * @Component({
 *   templateUrl: 'build/pages/tabs/tabs.html'
 * })
 * export class TabsPage {
 *   // this tells the tabs component which Pages
 *   // should be each tab's root Page
 *   tab1Root = Page1;
 *   tab2Root = Page2;
 *   tab3Root = Page3;
 *
 *   constructor() {
 *
 *   }
 * }
 *```
 *
 * By default, the first tab will be selected upon navigation to the
 * Tabs page. We can change the selected tab by using `selectedIndex`
 * on the `<ion-tabs>` element:
 *
 * ```html
 * <ion-tabs selectedIndex="2">
 *   <ion-tab [root]="tab1Root"></ion-tab>
 *   <ion-tab [root]="tab2Root"></ion-tab>
 *   <ion-tab [root]="tab3Root"></ion-tab>
 * </ion-tabs>
 * ```
 *
 * Since the index starts at `0`, this will select the 3rd tab which has
 * root set to `tab3Root`. If you wanted to change it dynamically from
 * your class, you could use [property binding](https://angular.io/docs/ts/latest/guide/template-syntax.html#!#property-binding).
 *
 * Alternatively, you can grab the `Tabs` instance and call the `select()`
 * method. This requires the `<ion-tabs>` element to have an `id`. For
 * example, set the value of `id` to `myTabs`:
 *
 * ```html
 * <ion-tabs #myTabs>
 *   <ion-tab [root]="tab1Root"></ion-tab>
 *   <ion-tab [root]="tab2Root"></ion-tab>
 *   <ion-tab [root]="tab3Root"></ion-tab>
 * </ion-tabs>
 * ```
 *
 * Then in your class you can grab the `Tabs` instance and call `select()`,
 * passing the index of the tab as the argument. Here we're grabbing the tabs
 * by using ViewChild.
 *
 *```ts
 * export class TabsPage {
 *
 * @ViewChild('myTabs') tabRef: Tabs;
 *
 * ionViewDidEnter() {
 *   this.tabRef.select(2);
 *  }
 *
 * }
 *```
 *
 * You can also switch tabs from a child component by calling `select()` on the
 * parent view using the `NavController` instance. For example, assuming you have
 * a `TabsPage` component, you could call the following from any of the child
 * components to switch to `TabsRoot3`:
 *
 *```ts
 * switchTabs() {
 *   this.navCtrl.parent.select(2);
 * }
 *```
 * @demo /docs/demos/src/tabs/
 *
 * @see {@link /docs/components#tabs Tabs Component Docs}
 * @see {@link ../Tab Tab API Docs}
 * @see {@link ../../config/Config Config API Docs}
 *
 */
@Component({
  tag: 'ion-tabs',
  styleUrls: {
    ios: 'tabs.ios.scss',
    md: 'tabs.md.scss',
    wp: 'tabs.wp.scss'
  },
  host: {
    theme: 'tabs'
  }
})
export class Tabs {

  private ids: number = -1;
  private tabsId: number = (++tabIds);

  @State() tabs: HTMLIonTabElement[] = [];
  @State() selectedTab: HTMLIonTabElement;
  // private id: string;
  // private _selectHistory: string[] = [];

  @Prop({ context: 'config' }) config: Config;

  @Element() el: HTMLElement;

  @Prop() tabbarHidden = false;

  /**
   * @input {string} A unique name for the tabs
   */
  @Prop() name: string;

  /**
   * @input {string} Set the tabbar layout: `icon-top`, `icon-start`, `icon-end`, `icon-bottom`, `icon-hide`, `title-hide`.
   */
  @Prop({ mutable: true }) tabsLayout: string;

  /**
   * @input {string} Set position of the tabbar: `top`, `bottom`.
   */
  @Prop({ mutable: true }) tabsPlacement: string;

  /**
   * @input {boolean} If true, show the tab highlight bar under the selected tab.
   */
  @Prop({ mutable: true }) tabsHighlight: boolean;

  /**
   * @output {any} Emitted when the tab changes.
   */
  @Event() ionChange: EventEmitter;

  /**
   * @hidden
   */

  // constructor(
  //   @Optional() parent: NavController,
  //   @Optional() public viewCtrl: ViewController,
  //   private _app: App,
  //   config: Config,
  //   elementRef: ElementRef,
  //   private _plt: Platform,
  //   renderer: Renderer,
  //   private _linker: DeepLinker,
  //   keyboard?: Keyboard
  // ) {
  //   super(config, elementRef, renderer, 'tabs');

  //   this.parent = <NavControllerBase>parent;
  //   this.id = 't' + (++tabIds);
  //   this._sbPadding = config.getBoolean('statusbarPadding');
  //   this.tabsHighlight = config.getBoolean('tabsHighlight');

  //   if (this.parent) {
  //     // this Tabs has a parent Nav
  //     this.parent.registerChildNav(this);

  //   } else if (viewCtrl && viewCtrl.getNav()) {
  //     // this Nav was opened from a modal
  //     this.parent = <any>viewCtrl.getNav();
  //     this.parent.registerChildNav(this);

  //   } else if (this._app) {
  //     // this is the root navcontroller for the entire app
  //     this._app.registerRootNav(this);
  //   }

  //   // Tabs may also be an actual ViewController which was navigated to
  //   // if Tabs is static and not navigated to within a NavController
  //   // then skip this and don't treat it as it's own ViewController
  //   if (viewCtrl) {
  //     viewCtrl._setContent(this);
  //     viewCtrl._setContentRef(elementRef);
  //   }

  //   const keyboardResizes = config.getBoolean('keyboardResizes', false);
  //   if (keyboard && keyboardResizes) {
  //     keyboard.willHide
  //       .takeUntil(this._onDestroy)
  //       .subscribe(() => {
  //         this._plt.timeout(() => this.setTabbarHidden(false), 50);
  //       });
  //     keyboard.willShow
  //       .takeUntil(this._onDestroy)
  //       .subscribe(() => this.setTabbarHidden(true));
  //   }
  // }

  protected ionViewDidLoad() {
    this.loadConfig('tabsPlacement', 'bottom');
    this.loadConfig('tabsLayout', 'icon-top');
    this.loadConfig('tabsHighlight', true);

    // find pre-selected tabs
    let selected = this.tabs.find(t => t.selected);

    // reset all tabs none is selected
    for (let tab of this.tabs) {
      tab.selected = false;
    }

    // find a tab candidate in case, the selected in null
    if (!selected) {
      selected = this.tabs.find(t => t.show && t.enabled);
    }
    selected.selected = true;
  }

  @Listen('ionSelect')
  selectedChanged(ev: CustomEvent) {
    const selectedTab = ev.detail as HTMLIonTabElement;
    for (let tab of this.tabs) {
      if (selectedTab !== tab) {
        tab.selected = false;
      }
    }
    this.selectedTab = selectedTab;
    this.ionChange.emit(selectedTab);
  }

  @Listen('ionTabDidLoad')
  protected addTab(ev: CustomEvent) {
    const tab = ev.detail as HTMLIonTabElement;
    const id = this.tabsId + '-' + (++this.ids);
    tab.setId(id);
    this.tabs = [...this.tabs, tab];
    ev.stopPropagation();
  }

  @Listen('ionTabDidUnload')
  protected removeTab(ev: CustomEvent) {
    const tab = ev.detail;
    this.tabs.slice(this.tabs.indexOf(tab));
    ev.stopPropagation();
  }


  // select(tabOrIndex: number | Tab, opts: NavOptions = {}, fromUrl: boolean = false)
  // private makeSelectedTab(selectedTab: HTMLIonTabElement) {
  //   for (let tab of this.tabs) {
  //     if (selectedTab !== tab) {
  //       tab.selected = false;
  //     }
  //   }
  //   if (selectedTab) {
  //     selectedTab.selected = true;
  //   }
  //   this.ionChange.emit(selectedTab);
  // }


  // private initTabs(): Promise<any> {
  //   // get the selected index from the input
  //   // otherwise default it to use the first index
  //   let selectedTab = this.tabs.find(t => t.selected && t.enabled && t.show);
  //   if (!selectedTab) {
  //     selectedTab = this.tabs.find(t => t.enabled && t.show);
  //   }

  //   // now see if the deep linker can find a tab index
  //   // const tabsSegment = this._linker.getSegmentByNavIdOrName(this.id, this.name);
  //   // if (tabsSegment) {
  //   //   // we found a segment which probably represents which tab to select
  //   //   selectedIndex = this._getSelectedTabIndex(tabsSegment.secondaryId, selectedIndex);
  //   // }

  //   // get the selectedIndex and ensure it isn't hidden or disabled
  //   let promise = Promise.resolve();
  //   if (selectedTab) {
  //     selectedTab._segment = tabsSegment;
  //     promise = this.select(selectedTab);
  //   }

  //   return promise.then(() => {
  //     // set the initial href attribute values for each tab
  //     this._tabs.forEach(t => {
  //       t.updateHref(t.root, t.rootParams);
  //     });
  //   });
  // }

  private loadConfig(attrKey: string, fallback: any) {
    let val = (this as any)[attrKey];
    if (typeof val === 'undefined') {
      val = this.config.get(attrKey, fallback);
    }
    (this as any)[attrKey] = val;
  }

  /**
   * @param {number|Tab} tabOrIndex Index, or the Tab instance, of the tab to select.
   */
  select(tabOrIndex: number | HTMLIonTabElement): Promise<any> {
    const selectedTab = (typeof tabOrIndex === 'number' ? this.getByIndex(tabOrIndex) : tabOrIndex);
    if (!selectedTab) {
      return Promise.resolve();
    }
    selectedTab.selected = true;
  }

  // _fireChangeEvent(selectedTab: Tab) {
  //   selectedTab.ionSelect.emit(selectedTab);
  //   this.ionChange.emit(selectedTab);
  // }

  // _tabSwitchEnd(selectedTab: Tab, selectedPage: ViewController, currentPage: ViewController) {
  //   assert(selectedTab, 'selectedTab must be valid');
  //   assert(this._tabs.indexOf(selectedTab) >= 0, 'selectedTab must be one of the tabs');

  //   // Update tabs selection state
  //   const tabs = this._tabs;
  //   let tab: Tab;
  //   for (var i = 0; i < tabs.length; i++) {
  //     tab = tabs[i];
  //     tab.setSelected(tab === selectedTab);
  //   }


  //   // Fire didEnter/didLeave lifecycle events
  //   if (selectedPage) {
  //     selectedPage._didEnter();
  //     this._app.viewDidEnter.emit(selectedPage);
  //   }

  //   if (currentPage) {
  //     currentPage && currentPage._didLeave();
  //     this._app.viewDidLeave.emit(currentPage);
  //   }

  //   // track the order of which tabs have been selected, by their index
  //   // do not track if the tab index is the same as the previous
  //   if (this._selectHistory[this._selectHistory.length - 1] !== selectedTab.id) {
  //     this._selectHistory.push(selectedTab.id);
  //   }
  // }

  /**
   * Get the previously selected Tab which is currently not disabled or hidden.
   * @param {boolean} trimHistory If the selection history should be trimmed up to the previous tab selection or not.
   * @returns {Tab}
   */
  // previousTab(trimHistory: boolean = true): Tab {
  //   // walk backwards through the tab selection history
  //   // and find the first previous tab that is enabled and shown
  //   console.debug('run previousTab', this._selectHistory);
  //   for (var i = this._selectHistory.length - 2; i >= 0; i--) {
  //     var tab = this._tabs.find(t => t.id === this._selectHistory[i]);
  //     if (tab && tab.enabled && tab.show) {
  //       if (trimHistory) {
  //         this._selectHistory.splice(i + 1);
  //       }
  //       return tab;
  //     }
  //   }

  //   return null;
  // }

  /**
   * @param {number} index Index of the tab you want to get
   * @returns {HTMLIonTabElement} Returns the tab who's index matches the one passed
   */
  @Method()
  getByIndex(index: number): HTMLIonTabElement {
    return this.tabs[index];
  }

  /**
   * @return {HTMLIonTabElement} Returns the currently selected tab
   */
  @Method()
  getSelected(): HTMLIonTabElement {
    return this.tabs.find((tab) => tab.selected);
  }

  @Method()
  getIndex(tab: HTMLIonTabElement): number {
    return this.tabs.indexOf(tab);
  }

  @Method()
  getTabs(): HTMLIonTabElement[] {
    return this.tabs;
  }

  /**
   * "Touch" the active tab, going back to the root view of the tab
   * or optionally letting the tab handle the event
   */
  // private _updateCurrentTab(tab: Tab, fromUrl: boolean): Promise<any> {
  //   const active = tab.getActive();

  //   if (active) {
  //     if (fromUrl && tab._segment) {
  //       // see if the view controller exists
  //       const vc = tab.getViewById(tab._segment.name);
  //       if (vc) {
  //         // the view is already in the stack
  //         return tab.popTo(vc, {
  //           animate: false,
  //           updateUrl: false,
  //         });
  //       } else if (tab._views.length === 0 && tab._segment.defaultHistory && tab._segment.defaultHistory.length) {
  //         return this._linker.initViews(tab._segment).then((views: ViewController[]) => {
  //           return tab.setPages(views,  {
  //             animate: false, updateUrl: false
  //           });
  //         }).then(() => {
  //           tab._segment = null;
  //         });
  //       } else {
  //         return tab.setRoot(tab._segment.name, tab._segment.data, {
  //           animate: false, updateUrl: false
  //         }).then(() => {
  //           tab._segment = null;
  //         });
  //       }

  //     } else if (active._cmp && active._cmp.instance.ionSelected) {
  //       // if they have a custom tab selected handler, call it
  //       active._cmp.instance.ionSelected();
  //       return Promise.resolve();
  //     } else if (tab.length() > 1) {
  //       // if we're a few pages deep, pop to root
  //       return tab.popToRoot();
  //     } else {
  //       return getComponent(this._linker, tab.root).then(viewController => {
  //         if (viewController.component !== active.component) {
  //           // Otherwise, if the page we're on is not our real root
  //           // reset it to our default root type
  //           return tab.setRoot(tab.root);
  //         }
  //       }).catch(() => {
  //         console.debug('Tabs: reset root was cancelled');
  //       });
  //     }
  //   }
  // }

  /**
   * @internal
   */
  resize() {
    const tab = this.getSelected();
    tab && tab.resize();
  }


  // /**
  //  * @internal
  //  */
  // paneChanged(isPane: boolean) {
  //   if (isPane) {
  //     this.resize();
  //   }
  // }

  // goToRoot(opts: NavOptions) {
  //   if (this._tabs.length) {
  //     return this.select(this._tabs[0], opts);
  //   }
  // }

  /*
   * @private
   */
  getType() {
    return 'tabs';
  }

  /*
   * @private
   */
  // getSecondaryIdentifier(): string {
  //   const tabs = this.getActiveChildNavs();
  //   if (tabs && tabs.length) {
  //     return this._linker._getTabSelector(tabs[0]);
  //   }
  //   return '';
  // }

  /**
   * @private
   */
  // _getSelectedTabIndex(secondaryId: string = '', fallbackIndex: number = 0): number {
  //   // we found a segment which probably represents which tab to select
  //   const indexMatch = secondaryId.match(/tab-(\d+)/);
  //   if (indexMatch) {
  //     // awesome, the segment name was something "tab-0", and
  //     // the numbe represents which tab to select
  //     return parseInt(indexMatch[1], 10);
  //   }

  //   // wasn't in the "tab-0" format so maybe it's using a word
  //   const tab = this._tabs.find(t => {
  //     return (isPresent(t.tabUrlPath) && t.tabUrlPath === secondaryId) ||
  //            (isPresent(t.tabTitle) && formatUrlPart(t.tabTitle) === secondaryId);
  //   });

  //   return isPresent(tab) ? tab.index : fallbackIndex;
  // }

  protected hostData() {
    return {
      // TODO: move to classes
      // 'tabsPlacement': this.tabsPlacement,
      // 'tabsLayout': this.tabsLayout,
      // 'tabsHighlight': this.tabsHighlight,
    };
  }

  protected render() {
    const dom = [<slot></slot>];
    if (!this.tabbarHidden) {
      dom.push(
        <ion-tab-bar
          tabs={this.tabs}
          selectedTab={this.selectedTab}
          highlight={this.tabsHighlight}
          placement={this.tabsPlacement}
          layout={this.tabsLayout}>
        </ion-tab-bar>
      );
    }
    return dom;
  }
}

let tabIds = -1;
